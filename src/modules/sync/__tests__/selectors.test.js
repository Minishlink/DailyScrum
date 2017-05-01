import { isSyncSuccessfulSelector, isSyncingSelector, syncReducer } from '../';

describe('sync selectors', () => {
  let state;

  beforeEach(() => {
    state = { sync: syncReducer(undefined, { type: '' }) };
  });

  describe('isSyncSuccessfulSelector', () => {
    it('should return true if there is nothing', () => {
      expect(isSyncSuccessfulSelector(state)).toEqual(true);
    });

    it('should return true if not initialized', () => {
      state.sync = {
        ...state.sync,
        page1: {},
      };
      expect(isSyncSuccessfulSelector(state)).toEqual(true);
    });

    it('should return true if there are no errors', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: null,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: false,
            error: null,
          },
        },
      };
      expect(isSyncSuccessfulSelector(state)).toEqual(true);
    });

    it('should return false if there is one error', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: null,
          },
          task2: {
            isLoading: false,
            error: true,
          },
        },
        page2: {
          task1: {
            isLoading: false,
            error: null,
          },
        },
      };
      expect(isSyncSuccessfulSelector(state)).toEqual(false);
    });

    it('should return false if there are two errors', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: true,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: false,
            error: true,
          },
        },
      };
      expect(isSyncSuccessfulSelector(state)).toEqual(false);
    });

    it('should return false if there is something loading but no error', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: null,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: true,
            error: null,
          },
        },
      };
      expect(isSyncSuccessfulSelector(state)).toEqual(false);
    });

    it('should return false if there is something loading and an error', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: null,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: true,
            error: true,
          },
        },
      };
      expect(isSyncSuccessfulSelector(state)).toEqual(false);
    });
  });

  describe('isSyncingSelector', () => {
    it('should return false if there is nothing', () => {
      expect(isSyncingSelector(state)).toEqual(false);
    });

    it('should return false if not initialized', () => {
      state.sync = {
        ...state.sync,
        page1: {},
      };
      expect(isSyncingSelector(state)).toEqual(false);
    });

    it('should return false if there is nothing loading', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: null,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: false,
            error: null,
          },
        },
      };
      expect(isSyncingSelector(state)).toEqual(false);
    });

    it('should return true if there is one task loading', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: true,
            error: null,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: false,
            error: null,
          },
        },
      };
      expect(isSyncingSelector(state)).toEqual(true);
    });

    it('should return true if there are two tasks loading', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: true,
            error: null,
          },
          task2: {
            isLoading: false,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: true,
            error: null,
          },
        },
      };
      expect(isSyncingSelector(state)).toEqual(true);
    });

    it('should return true if everything is loading', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: true,
            error: null,
          },
          task2: {
            isLoading: true,
            error: null,
          },
        },
        page2: {
          task1: {
            isLoading: true,
            error: null,
          },
        },
      };
      expect(isSyncingSelector(state)).toEqual(true);
    });

    it('should return true for a given task is it is syncing', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: true,
            error: null,
          },
        },
      };
      expect(isSyncingSelector(state, 'page1', 'task1')).toEqual(true);
    });

    it('should return false for a given task is it is not syncing', () => {
      state.sync = {
        ...state.sync,
        page1: {
          task1: {
            isLoading: false,
            error: null,
          },
        },
      };
      expect(isSyncingSelector(state, 'page1', 'task1')).toEqual(false);
    });
  });
});
