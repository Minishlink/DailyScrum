// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { StockLine } from 'react-native-pathjs-charts';
import { isEqual } from 'lodash';
import { Text } from '../../../components';
import appStyle from '../../../appStyle';
import { sprintsCelerityGraphDataPointsSelector } from '../../../modules/sprints/reducer';
import type { GraphDataType } from '../../../modules/sprints/reducer';
import Card from '../../../components/Card';
import { roundToDecimalPlace } from '../../../services/MathService';

class CelerityGraph extends Component<Props, State> {
  state = { graphSize: null };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !isEqual(this.props.celerityGraphDataPoints, nextProps.celerityGraphDataPoints) ||
      !isEqual(this.state.graphSize, nextState.graphSize)
    );
  }

  measureGraphSize = ({ nativeEvent }) =>
    this.setState({
      graphSize: {
        width: nativeEvent.layout.width - 50, // 50 is experimental
        height: nativeEvent.layout.height - 40, // 40 is experimental
      },
    });

  getGraphOptions = () =>
    this.state.graphSize && {
      width: this.state.graphSize.width,
      height: this.state.graphSize.height,
      min: 0,
      color: appStyle.colors.text,
      strokeWidth: 2,
      showAreas: false,
      showPoints: true,
      pointRadius: this.props.celerityGraphDataPoints[0].length > 15 ? 2 : 3.5,
      margin: {
        // experimental
        top: 1.5 * appStyle.margin,
        left: 24,
        bottom: 25,
        right: 2 * appStyle.margin,
      },
      animate: {
        type: 'delayed',
        duration: 200,
      },
      axisX: {
        showLabels: true,
        orient: 'bottom',
        label: {
          fontFamily: appStyle.font.family,
          fontSize: appStyle.font.size.small,
          fill: appStyle.colors.warmGray,
        },
        labelFunction: index => {
          const standardGraph = this.props.celerityGraphDataPoints[0];
          if (!standardGraph) return null;
          const dataPoint = standardGraph[index];
          if (!dataPoint) return null;
          return '#' + dataPoint.number;
        },
      },
      axisY: {
        showLines: true,
        showLabels: true,
        gridColor: appStyle.colors.veryLightGray,
        orient: 'left',
        label: {
          fontFamily: appStyle.font.family,
          fontSize: appStyle.font.size.small,
          fill: appStyle.colors.text,
        },
        labelFunction: Math.round,
      },
    };

  render() {
    if (!this.props.celerityGraphDataPoints) {
      return <Text>You don't have any sprint yet!</Text>;
    }

    const lastThreeDataPoints = this.props.celerityGraphDataPoints[1].slice(-3);
    const recentAverage = roundToDecimalPlace(
      lastThreeDataPoints.map(points => points.y).reduce((a, b) => a + b, 0) / lastThreeDataPoints.length
    );
    const [lastDataPoint] = lastThreeDataPoints.slice(-1);

    return (
      <Card style={[styles.container, this.props.style]}>
        <View style={styles.titleAndCaption}>
          <View>
            <Text style={styles.title}>Celerity</Text>
            {!!lastDataPoint && (
              <Text style={styles.lastCelerities}>{`(last: ${lastDataPoint.y} / recent avg.: ${recentAverage})`}</Text>
            )}
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

        <View style={styles.graphContainer} onLayout={this.measureGraphSize}>
          {this.state.graphSize ? (
            <StockLine
              data={this.props.celerityGraphDataPoints}
              options={this.getGraphOptions()}
              pallete={pallete}
              xKey="x"
              yKey="y"
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </Card>
    );
  }
}

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const pallete = [hexToRgb(appStyle.colors.red), hexToRgb(appStyle.colors.primary)];
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
  graphContainer: {
    height: 0.25 * Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  celerityGraphDataPoints: GraphDataType,
  style: any,
};

type State = {
  graphSize: ?{
    width: number,
    height: number,
  },
};

const mapStateToProps = state => ({
  celerityGraphDataPoints: sprintsCelerityGraphDataPointsSelector(state),
});

export default connect(mapStateToProps)(CelerityGraph);
