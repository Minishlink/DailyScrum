// @flow
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default (props: PropsType) => {
  let Icon;

  switch (props.type) {
    case 'entypo':
      Icon = EntypoIcon;
      break;
    case 'material':
      Icon = MaterialIcons;
      break;
    case 'font-awesome':
    default:
      Icon = FontAwesomeIcon;
      break;
  }

  return <Icon name={props.name} size={props.size} color={props.color} />;
};

type PropsType = {
  type?: 'font-awesome',
  name: string,
  size: number,
  color: string,
};
