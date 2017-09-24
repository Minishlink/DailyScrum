// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StockLine } from 'react-native-pathjs-charts';
import { format } from 'date-fns';
import { isEqual } from 'lodash';
import { Text } from '../../../components';
import appStyle from '../../../appStyle';
import { bdcDataPointsSelector } from '../../../modules/sprints/reducer';
import type { BdcDataPointsType } from '../../../modules/sprints/reducer';
import Card from '../../../components/Card';

class BDC extends Component {
  props: PropsType;
  state: StateType = { graphSize: null };

  shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
    return (
      !isEqual(this.props.bdcDataPoints, nextProps.bdcDataPoints) || !isEqual(this.state.graphSize, nextState.graphSize)
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
      color: appStyle.colors.text,
      showAreas: false,
      strokeWidth: strokeSize,
      margin: {
        // experimental
        top: 2 * appStyle.margin,
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
          const standardGraph = this.props.bdcDataPoints[1];
          if (!standardGraph) return null;
          const dataPoint = standardGraph[index];
          if (!dataPoint) return null;
          return format(dataPoint.date, 'D/M');
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
        <View style={styles.graphContainer} onLayout={this.measureGraphSize}>
          {this.state.graphSize
            ? <StockLine
                data={this.props.bdcDataPoints}
                options={this.getGraphOptions()}
                pallete={pallete}
                xKey="x"
                yKey="y"
              />
            : <ActivityIndicator />}
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

const pallete = [hexToRgb(appStyle.colors.primary), hexToRgb(appStyle.colors.red)];
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
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type PropsType = {
  bdcDataPoints: BdcDataPointsType,
};

type StateType = {
  graphSize: ?{
    width: number,
    height: number,
  },
};

const mapStateToProps = state => ({
  bdcDataPoints: bdcDataPointsSelector(state),
});

export default connect(mapStateToProps)(BDC);
