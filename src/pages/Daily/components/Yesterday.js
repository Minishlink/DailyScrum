// @flow
import { connect } from 'react-redux';
import { yesterdayCardsSelector } from '../../../modules/cards/reducer';
import { fetchDoneCards } from 'DailyScrum/src/modules/cards';
import { isSyncingSelector } from '../../../modules/sync';
import createCardPage from './CardPage';
import { filteredMemberSelector } from '../../../modules/cardLists';

const Page = createCardPage('Yesterday', 'yesterday');

const mapStateToProps = state => ({
  cardLists: yesterdayCardsSelector(state),
  isSyncing: isSyncingSelector(state, 'cards', 'done'),
  filteredMember: filteredMemberSelector(state, 'yesterday'),
});

const mapDispatchToProps = {
  fetchCards: fetchDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
