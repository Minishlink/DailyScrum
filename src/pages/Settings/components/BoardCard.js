import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import type { BoardType } from '../../../types';
import { Icon } from '../../../components';

const borderRadius = 3;
export default class BoardCard extends Component {
  props: PropsType;

  renderName = () => {
    const { board, isActive } = this.props;
    const color = board.background.brightness === 'light' ? 'black' : 'white';

    return (
      <View style={styles.nameContainer}>
        <Text style={[styles.name, { color }]}>
          {board.name}
        </Text>
        {isActive && <View style={styles.activeIcon}><Icon name="check-circle" size={20} color={color} /></View>}
      </View>
    );
  };

  renderContent = () => {
    const { board } = this.props;

    if (board.background.image) {
      return (
        <Image
          style={styles.content}
          resizeMode="cover"
          borderRadius={borderRadius}
          source={{ uri: board.background.image }}
        >
          {this.renderName()}
        </Image>
      );
    }

    return (
      <View style={[styles.content, board.background.color && { backgroundColor: board.background.color }]}>
        {this.renderName()}
      </View>
    );
  };

  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={this.props.onPress}>
        {this.renderContent()}
      </TouchableHighlight>
    );
  }
}

type PropsType = {
  board: BoardType,
  onPress: Function,
  isActive: boolean,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius,
  },
  content: {
    minHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius,
    backgroundColor: 'grey',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  activeIcon: {
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
});
