// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Icon } from '../../../components';
import { sprintsSuccessMatrixSelector } from '../../../modules/sprints/reducer';
import type { SprintsSuccessMatrixType } from '../../../modules/sprints/reducer';

class SuccessMatrix extends Component {
  props: PropsType;

  renderRow = ({ item: sprint }) => (
    <View style={styles.row}>
      <Text style={[styles.column, styles.idColumn]}>{sprint.number}</Text>
      <Text style={styles.column}>{sprint.manDays.toLocaleString()}</Text>
      <Text style={styles.column}>{sprint.foreseenPoints.toLocaleString()}</Text>
      <Text style={styles.column}>{sprint.donePoints && sprint.donePoints.toLocaleString()}</Text>
      <Text style={[styles.column, styles.okColumn]}>
        {sprint.result !== null
          ? sprint.result
              ? <Icon type="entypo" name="emoji-happy" size={20} color="green" />
              : <Icon type="entypo" name="emoji-sad" size={20} color="red" />
          : <Icon type="entypo" name="emoji-neutral" size={20} color="orange" />}
      </Text>
    </View>
  );

  renderHeader = () => (
    <View style={[styles.row, styles.labelRow]}>
      <Text style={[styles.column, styles.idColumn, styles.label]}>#</Text>
      <Text style={[styles.column, styles.label]}>Man-days</Text>
      <Text style={[styles.column, styles.label]}>Foreseen</Text>
      <Text style={[styles.column, styles.label]}>Done</Text>
      <Text style={[styles.column, styles.okColumn, styles.label]}>OK?</Text>
    </View>
  );

  render() {
    return (
      <View>
        <FlatList
          data={this.props.successMatrix}
          contentContainerStyle={this.props.style}
          renderItem={this.renderRow}
          keyExtractor={sprint => sprint.number}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  labelRow: {
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  column: {
    width: '25%',
    textAlign: 'center',
  },
  idColumn: {
    width: 20,
  },
  okColumn: {
    width: 25,
  },
});

type PropsType = {
  style?: any,
  successMatrix: SprintsSuccessMatrixType,
};

const mapStateToProps = state => ({
  successMatrix: sprintsSuccessMatrixSelector(state),
});

export default connect(mapStateToProps)(SuccessMatrix);
