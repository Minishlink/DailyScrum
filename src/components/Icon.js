// @flow
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default (props: PropsType) => {
  switch (props.type || 'font-awesome') {
    case 'font-awesome':
    default:
      return (<FontAwesomeIcon name={props.name} size={props.size} color={props.color} />)
  }
};

type PropsType = {
  type?: 'font-awesome',
  name: string,
  size: number,
  color: string,
};
