// @flow
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyle from '../appStyle';

export default (props: Props) => {
  let Icon;

  switch (props.type) {
    case 'entypo':
      Icon = EntypoIcon;
      break;
    case 'material':
      Icon = MaterialIcons;
      break;
    case 'material-community':
      Icon = MaterialCommunityIcons;
      break;
    case 'font-awesome':
    default:
      Icon = FontAwesomeIcon;
      break;
  }

  return <Icon name={props.name} size={props.size} color={props.color || appStyle.colors.text} />;
};

type Props = {
  type?: 'font-awesome' | 'entypo' | 'material' | 'material-community',
  name: string,
  size?: number,
  color?: string,
};
