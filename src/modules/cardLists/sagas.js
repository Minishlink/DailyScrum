// @flow
import { select, put } from 'redux-saga/effects';
import { setUserPoints } from './';
import { todayCardsSelector, yesterdayCardsSelector } from '../cards/reducer';
import type { CardListsType } from '../cards/reducer';
import type { CardListsKeyType } from '../cardLists/reducer';
import { roundToDecimalPlace } from '../../services/MathService';

export function* configureCardList(cardLists: CardListsType, cardListsKey: CardListsKeyType): Generator<*, *, *> {
  const userPoints = {};
  Object.values(cardLists).forEach(column =>
    // $FlowFixMe
    column.list.forEach(card =>
      card.idMembers.forEach(memberId => {
        const currentPoints = userPoints[memberId];
        const newPoints = !!card.points ? roundToDecimalPlace(card.points / card.idMembers.length) : 0;
        if (currentPoints) {
          userPoints[memberId] += newPoints;
        } else {
          userPoints[memberId] = newPoints;
        }
      })
    )
  );

  yield put(setUserPoints(userPoints, cardListsKey));
}

export function* configureTodayCardList(): Generator<*, *, *> {
  const cardLists = yield select(todayCardsSelector);
  yield* configureCardList(cardLists, 'today');
}

export function* configureYesterdayCardList(): Generator<*, *, *> {
  const cardLists = yield select(yesterdayCardsSelector);
  yield* configureCardList(cardLists, 'yesterday');
}
