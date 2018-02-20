// @flow
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
    const bugs = cards.reduce((count, card) => {
      if (!card.labels.some(label => label.color === 'red' && isBugRegex.test(label.name))) return count;

      const createdDateTime = idToTimestampCreated(card.id);
      return sprintStartDateTime < createdDateTime && createdDateTime < sprintEndDateTime ? count + 1 : count;
    }, 0);

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
