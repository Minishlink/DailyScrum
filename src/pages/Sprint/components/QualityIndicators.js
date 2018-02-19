// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Card, Text } from '../../../components';
import appStyle from '../../../appStyle';
import { analyzeQuality } from '../../../modules/qualityIndicators';
import { bugsCountSelector, validationFeedbacksCountSelector } from '../../../modules/qualityIndicators/reducer';
import { isSyncingSelector } from '../../../modules/sync';

export class QualityIndicators extends Component<Props> {
  renderCount = (count: number) => (
    <Text style={[styles.count, count === 0 ? styles.standardOK : styles.standardKO]}>{count}</Text>
  );

  render() {
    if (this.props.isLoading) {
      return (
        <View style={[styles.container, styles.loading, this.props.style]}>
          <ActivityIndicator />
        </View>
      );
    }

    const { bugs, validationFeedbacks } = this.props;
    if (bugs == null || validationFeedbacks == null) {
      return null;
    }

    return (
      <View style={[styles.container, styles.indicatorCardsContainer, this.props.style]}>
        <Card style={[styles.card, styles.firstCard]}>
          {this.renderCount(bugs)}
          <Text>bugs</Text>
        </Card>
        <Card style={styles.card}>
          {this.renderCount(validationFeedbacks)}
          <Text>validation feedbacks</Text>
        </Card>
      </View>
    );
  }
}

type Props = {
  style?: any,
  bugs: ?number,
  validationFeedbacks: ?number,
  analyzeQuality: Function,
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorCardsContainer: {
    flexDirection: 'row',
  },
  firstCard: {
    marginRight: 2 * (appStyle.margin - appStyle.shadow.radius),
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2 * appStyle.margin,
  },
  count: {
    marginRight: appStyle.margin,
    fontSize: 1.5 * appStyle.font.size.big,
    fontWeight: 'bold',
  },
  standardOK: {
    color: appStyle.colors.green,
  },
  standardKO: {
    color: appStyle.colors.red,
  },
});

const mapStateToProps = state => ({
  bugs: bugsCountSelector(state),
  validationFeedbacks: validationFeedbacksCountSelector(state),
  isLoading: isSyncingSelector(state, 'sprints', 'qualityIndicators'),
});

const mapDispatchToProps = {
  analyzeQuality,
};

export default connect(mapStateToProps, mapDispatchToProps)(QualityIndicators);
