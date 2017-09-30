import { syncReducer as reducer } from '../';
import * as Actions from '../actions';

const initialState = {};

describe('sync reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return the state if there is no payload', () => {
    expect(reducer({ foo: 'bar' }, {})).toEqual({ foo: 'bar' });
  });

  it('should handle START_SYNC', () => {
    expect(reducer({ ...initialState }, Actions.startSync('foo', 'bar'))).toEqual({
      foo: { bar: { isLoading: true, error: null } },
    });
    expect(reducer({ ...initialState }, Actions.startSync('kung', 'foo'))).toEqual({
      kung: { foo: { isLoading: true, error: null } },
    });
  });

  it('should handle END_SYNC', () => {
    expect(reducer({ ...initialState }, Actions.endSync('foo', 'bar'))).toEqual({
      foo: { bar: { isLoading: false, error: null } },
    });
    expect(reducer({ ...initialState }, Actions.endSync('foo', 'bar', 'error'))).toEqual({
      foo: { bar: { isLoading: false, error: 'error' } },
    });
    expect(reducer({ ...initialState }, Actions.endSync('kung', 'foo'))).toEqual({
      kung: { foo: { isLoading: false, error: null } },
    });
  });

  it('should handle CLEAR_ERRORS', () => {
    expect(reducer({ foo: { bar: { error: 'toto ' } } }, Actions.clearErrors('foo', 'bar'))).toEqual({
      foo: { bar: { error: null } },
    });

    expect(
      reducer({ foo: { bar: { error: 'toto ' }, kung: { error: 'foo ' } } }, Actions.clearErrors('foo', 'bar'))
    ).toEqual({
      foo: { bar: { error: null }, kung: { error: 'foo ' } },
    });

    expect(reducer({ foo: { bar: { error: 'toto ' }, kung: { error: 'foo ' } } }, Actions.clearErrors('foo'))).toEqual({
      foo: { bar: { error: null }, kung: { error: null } },
    });

    expect(
      reducer(
        { foo: { bar: { error: 'toto ' }, kung: { error: 'foo ' } }, kung: { foo: { error: 'toto ' } } },
        Actions.clearErrors()
      )
    ).toEqual({
      foo: { bar: { error: null }, kung: { error: null } },
      kung: { foo: { error: null } },
    });
  });
});
