// @flow
import { connect } from 'react-redux';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards } from 'DailyScrum/src/modules/cards';
import { isSyncingSelector } from '../../modules/sync';
import { createCardPage } from './components';

const Page = createCardPage('Today', 'notDone');

const mapStateToProps = state => ({
  cardLists: todayCardsSelector(state),
  isSyncing: isSyncingSelector(state, 'cards', 'notDone'),
});

const mapDispatchToProps = {
  fetchCards: fetchNotDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
