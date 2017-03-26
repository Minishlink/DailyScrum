// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { authSelector } from '../../modules/auth/reducer';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { Trello } from 'DailyScrum/src/services';

import type { SprintType } from '../../modules/sprints/reducer';
import type { AuthType } from '../../modules/auth/reducer';
import type { ProjectType } from '../../modules/projects/reducer';

class Yesterday extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  // points done
  // show cards in done
  // show cards in to be validated without identifying (should be in problems)
  // show cards in blocked without identifying (should be in problems)
  // show cards in doing without identifying (should be in problems)

  // Use FlatList / SectionList when 0.43 out

  // TODO saga + store
  // TODO filter by member
  // TODO identify unchecked checklists
  // TODO extract and show points
  // TODO extract and show estimated points
  // TODO show labels
  // TODO show ticket #shortId
  // TODO on click show attachments
  // TODO on click show description

  fetchCards = () => {
    if (!this.props.token || !this.props.currentSprint || !this.props.currentProject) return;
    const { token, currentSprint, currentProject } = this.props;
    this.setState({ refreshing: true });
    Trello.getCardsFromList(token.trello, currentSprint.doneColumn).then(cards => {
      const today = new Date();
      today.setHours(9, 0, 0, 0);
      const todayWeekNumber = today.getDay();

      let offsetTime = 86400; // one day
      if (todayWeekNumber <= 1) {
        // sunday or monday
        offsetTime += 86400;
      }
      if (todayWeekNumber === 1) {
        // monday
        offsetTime += 86400;
      }

      const lastWorkableDayTime = today.getTime() - offsetTime * 1000;
      this.setState({
        cards: cards.filter(card => new Date(card.dateLastActivity).getTime() > lastWorkableDayTime).map(card => ({
          ...card,
          members: card.idMembers.map(id => currentProject.team.find(member => member.id === id)),
        })),
        refreshing: false,
      });
    });
  };

  render() {
    const { currentSprint } = this.props;
    if (!currentSprint) return <Page isLoading />;

    return (
      <Page>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchCards} />}
          >
            {this.state.cards &&
              this.state.cards.map(card => (
                <View key={card.idShort}><TrelloCard title={card.name} members={card.members} /></View>
              ))}
          </ScrollView>
        </View>
      </Page>
    );
  }
}

type PropsType = AuthType & {
  navigation: any,
  currentSprint: ?SprintType,
  currentProject: ?ProjectType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const mapStateToProps = state => ({
  ...authSelector(state),
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
});

export default connect(mapStateToProps)(Yesterday);
