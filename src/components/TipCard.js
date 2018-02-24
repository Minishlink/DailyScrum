// @flow
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Text } from '../components';
import Icon from './Icon';
import { markTipAsRead } from '../modules/tips';
import type { TipType } from '../modules/tips/reducer';

export const TipCard = (props: PropsType) => (
  <Animatable.View animation="bounceIn" delay={200} useNativeDriver>
    <Card>
      <View style={styles.container}>
        <Text style={[styles.text, styles.content]}>{props.tip.text}</Text>
        <View style={styles.separator} />
        <Button
          style={[styles.content, styles.markAsReadContainer]}
          hitSlop={{ top: 10, bottom: 10, left: 30, right: 30 }}
          onPress={props.markAsRead}
        >
          <Animatable.View animation="tada" delay={200} style={styles.iconContainer} useNativeDriver>
            <Icon name="check" size={16} />
          </Animatable.View>
          <Text style={styles.text}>Thanks, understood!</Text>
        </Button>
      </View>
    </Card>
  </Animatable.View>
);

type PropsType = {
  tip: TipType | {| text: string |},
  markAsRead: Function,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  content: {
    marginHorizontal: 15,
  },
  text: {
    textAlign: 'center',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginVertical: 8,
    alignSelf: 'stretch',
  },
  markAsReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 5,
  },
});

const mapDispatchToProps = (dispatch, ownProps: { tip: TipType }) => ({
  markAsRead: () => dispatch(markTipAsRead(ownProps.tip)),
});

export default connect(null, mapDispatchToProps)(TipCard);
