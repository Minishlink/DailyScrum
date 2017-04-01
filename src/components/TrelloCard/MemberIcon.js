// @flow
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';
import { ScrumbleTeamMemberType } from '../../types/Scrumble/common';

const colors = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'];

export default (props: PropsType) => {
  const color = colors[props.member.initials.charCodeAt(0) % 9];
  const avatar = getUriFromMember(props.member);
  return (
    <View style={[styles.textContainer, { backgroundColor: color }]}>
      <Text style={styles.text}>{props.member.initials}</Text>
      {avatar && <Image style={styles.image} source={{ uri: avatar }} />}
    </View>
  );
};

function getUriFromMember(member: ScrumbleTeamMemberType): ?string {
  if (member.avatarHash) {
    return `https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/30.png`;
  }

  if (member.gravatarHash) {
    return `https://www.gravatar.com/avatar/${member.avatarHash}.jpg?s=30`;
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
    color: appStyle.colors.text,
  },
  image: {
    position: 'absolute',
    ...size,
    borderRadius: radius,
  },
});

type PropsType = {
  member: ScrumbleTeamMemberType,
};
