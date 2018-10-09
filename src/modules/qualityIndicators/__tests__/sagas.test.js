import { select } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { combineReducers } from 'redux';
import { expectSaga } from 'redux-saga-test-plan';
import { bugsCountSelector, validationFeedbacksCountSelector } from '../reducer';
import { currentSprintSelector } from '../../sprints/reducer';
import { analyzeQualitySaga } from '../sagas';
import { tokenSelector } from '../../auth/reducer';
import { Trello } from '../../../services';
import { currentBoardSelector } from '../../boards/reducer';
import { qualityIndicatorsReducer } from '../index';
import { sprintsCardsSelector } from '../../cards/reducer';

const getInitialState = () => ({
  qualityIndicators: qualityIndicatorsReducer(undefined, {}),
});

const rootReducer = combineReducers({
  qualityIndicators: qualityIndicatorsReducer,
});

describe('qualityIndicators sagas', () => {
  describe('analyzeQualitySaga', () => {
    it('has 0 bugs and 0 validation feedback when there are no cards', async () => {
      const initialState = getInitialState();
      const { storeState } = await expectSaga(analyzeQualitySaga)
        .withReducer(rootReducer, initialState)
        .provide([
          [select(tokenSelector), 'token'],
          [select(currentBoardSelector), { id: 'boardId' }],
          [select(currentSprintSelector), { id: 'sprintId', performance: [] }],
          [matchers.call.fn(Trello.getCardsFromBoard, 'token', 'boardId'), []],
          [select(sprintsCardsSelector), []],
        ])
        .run();

      expect(bugsCountSelector(storeState)).toEqual(0);
      expect(validationFeedbacksCountSelector(storeState)).toEqual(0);
    });
    it('has the correct number of validation feedbacks', async () => {
      const initialState = getInitialState();
      const { storeState } = await expectSaga(analyzeQualitySaga)
        .withReducer(rootReducer, initialState)
        .provide([
          [select(tokenSelector), 'token'],
          [select(currentBoardSelector), { id: 'boardId' }],
          [select(currentSprintSelector), { id: 'sprintId', performance: [] }],
          [matchers.call.fn(Trello.getCardsFromBoard, 'token', 'boardId'), []],
          [
            select(sprintsCardsSelector),
            [
              {
                labels: [{ color: 'red', name: 'validation' }], // OK
              },
              {
                labels: [{ color: 'yellow', name: 'validation' }], // KO
              },
              {
                labels: [{ color: 'yellow', name: 'validation' }, { color: 'red', name: 'validation' }], // OK
              },
              {
                labels: [{ color: 'red', name: 'validation' }, { color: 'red', name: 'validation' }], // OK
              },
              {
                labels: [{ color: 'red', name: 'validation' }], // OK
              },
              {
                labels: [{ color: 'red', name: 'retour de validation' }], // OK
              },
              {
                labels: [{ color: 'red', name: 'validation feedback' }], // OK
              },
              {
                labels: [{ color: 'red', name: 'Retour de validation' }], // OK
              },
              {
                labels: [{ color: 'red', name: 'toto' }], // KO
              },
              {
                labels: [], // KO
              },
            ],
          ],
        ])
        .run();

      expect(bugsCountSelector(storeState)).toEqual(0);
      expect(validationFeedbacksCountSelector(storeState)).toEqual(7);
    });
    it('has the correct number of bugs', async () => {
      const initialState = getInitialState();
      const dateToCardId = date => Number(new Date(date).getTime() / 1000).toString(16);
      const { storeState } = await expectSaga(analyzeQualitySaga)
        .withReducer(rootReducer, initialState)
        .provide([
          [select(tokenSelector), 'token'],
          [select(currentBoardSelector), { id: 'boardId' }],
          [
            select(currentSprintSelector),
            {
              id: 'sprintId',
              performance: [
                {
                  date: '2018-10-07 09:00',
                },
                {
                  date: '2018-10-09 14:00',
                },
              ],
            },
          ],
          [
            matchers.call.fn(Trello.getCardsFromBoard, 'token', 'boardId'),
            [
              {
                // KO
                id: dateToCardId('2018-10-08 18:00'),
                labels: [{ color: 'yellow', name: 'bug' }],
              },
              {
                // KO
                id: dateToCardId('2018-10-08 18:00'),
                labels: [{ color: 'red', name: 'toto' }],
              },
              {
                // KO
                id: dateToCardId('2018-10-07 07:00'),
                name: 'Before sprint',
                labels: [{ color: 'red', name: 'bug' }],
              },
              {
                // OK
                id: dateToCardId('2018-10-09 13:00'),
                name: 'During sprint',
                labels: [{ color: 'red', name: 'bug' }],
              },
              {
                // KO
                id: dateToCardId('2018-10-09 15:00'),
                name: 'After sprint',
                labels: [{ color: 'red', name: 'bug' }],
              },
              {
                // OK
                id: dateToCardId('2018-10-08 09:00'),
                name: '[TIMEBOX 2h] (1.4) Correction de bug',
                labels: [{ color: 'red', name: 'Bug' }],
              },
              {
                // KO (same follow-up ticket)
                id: dateToCardId('2018-10-08 18:00'),
                name: '[TIMEBOX 2h] (1.4) Correction de bug',
                labels: [{ color: 'red', name: 'Bug' }],
              },
              {
                // OK
                id: dateToCardId('2018-10-08 10:00'),
                name: '[TIMEBOX 2h] (1.4) The bug',
                labels: [{ color: 'red', name: 'Bug' }],
              },
              {
                // KO (follow-up ticket)
                id: dateToCardId('2018-10-08 11:00'),
                name: '[TIMEBOX 1h] (0.7) The bug',
                labels: [{ color: 'red', name: 'Bug' }],
              },
            ],
          ],
          [select(sprintsCardsSelector), []],
        ])
        .run();

      expect(bugsCountSelector(storeState)).toEqual(3);
      expect(validationFeedbacksCountSelector(storeState)).toEqual(0);
    });
  });
});
