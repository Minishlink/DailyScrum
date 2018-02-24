//@flow

export type ActionType = {|
  type: 'REDIRECT_AFTER_LOGIN',
  payload: {|
    isFirstTime: boolean,
  |},
|};

export const redirectAfterLogin = (isFirstTime: boolean): ActionType => ({
  type: 'REDIRECT_AFTER_LOGIN',
  payload: {
    isFirstTime,
  },
});

export const resetToLogin = () => ({ type: 'RESET_TO_LOGIN' });
