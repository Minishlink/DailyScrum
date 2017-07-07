// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import { StockLine } from 'react-native-pathjs-charts';
import { bdcDataPointsSelector } from '../../modules/sprints/reducer';
import type { BdcDataPointsType } from '../../modules/sprints/reducer';
import { format } from 'date-fns';
import SprintPicker from './components/SprintPicker';
import appStyle from '../../appStyle';

const graphOptions = {
  width: Dimensions.get('window').width * 0.8,
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
      fontSize: appStyle.font.size.small,
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
      fontSize: appStyle.font.size.small,
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
      <Page noMargin style={styles.container}>
        <View style={styles.pickerContainer}>
          <SprintPicker />
        </View>
        <View style={styles.bdcContainer}>
          {this.props.bdcDataPoints
            ? <StockLine data={this.props.bdcDataPoints} options={graphOptions} pallete={pallete} xKey="x" yKey="y" />
            : <Text>You don't have any sprint yet!</Text>}
        </View>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  bdcDataPoints: BdcDataPointsType,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  pickerContainer: {
    marginHorizontal: 20,
  },
  bdcContainer: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  bdcDataPoints: bdcDataPointsSelector(state),
});

export default connect(mapStateToProps)(Summary);
