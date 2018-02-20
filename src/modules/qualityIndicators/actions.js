// @flow
export type ActionType =
  | {|
      type: 'ANALYZE_QUALITY',
    |}
  | {|
      type: 'SET_BUGS_COUNT',
      payload: {|
        count: number,
      |},
    |}
  | {|
      type: 'SET_VALIDATION_FEEDBACKS_COUNT',
      payload: {|
        count: number,
      |},
    |};

export const analyzeQuality = () => ({
  type: 'ANALYZE_QUALITY',
});

export const setBugsCount = (count: number) => ({
  type: 'SET_BUGS_COUNT',
  payload: { count },
});

export const setValidationFeedbacksCount = (count: number) => ({
  type: 'SET_VALIDATION_FEEDBACKS_COUNT',
  payload: { count },
});
