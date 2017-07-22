// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../';
import { ScrumbleTeamMemberType } from '../../types/Scrumble/common';

const colors = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'];

export default class MemberIcon extends Component {
  props: PropsType;
  state: StateType = { isImageLoaded: false };

  shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
    return this.state.isImageLoaded !== nextState.isImageLoaded || this.props.member.id !== nextProps.member.id;
  }

  onLoadImage = () => this.setState({ isImageLoaded: true });

  render() {
    const { member } = this.props;
    const color = colors[member.initials.charCodeAt(0) % 9];
    const avatar = getUriFromMember(member);
    return (
      <View style={[styles.textContainer, { backgroundColor: color }]}>
        {!this.state.isImageLoaded &&
          <Text style={styles.text}>
            {member.initials}
          </Text>}
        {avatar && <Image style={styles.image} source={{ uri: avatar }} onLoad={this.onLoadImage} />}
      </View>
    );
  }
}

function getUriFromMember(member: ScrumbleTeamMemberType): ?string {
  if (member.avatarHash) {
    return `https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/50.png`;
  }

  return null;
}

const size = { width: 30, height: 30 };
const radius = 3;
const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...size,
    borderRadius: radius,
  },
  text: {
    fontWeight: '700',
  },
  image: {
    position: 'absolute',
    ...size,
    borderRadius: radius,
  },
});

type StateType = {
  isImageLoaded: boolean,
};

type PropsType = {
  member: ScrumbleTeamMemberType,
};
