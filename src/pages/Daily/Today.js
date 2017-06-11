// @flow
import { connect } from 'react-redux';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards } from 'DailyScrum/src/modules/cards';
import { isSyncingSelector } from '../../modules/sync';
import { createCardPage } from './components';
import { filteredMemberSelector } from '../../modules/cardLists';

const Page = createCardPage('Today', 'notDone');

const mapStateToProps = state => ({
  cardLists: todayCardsSelector(state),
  isSyncing: isSyncingSelector(state, 'cards', 'notDone'),
  filteredMember: filteredMemberSelector(state, 'today'),
});

const mapDispatchToProps = {
  fetchCards: fetchNotDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
