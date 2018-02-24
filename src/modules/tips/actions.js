// @flow
import type { TipType, TipIDType } from './reducer';

export type ActionType = {|
  type: 'MARK_TIP_AS_READ',
  payload: {|
    id: TipIDType,
  |},
|};

export function markTipAsRead(tip: TipType): ActionType {
  return { type: 'MARK_TIP_AS_READ', payload: { id: tip.id } };
}
