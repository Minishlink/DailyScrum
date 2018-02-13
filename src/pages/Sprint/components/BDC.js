// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { isEqual } from 'lodash';
import { Text, Card, Graph } from '../../../components';
import appStyle from '../../../appStyle';
import { bdcDataPointsSelector } from '../../../modules/sprints/reducer';
import type { GraphDataType } from '../../../modules/sprints/reducer';

class BDC extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props.bdcDataPoints, nextProps.bdcDataPoints);
  }

  formatXLabel = index => {
    const firstGraph = this.props.bdcDataPoints[0];
    if (!firstGraph) return null;
    const dataPoint = firstGraph[index];
    if (!dataPoint) return null;
    return format(dataPoint.date, 'D/M');
  };

  render() {
    if (!this.props.bdcDataPoints) {
      return <Text>You don't have any sprint yet!</Text>;
    }

    return (
      <Card style={styles.container}>
        <View style={styles.titleAndCaption}>
          <Text style={styles.title}>Burndown chart</Text>
          <View>
            <View style={styles.caption}>
              <View style={[styles.line, styles.standard]} />
              <Text style={styles.captionText}>Standard</Text>
            </View>
            <View style={styles.caption}>
              <View style={[styles.line, styles.actual]} />
              <Text style={styles.captionText}>Actual</Text>
            </View>
          </View>
        </View>
        <Graph
          dataPoints={this.props.bdcDataPoints}
          style={styles.graph}
          colors={[appStyle.colors.red, appStyle.colors.primary]}
          formatXLabel={this.formatXLabel}
          formatYLabel={Math.round}
        />
      </Card>
    );
  }
}

const strokeSize = 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleAndCaption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: strokeSize,
    width: 28,
  },
  standard: {
    backgroundColor: appStyle.colors.red,
  },
  actual: {
    backgroundColor: appStyle.colors.primary,
  },
  captionText: {
    fontSize: appStyle.font.size.small,
    marginLeft: appStyle.margin,
  },
  graph: {
    flex: 1,
  },
});

type Props = {
  bdcDataPoints: GraphDataType,
};

const mapStateToProps = state => ({
  bdcDataPoints: bdcDataPointsSelector(state),
});

export default connect(mapStateToProps)(BDC);
