// @flow
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StockLine } from 'react-native-pathjs-charts';
import { isEqual } from 'lodash';
import appStyle from '../appStyle';
import type { GraphDataType } from '../types';

export default class Graph extends Component<Props, State> {
  state = { graphSize: null };
  palette: Object[];

  constructor(props: Props) {
    super(props);
    this.palette = props.colors.map(hexToRgb).filter(Boolean);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(this.props.dataPoints, nextProps.dataPoints) || !isEqual(this.state.graphSize, nextState.graphSize);
  }

  measureGraphSize = ({ nativeEvent }: any) =>
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
      min: this.props.minY,
      color: appStyle.colors.text,
      strokeWidth: 2,
      showAreas: false,
      showPoints: true,
      pointRadius: this.props.dataPoints[0].length > 15 ? 2 : 3.5,
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
        labelFunction: this.props.formatXLabel,
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
        labelFunction: this.props.formatYLabel,
      },
    };

  render() {
    if (this.props.dataPoints.some(dataPoint => !dataPoint.length)) return null;
    return (
      <View style={[styles.graphContainer, this.props.style]} onLayout={this.measureGraphSize}>
        {this.state.graphSize ? (
          <StockLine
            data={this.props.dataPoints}
            options={this.getGraphOptions()}
            pallete={this.palette}
            xKey="x"
            yKey="y"
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

type Props = {
  dataPoints: GraphDataType,
  colors: string[],
  style: any,
  minY?: number,
  formatXLabel?: (x: any) => string,
  formatYLabel?: (y: any) => string,
};

type State = {
  graphSize: ?{
    width: number,
    height: number,
  },
};

const styles = StyleSheet.create({
  graphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
