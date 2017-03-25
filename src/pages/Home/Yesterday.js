// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import type { SprintType } from '../../modules/sprints/reducer';

class Yesterday extends Component {
  props: PropsType;

  render() {
    const { currentSprint } = this.props;
    if (!currentSprint) return <Page isLoading />;

    return (
      <Page>
        <View style={styles.container}>
          <TrelloCard title="Yesterday user story" />
        </View>
      </Page>
    );
  }
}

type PropsType =  {
  navigation: any,
  currentSprint: ?SprintType,
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
  currentSprint: currentSprintSelector(state),
});

export default connect(mapStateToProps)(Yesterday);
