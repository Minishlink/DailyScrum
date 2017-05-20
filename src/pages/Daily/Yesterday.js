// @flow
import { connect } from 'react-redux';
import { yesterdayCardsSelector } from '../../modules/cards/reducer';
import { fetchDoneCards } from 'DailyScrum/src/modules/cards';
import { isSyncingSelector } from '../../modules/sync';
import { createCardPage } from './components';

const Page = createCardPage('Yesterday', 'done');

const mapStateToProps = state => ({
  cardLists: yesterdayCardsSelector(state),
  isSyncing: isSyncingSelector(state, 'cards', 'done'),
});

const mapDispatchToProps = {
  fetchCards: fetchDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
