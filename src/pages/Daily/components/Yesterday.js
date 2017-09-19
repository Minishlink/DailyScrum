// @flow
import { connect } from 'react-redux';
import { yesterdayCardsSelector } from '../../../modules/cards/reducer';
import { fetchCards } from '../../../modules/cards/';
import { isSyncingSelector } from '../../../modules/sync';
import { makeFilterMembers } from '../../../components/CardLists';
import { filteredMemberSelector } from '../../../modules/cardLists';
import { CardLists } from '../../../components/CardLists';

const FilterMembersComponent = makeFilterMembers('yesterday');

const mapStateToProps = (state, ownProps) => ({
  cardLists: yesterdayCardsSelector(state),
  isRefreshing: isSyncingSelector(state, 'cards'),
  filteredMember: filteredMemberSelector(state, 'yesterday'),
  FilterMembersComponent,
  onScroll: ownProps.onScrollCards,
});

const mapDispatchToProps = {
  onRefresh: fetchCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLists);
