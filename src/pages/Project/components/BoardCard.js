import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import type { BoardType } from '../../../types';

export default class BoardCard extends Component {
  props: PropsType;

  renderName = () => {
    const { board } = this.props;

    return (
      <Text style={[styles.name, { color: board.background.brightness === 'light' ? 'black' : 'white' }]}>
        {board.name}
      </Text>
    );
  };

  renderContent = () => {
    const { board } = this.props;

    if (board.background.image) {
      return (
        <Image style={styles.content} resizeMode="cover" source={{ uri: board.background.image }}>
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
};

const borderRadius = 3;
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
  name: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
});
