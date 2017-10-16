import { select } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockDate from 'mockdate';
import { combineReducers } from 'redux';
import { expectSaga } from 'redux-saga-test-plan';
import cardsReducer from '../reducer';
import sprintsReducer, { leadSelector, overallPointsLeftSelector, todayTargetSelector } from '../../sprints/reducer';
import usersReducer from '../../users/reducer';
import projectsReducer from '../../projects/reducer';
import { fetchDoneCards } from '../sagas';
import { tokenSelector } from '../../auth/reducer';
import { Trello } from '../../../services';
import { putSprints, setCurrentSprint } from '../../sprints/actions';

const getInitialState = () => {
  const sprintsInitialState = sprintsReducer(undefined, {});
  const sprintsAfterPuttingSprints = sprintsReducer(
    sprintsInitialState,
    putSprints([
      {
        id: 4527,
        projectId: 1251,
        performance: [
          {
            date: '2017-09-11T22:00:00.000Z', // tuesday
            standard: 0,
            done: 0,
          },
          {
            date: '2017-09-12T22:00:00.000Z',
            standard: 10,
            done: null,
          },
          {
            date: '2017-09-13T22:00:00.000Z',
            standard: 20,
            done: null,
          },
          {
            date: '2017-09-14T22:00:00.000Z', // friday
            standard: 25,
            done: null,
          },
          {
            date: '2017-09-17T22:00:00.000Z', // monday
            standard: 35,
            done: null,
          },
          {
            date: '2017-09-18T22:00:00.000Z',
            standard: 45,
            done: null,
          },
        ],
        resources: {
          matrix: [[1], [1], [0.5], [1], [1]],
          speed: 10,
          totalPoints: 45,
          team: ['5975bc81d31601c61c7092eb'],
          totalManDays: 4.5,
        },
        doneColumn: '59bc197d91e43e1f3892ccf2',
      },
    ])
  );
  const sprintsAfterSelectingSprint = sprintsReducer(sprintsAfterPuttingSprints, setCurrentSprint(4527));
  return {
    cards: cardsReducer(undefined, {}),
    users: usersReducer(undefined, {}),
    projects: projectsReducer(undefined, {}),
    sprints: sprintsAfterSelectingSprint,
  };
};

const rootReducer = combineReducers({
  cards: cardsReducer,
  sprints: sprintsReducer,
  users: usersReducer,
  projects: projectsReducer,
});

