// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text, Icon } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';

export default (props: PropsType) =>
  <View style={styles.container}>
    <View style={styles.starAndLabelContainer}>
      <Animatable.View animation="pulse" iterationCount="infinite" style={styles.iconContainer} useNativeDriver>
        <Icon name="star" size={40} color={appStyle.colors.secondary} />
      </Animatable.View>
      <Text style={styles.label}>Sprint Goal</Text>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </View>
  </View>;

type PropsType = {
  title: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starAndLabelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  titleContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: appStyle.font.size.small,
    textAlign: 'center',
  },
});
