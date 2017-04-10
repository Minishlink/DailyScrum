// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import type { SprintType } from '../../types/App';

class Problems extends Component {
  props: PropsType;

  // points in blocked (red)
  // show cards in blocked without identifying

  // show cards with red label (red)

  // points in to be validated (orange)
  // show cards in to be validated (orange, or red if > 2 days)

  // show cards in doing (normal)

  // show cards in to be validated / done with a comment from the PO and ask if you should labellize red

  render() {
    const { currentSprint } = this.props;
    if (!currentSprint) return <Page isLoading />;

    return (
      <Page>
        <View style={styles.container}>
          <TrelloCard title="Problems" />
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

export default connect(mapStateToProps)(Problems);
