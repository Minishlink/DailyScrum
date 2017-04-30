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
      <Text>{sprint.number}</Text>
      <Text>{sprint.manDays}</Text>
      <Text>{sprint.foreseenPoints}</Text>
      <Text>{sprint.donePoints}</Text>
      <Text>
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
      <Text style={styles.label}>#</Text>
      <Text style={styles.label}>Man-days</Text>
      <Text style={styles.label}>Foreseen</Text>
      <Text style={styles.label}>Done</Text>
      <Text style={styles.label}>OK?</Text>
    </View>
  );

  render() {
    return (
      <View style={this.props.style}>
        <FlatList
          data={this.props.successMatrix}
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
    paddingVertical: 2,
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
