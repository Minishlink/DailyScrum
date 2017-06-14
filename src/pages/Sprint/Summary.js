// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import { StockLine } from 'react-native-pathjs-charts';
import { bdcDataPointsSelector } from '../../modules/sprints/reducer';
import { format } from 'date-fns';

const graphOptions = {
  width: Dimensions.get('window').width * 0.80,
  height: 300,
  color: '#2980B9',
  showAreas: false,
  strokeWidth: 2,
  margin: {
    top: 20,
    left: 45,
    bottom: 25,
    right: 20,
  },
  animate: {
    type: 'delayed',
    duration: 200,
  },
  axisX: {
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'bottom',
    label: {
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: true,
      fill: '#34495E',
    },
    labelFunction: dateTime => format(dateTime, 'D/M'),
  },
  axisY: {
    showLines: true,
    showLabels: true,
    zeroAxis: true,
    orient: 'left',
    label: {
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: true,
      fill: '#34495E',
    },
  },
};

const pallete = [{ r: 25, g: 99, b: 201 }, { r: 190, g: 31, b: 69 }];

class Summary extends Component {
  props: PropsType;

  render() {
    return (
      <Page style={styles.container}>
        {this.props.bdcDataPoints
          ? <StockLine data={this.props.bdcDataPoints} options={graphOptions} pallete={pallete} xKey="x" yKey="y" />
          : <Text>You don't have any sprint yet!</Text>}
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  bdcDataPoints: bdcDataPointsSelector(state),
});

export default connect(mapStateToProps)(Summary);
