// @flow
import { Platform } from 'react-native';
import { put, select, takeEvery, cancelled, call, cancel } from 'redux-saga/effects';
import { tokenSelector } from '../auth/reducer';
import { startSync, endSync } from '../sync';
import { setBugsCount, setValidationFeedbacksCount } from './actions';
import { currentBoardSelector } from '../boards/reducer';
import { currentSprintSelector } from '../sprints/reducer';
import Trello, { idToTimestampCreated } from '../../services/Trello';
import { sprintsCardsSelector } from '../cards/reducer';

export function* analyzeQualitySaga(): Generator<*, *, *> {
  try {
    yield put(startSync('sprints', 'qualityIndicators'));
    const token = yield select(tokenSelector);

    const currentBoard = yield select(currentBoardSelector);
    const currentSprint = yield select(currentSprintSelector);
    if (!currentBoard || !currentSprint) yield cancel();

    const cards = yield call(Trello.getCardsFromBoard, token.trello, currentBoard.id);

    const sprintStartDate =
      currentSprint.performance && currentSprint.performance[0] && currentSprint.performance[0].date;
    const sprintStartDateTime = new Date(sprintStartDate).getTime();

    const sprintEndDate =
      currentSprint.performance &&
      currentSprint.performance[currentSprint.performance.length - 1] &&
      currentSprint.performance[currentSprint.performance.length - 1].date;
    const sprintEndDateTime = new Date(sprintEndDate).getTime();

    const isBugRegex = /bug/i;

    const allBugsNames = [];
    const currentSprintBugs = [];
    const bugs = cards
      .map(card => ({
        ...card,
        createdDateTime: idToTimestampCreated(card.id),
      }))
      .sort((a, b) => a.createdDateTime - b.createdDateTime)
      .reduce((count, card) => {
        if (!card.labels.some(label => label.color === 'red' && isBugRegex.test(label.name))) {
          return count;
        }

        const normalizedCardName = card.name
          .replace(/\[[a-z0-9ê ]*]/i, '') // remove TIMEBOX and [Investigation]
          .replace(/[([]([0-9]*\.?[0-9]+)[\])]/, '') // remove points and post-points
          .trim();

        if (allBugsNames.includes(normalizedCardName)) {
          return count;
        }

        allBugsNames.push(normalizedCardName);

        const { createdDateTime } = card;
        if (sprintStartDateTime > createdDateTime || createdDateTime >= sprintEndDateTime) {
          return count;
        }

        currentSprintBugs.push(card);

        return count + 1;
      }, 0);

    Platform.OS === 'web' && console.log(currentSprintBugs);
    yield put(setBugsCount(bugs));

    const sprintCards = yield select(sprintsCardsSelector);
    const isValidationFeedbackRegex = /validation/i;
    const validationFeedbacks = sprintCards.reduce((count, card) => {
      if (!card.labels.some(label => label.color === 'red' && isValidationFeedbackRegex.test(label.name))) return count;
      return count + 1;
    }, 0);
    yield put(setValidationFeedbacksCount(validationFeedbacks));

    yield put(endSync('sprints', 'qualityIndicators'));
  } catch (error) {
    yield put(endSync('sprints', 'qualityIndicators', error.message));
    console.info('[saga] analyzeQualitySaga', error);
  } finally {
    if (yield cancelled()) {
      yield put(endSync('sprints', 'qualityIndicators', 'cancelled'));
    }
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('ANALYZE_QUALITY', analyzeQualitySaga)];
}
