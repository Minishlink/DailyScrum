// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import { isEqual } from 'lodash';
import { Text, Graph, Card } from '../../../components';
import appStyle from '../../../appStyle';
import { sprintsCelerityGraphDataPointsSelector } from '../../../modules/sprints/reducer';
import type { GraphDataType } from '../../../types';
import { roundToDecimalPlace } from '../../../services/MathService';

class CelerityGraph extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props.celerityGraphDataPoints, nextProps.celerityGraphDataPoints);
  }

  formatXLabel = index => {
    const firstGraph = this.props.celerityGraphDataPoints[0];
    if (!firstGraph) return null;
    const dataPoint = firstGraph[index];
    if (!dataPoint) return null;
    return '#' + dataPoint.number;
  };

  renderLastCelerities = () => {
    if (!this.props.celerityGraphDataPoints[1]) return null;

    const lastThreeDataPoints = this.props.celerityGraphDataPoints[1].slice(-3);
    const recentAverage = roundToDecimalPlace(
      lastThreeDataPoints.map(points => points.y).reduce((a, b) => a + b, 0) / lastThreeDataPoints.length
    );
    const [lastDataPoint] = lastThreeDataPoints.slice(-1);
    if (!lastDataPoint) return null;

    return <Text style={styles.lastCelerities}>{`(last: ${lastDataPoint.y} / recent avg.: ${recentAverage})`}</Text>;
  };

  render() {
    if (!this.props.celerityGraphDataPoints) {
      return <Text>You don't have any sprint yet!</Text>;
    }

    return (
      <Card style={[styles.container, this.props.style]}>
        <View style={styles.titleAndCaption}>
          <View>
            <Text style={styles.title}>Celerity</Text>
            {this.renderLastCelerities()}
          </View>
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
          dataPoints={this.props.celerityGraphDataPoints}
          style={styles.graph}
          colors={[appStyle.colors.red, appStyle.colors.primary]}
          minY={0}
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
  lastCelerities: {
    fontSize: appStyle.font.size.small,
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
    height: 0.25 * Dimensions.get('window').height,
  },
});

type Props = {
  celerityGraphDataPoints: GraphDataType,
  style: any,
};

const mapStateToProps = state => ({
  celerityGraphDataPoints: sprintsCelerityGraphDataPointsSelector(state),
});

export default connect(mapStateToProps)(CelerityGraph);
