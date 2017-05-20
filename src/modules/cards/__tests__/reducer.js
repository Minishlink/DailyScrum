import { default as reducer } from '../reducer';
import * as Actions from '../actions';

jest.mock('../../../services/Time');

describe('cards reducer', () => {
  let initialState = null;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should clear the cards', () => {
    expect(reducer({ foo: 'bar' }, Actions.clearCards())).toEqual(initialState);
  });

  it('should put no new cards if you put an empty object', () => {
    expect(reducer(undefined, Actions.putCards({}))).toEqual(initialState);
  });

  it('should put no new cards if you put an object with an empty done', () => {
    expect(reducer(undefined, Actions.putCards({ done: [] }))).toEqual(initialState);
  });

  it('should put no new cards if you put an object with an empty sprint', () => {
    expect(reducer(undefined, Actions.putCards({ sprint: [] }))).toEqual(initialState);
  });

  it('should put no new cards if you put an object with an empty toValidate', () => {
    expect(reducer(undefined, Actions.putCards({ toValidate: [] }))).toEqual(initialState);
  });

  it('should put no new cards if you put an object with an empty doing', () => {
    expect(reducer(undefined, Actions.putCards({ doing: [] }))).toEqual(initialState);
  });

  it('should put no new cards if you put an object with an empty blocked', () => {
    expect(reducer(undefined, Actions.putCards({ blocked: [] }))).toEqual(initialState);
  });

  it('should put no new cards if you put an object with an empty done and sprint', () => {
    expect(reducer(undefined, Actions.putCards({ done: [], sprint: [] }))).toEqual(initialState);
  });

  const testCards = [
    {
      id: 'macro',
      idShort: 1,
      name: 'Macro',
      idMembers: ['foo'],
      dateLastActivity: 1495133134992,
      actions: [],
    },
    {
      id: 'story',
      idShort: 2,
      name: '(3) User story',
      idMembers: ['foo'],
      dateLastActivity: 1495133134992,
      actions: [],
    },
    {
      id: 'unassignedStory',
      idShort: 3,
      name: '(1) Unassigned story',
      idMembers: [],
      dateLastActivity: 1495133134992,
      actions: [],
    },
    {
      id: 'oldStory',
      idShort: 4,
      idMembers: ['bar'],
      name: 'Old story (5)',
      dateLastActivity: 1494960334992,
      actions: [],
    },
  ];

  const expectedTestCards = {
    macro: {
      id: 'macro',
      idShort: 1,
      idMembers: ['foo'],
      name: 'Macro',
      points: null,
      dateLastActivity: 1495133134992,
    },
    story: {
      id: 'story',
      idShort: 2,
      idMembers: ['foo'],
      name: 'User story',
      points: 3,
      dateLastActivity: 1495133134992,
    },
    unassignedStory: {
      id: 'unassignedStory',
      idShort: 3,
      name: 'Unassigned story',
      points: 1,
      idMembers: [],
      dateLastActivity: 1495133134992,
    },
    oldStory: {
      id: 'oldStory',
      idShort: 4,
      idMembers: ['bar'],
      name: 'Old story',
      points: 5,
      dateLastActivity: 1494960334992,
    },
  };

  it('should add cards in sprint', () => {
    expect(
      reducer(
        undefined,
        Actions.putCards({
          sprint: testCards,
        })
      )
    ).toEqual({
      ...initialState,
      list: expectedTestCards,
      today: {
        ...initialState.today,
        sprint: ['story', 'oldStory'],
      },
      sprint: Object.keys(expectedTestCards),
      points: {
        ...initialState.points,
        today: {
          ...initialState.points.today,
          sprint: 8,
        },
        sprint: 9,
      },
    });
  });

  it('should add cards in doing', () => {
    expect(
      reducer(
        undefined,
        Actions.putCards({
          doing: testCards,
        })
      )
    ).toEqual({
      ...initialState,
      list: expectedTestCards,
      today: {
        ...initialState.today,
        doing: ['story', 'unassignedStory', 'oldStory'],
      },
      doing: Object.keys(expectedTestCards),
      points: {
        ...initialState.points,
        today: {
          ...initialState.points.today,
          doing: 9,
        },
        doing: 9,
      },
    });
  });

  it('should add cards in blocked', () => {
    expect(
      reducer(
        undefined,
        Actions.putCards({
          blocked: testCards,
        })
      )
    ).toEqual({
      ...initialState,
      list: expectedTestCards,
      today: {
        ...initialState.today,
        blocked: ['story', 'unassignedStory', 'oldStory'],
      },
      blocked: Object.keys(expectedTestCards),
      points: {
        ...initialState.points,
        today: {
          ...initialState.points.today,
          blocked: 9,
        },
        blocked: 9,
      },
    });
  });

  it('should add cards in toValidate', () => {
    expect(
      reducer(
        undefined,
        Actions.putCards({
          toValidate: testCards,
        })
      )
    ).toEqual({
      ...initialState,
      list: expectedTestCards,
      today: {
        ...initialState.today,
        toValidate: ['story', 'unassignedStory', 'oldStory'],
      },
      toValidate: Object.keys(expectedTestCards),
      points: {
        ...initialState.points,
        today: {
          ...initialState.points.today,
          toValidate: 9,
        },
        toValidate: 9,
      },
    });
  });

  it('should add cards in done', () => {
    expect(
      reducer(
        undefined,
        Actions.putCards({
          done: testCards,
        })
      )
    ).toEqual({
      ...initialState,
      list: expectedTestCards,
      yesterday: {
        ...initialState.yesterday,
        done: ['story', 'unassignedStory'],
      },
      done: Object.keys(expectedTestCards),
      points: {
        ...initialState.points,
        yesterday: {
          ...initialState.points.yesterday,
          done: 4,
        },
        done: 9,
      },
    });
  });

  it('should replace cards in done', () => {
    const state = {
      ...initialState,
      list: expectedTestCards,
      yesterday: {
        ...initialState.yesterday,
        done: ['story', 'unassignedStory'],
      },
      done: Object.keys(expectedTestCards),
      points: {
        ...initialState.points,
        yesterday: {
          ...initialState.points.yesterday,
          done: 4,
        },
        done: 9,
      },
    };

    expect(
      reducer(
        state,
        Actions.putCards({
          done: [
            {
              id: 'newStory',
              idShort: 2,
              name: '(2) New story',
              idMembers: ['bar'],
              dateLastActivity: 1495133134992,
              actions: [],
            },
          ],
        })
      )
    ).toEqual({
      ...state,
      list: {
        ...state.list,
        newStory: {
          id: 'newStory',
          idShort: 2,
          name: 'New story',
          points: 2,
          idMembers: ['bar'],
          dateLastActivity: 1495133134992,
        },
      },
      yesterday: {
        ...state.yesterday,
        done: ['newStory'],
      },
      done: ['newStory'],
      points: {
        ...state.points,
        yesterday: {
          ...state.points.yesterday,
          done: 2,
        },
        done: 2,
      },
    });
  });
});
