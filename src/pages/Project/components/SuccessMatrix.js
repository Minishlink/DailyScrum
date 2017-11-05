// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import FlatList from 'FlatList';
import { Icon, Text, Card } from '../../../components';
import { sprintsSuccessMatrixSelector } from '../../../modules/sprints/reducer';
import type { SprintsSuccessMatrixType } from '../../../modules/sprints/reducer';
import appStyle from '../../../appStyle';

class SuccessMatrix extends Component<Props> {
  renderRow = ({ item: sprint }) => (
    <View style={styles.row}>
      <Text style={[styles.column, styles.idColumn]}>#{sprint.number}</Text>
      <Text style={styles.column}>{sprint.manDays.toLocaleString()}</Text>
      <Text style={styles.column}>{sprint.foreseenPoints.toLocaleString()}</Text>
      <Text style={styles.column}>{sprint.donePoints && sprint.donePoints.toLocaleString()}</Text>
      <Text style={[styles.column, styles.okColumn]}>
        {sprint.result !== null ? (
          sprint.result ? (
            <Icon type="entypo" name="emoji-happy" size={18} color="green" />
          ) : (
            <Icon type="entypo" name="emoji-sad" size={18} color="red" />
          )
        ) : (
          <Icon type="entypo" name="emoji-neutral" size={18} color="orange" />
        )}
      </Text>
    </View>
  );

  renderHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.column, styles.idColumn, styles.label]} />
      <Text style={[styles.column, styles.label]}>Man-days</Text>
      <Text style={[styles.column, styles.label]}>Foreseen</Text>
      <Text style={[styles.column, styles.label]}>Done</Text>
      <Text style={[styles.column, styles.okColumn, styles.label]} />
    </View>
  );

  keyExtractor = sprint => sprint.number.toString();

  render() {
    return (
      <Card style={this.props.style}>
        <Text style={styles.title}>Sprints history</Text>
        <FlatList
          data={this.props.successMatrix}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: appStyle.margin,
  },
  label: {
    color: appStyle.colors.warmGray,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  column: {
    width: '25%',
    textAlign: 'center',
    fontSize: appStyle.font.size.small,
  },
  idColumn: {
    width: 25,
    color: appStyle.colors.warmGray,
  },
  okColumn: {
    width: 25,
  },
});

type Props = {
  style?: any,
  successMatrix: SprintsSuccessMatrixType,
};

const mapStateToProps = state => ({
  successMatrix: sprintsSuccessMatrixSelector(state),
});

export default connect(mapStateToProps)(SuccessMatrix);
