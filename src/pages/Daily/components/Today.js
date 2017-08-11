// @flow
import { connect } from 'react-redux';
import { todayCardsSelector } from '../../../modules/cards/reducer';
import { fetchNotDoneCards } from 'DailyScrum/src/modules/cards';
import { isSyncingSelector } from '../../../modules/sync';
import { filteredMemberSelector } from '../../../modules/cardLists';
import { makeFilterMembers } from '../../../components/CardLists';
import { CardLists } from '../../../components/CardLists';

const FilterMembersComponent = makeFilterMembers('today');

const mapStateToProps = (state, ownProps) => ({
  cardLists: todayCardsSelector(state),
  isRefreshing: isSyncingSelector(state, 'cards', 'notDone'),
  filteredMember: filteredMemberSelector(state, 'today'),
  FilterMembersComponent,
  onScroll: ownProps.onScrollCards,
});

const mapDispatchToProps = {
  onRefresh: fetchNotDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLists);
