// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../';
import { ScrumbleTeamMemberType } from '../../types/Scrumble/common';
import appStyle from '../../appStyle';

const colors = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'];

export default class MemberIcon extends Component {
  static defaultProps = {
    size: 30,
  };

  props: PropsType;
  state: StateType = { isImageLoaded: false };

  shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
    return this.state.isImageLoaded !== nextState.isImageLoaded || this.props.member.id !== nextProps.member.id;
  }

  onLoadImage = () => this.setState({ isImageLoaded: true });

  render() {
    const { member, size } = this.props;
    const color = colors[member.initials.charCodeAt(0) % 9];
    const avatar = getUriFromMember(member, size);
    return (
      <View
        style={[
          styles.container,
          !this.state.isImageLoaded && { backgroundColor: color },
          { width: size, height: size },
        ]}
      >
        {!this.state.isImageLoaded &&
          <Text style={styles.text}>
            {member.initials}
          </Text>}
        {avatar &&
          <Image
            style={[styles.image, { width: size, height: size }]}
            source={{ uri: avatar }}
            onLoad={this.onLoadImage}
          />}
      </View>
    );
  }
}

function getUriFromMember(member: ScrumbleTeamMemberType, size: number): ?string {
  if (member.avatarHash) {
    const imgSize = [30, 50, 170].find(s => s > size) || 'original';
    return `https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/${imgSize}.png`;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appStyle.borderRadius,
  },
  text: {
    fontWeight: '700',
  },
  image: {
    position: 'absolute',
    borderRadius: appStyle.borderRadius,
  },
});

type StateType = {
  isImageLoaded: boolean,
};

type PropsType = {
  member: ScrumbleTeamMemberType,
  size: number,
};
