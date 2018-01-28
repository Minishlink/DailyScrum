import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ActivityIndicator, ImageBackground } from 'react-native';
import type { BoardType } from '../../../types';
import { Text, Icon } from '../../../components';
import appStyle from '../../../appStyle';

const borderRadius = appStyle.borderRadius;
export default class BoardCard extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      nextProps.isActive !== this.props.isActive ||
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.board.name !== this.props.board.name
    );
  }

  renderName = () => {
    const { board, isActive, isLoading } = this.props;
    const color = board.background.brightness === 'light' ? 'black' : 'white';

    return (
      <View style={styles.nameContainer}>
        <Text style={[styles.name, { color }]}>{board.name}</Text>
        {isActive &&
          !isLoading && (
            <View style={[styles.icon, styles.activeIcon]}>
              <Icon name="check-circle" size={20} color={color} />
            </View>
          )}
        {isLoading && (
          <View style={styles.icon}>
            <ActivityIndicator color={color} />
          </View>
        )}
      </View>
    );
  };

  renderContent = () => {
    const { board } = this.props;

    if (board.background.image) {
      return (
        <ImageBackground
          style={styles.content}
          resizeMode="cover"
          borderRadius={borderRadius}
          source={{ uri: board.background.image }}
        >
          {this.renderName()}
        </ImageBackground>
      );
    }

    return (
      <View style={[styles.content, board.background.color && { backgroundColor: board.background.color }]}>
        {this.renderName()}
      </View>
    );
  };

  onPress = () => this.props.onPress(this.props.board);

  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={this.onPress}>
        <View>{this.renderContent()}</View>
      </TouchableHighlight>
    );
  }
}

type PropsType = {
  board: BoardType,
  onPress: Function,
  isActive: boolean,
  isLoading: boolean,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: appStyle.margin,
    borderRadius,
  },
  content: {
    minHeight: 100,
    padding: appStyle.margin,
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
    fontSize: appStyle.font.size.big,
    backgroundColor: 'transparent',
  },
  icon: {
    marginLeft: 10,
  },
  activeIcon: {
    backgroundColor: 'transparent',
  },
});