describe('cards sagas', () => {
  describe('fetchDoneCards', () => {
    it("doesn't add points status when there are no cards", async () => {
      const initialState = getInitialState();
      const { storeState } = await expectSaga(fetchDoneCards)
        .withReducer(rootReducer, initialState)
        .provide([
          [select(tokenSelector), 'toto'],
          [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
        ])
        .run();

      expect(storeState).toEqual(initialState);
    });
    describe('on tuesday', () => {
      describe('morning', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-12T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('has no lead', async () => {
            expect(leadSelector(storeState)).toEqual(undefined);
          });

          it('has a today target of 10', async () => {
            expect(todayTargetSelector(storeState)).toEqual(10);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 4 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-12T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 4 points ahead', async () => {
            expect(leadSelector(storeState)).toEqual({ points: 4, manDays: 0.4 });
          });

          it('has a today target of 6', async () => {
            expect(todayTargetSelector(storeState)).toEqual(6);
          });

          it('has 41 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(41);
          });
        });
      });
      describe('afternoon', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-12T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('has no lead', async () => {
            expect(leadSelector(storeState)).toEqual(undefined);
          });

          it('has a today target of 10', async () => {
            expect(todayTargetSelector(storeState)).toEqual(10);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 4 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-12T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 4 points ahead', async () => {
            expect(leadSelector(storeState)).toEqual({ points: 4, manDays: 0.4 });
          });

          it('has a today target of 6', async () => {
            expect(todayTargetSelector(storeState)).toEqual(6);
          });

          it('has 41 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(41);
          });
        });
      });
    });
    describe('on wednesday', () => {
      describe('morning', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-13T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 10 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -10, manDays: -1 });
          });

          it('has a today target of 20', async () => {
            expect(todayTargetSelector(storeState)).toEqual(20);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 4 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-13T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is -6 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -6, manDays: -0.6 });
          });

          it('has a today target of 16', async () => {
            expect(todayTargetSelector(storeState)).toEqual(16);
          });

          it('has 41 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(41);
          });
        });
      });
      describe('afternoon', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-13T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 10 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -10, manDays: -1 });
          });

          it('has a today target of 20', async () => {
            expect(todayTargetSelector(storeState)).toEqual(20);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 4 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-13T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is -6 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -6, manDays: -0.6 });
          });

          it('has a today target of 16', async () => {
            expect(todayTargetSelector(storeState)).toEqual(16);
          });

          it('has 41 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(41);
          });
        });
      });
    });
    describe('on friday', () => {
      describe('morning', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-15T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 25 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -25, manDays: -2.5 });
          });

          it('has a today target of 35', async () => {
            expect(todayTargetSelector(storeState)).toEqual(35);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 30 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-15T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                    {
                      name: '(26) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 5 points ahead', async () => {
            expect(leadSelector(storeState)).toEqual({ points: 5, manDays: 0.5 });
          });

          it('has a today target of 5', async () => {
            expect(todayTargetSelector(storeState)).toEqual(5);
          });

          it('has 15 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(15);
          });
        });
      });
      describe('afternoon', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-15T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 25 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -25, manDays: -2.5 });
          });

          it('has a today target of 35', async () => {
            expect(todayTargetSelector(storeState)).toEqual(35);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 30 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-15T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                    {
                      name: '(26) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 5 points ahead', async () => {
            expect(leadSelector(storeState)).toEqual({ points: 5, manDays: 0.5 });
          });

          it('has a today target of 5', async () => {
            expect(todayTargetSelector(storeState)).toEqual(5);
          });

          it('has 15 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(15);
          });
        });
      });
    });
    describe('on monday', () => {
      describe('morning', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-18T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 35 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -35, manDays: -3.5 });
          });

          it('has a today target of 45', async () => {
            expect(todayTargetSelector(storeState)).toEqual(45);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 30 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-18T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                    {
                      name: '(26) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 5 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -5, manDays: -0.5 });
          });

          it('has a today target of 15', async () => {
            expect(todayTargetSelector(storeState)).toEqual(15);
          });

          it('has 15 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(15);
          });
        });
      });
      describe('afternoon', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-18T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 35 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -35, manDays: -3.5 });
          });

          it('has a today target of 45', async () => {
            expect(todayTargetSelector(storeState)).toEqual(45);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 30 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-18T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                    {
                      name: '(26) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 5 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -5, manDays: -0.5 });
          });

          it('has a today target of 15', async () => {
            expect(todayTargetSelector(storeState)).toEqual(15);
          });

          it('has 15 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(15);
          });
        });
      });
    });
    describe('on the last day (ceremony)', () => {
      describe('morning', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-19T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 45 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -45, manDays: -4.5 });
          });

          it('has a today target of 45', async () => {
            expect(todayTargetSelector(storeState)).toEqual(45);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 30 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-19T06:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                    {
                      name: '(26) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 15 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -15, manDays: -1.5 });
          });

          it('has a today target of 15', async () => {
            expect(todayTargetSelector(storeState)).toEqual(15);
          });

          it('has 15 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(15);
          });
        });
      });
      describe('afternoon', () => {
        describe('when there are 0 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-19T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'), []],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 45 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -45, manDays: -4.5 });
          });

          it('has a today target of 45', async () => {
            expect(todayTargetSelector(storeState)).toEqual(45);
          });

          it('has 45 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(45);
          });
        });
        describe('when there are 30 points done', () => {
          let storeState;
          beforeAll(async () => {
            MockDate.set(new Date('2017-09-19T16:00:00.000Z'));
            const initialState = getInitialState();
            const result = await expectSaga(fetchDoneCards)
              .withReducer(rootReducer, initialState)
              .provide([
                [select(tokenSelector), 'toto'],
                [
                  matchers.call.fn(Trello.getCardsFromList, 'toto', '59bc197d91e43e1f3892ccf2'),
                  [
                    {
                      name: '(4) Done',
                      actions: [],
                    },
                    {
                      name: '(26) Done',
                      actions: [],
                    },
                  ],
                ],
              ])
              .run();

            storeState = result.storeState;
          });
          afterAll(() => MockDate.reset());

          it('is 15 points late', async () => {
            expect(leadSelector(storeState)).toEqual({ points: -15, manDays: -1.5 });
          });

          it('has a today target of 15', async () => {
            expect(todayTargetSelector(storeState)).toEqual(15);
          });

          it('has 15 points left overall', async () => {
            expect(overallPointsLeftSelector(storeState)).toEqual(15);
          });
        });
      });
    });
  });
});
