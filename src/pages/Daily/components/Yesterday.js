// @flow
import { connect } from 'react-redux';
import { yesterdayCardsSelector } from '../../../modules/cards/reducer';
import { fetchDoneCards } from 'DailyScrum/src/modules/cards';
import { isSyncingSelector } from '../../../modules/sync';
import { makeFilterMembers } from '../../../components/CardLists';
import { filteredMemberSelector } from '../../../modules/cardLists';
import { CardLists } from '../../../components/CardLists';

const FilterMembersComponent = makeFilterMembers('yesterday');

const mapStateToProps = (state, ownProps) => ({
  cardLists: yesterdayCardsSelector(state),
  isRefreshing: isSyncingSelector(state, 'cards', 'done'),
  filteredMember: filteredMemberSelector(state, 'yesterday'),
  FilterMembersComponent,
  onScroll: ownProps.onScrollCards,
});

const mapDispatchToProps = {
  onRefresh: fetchDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLists);
