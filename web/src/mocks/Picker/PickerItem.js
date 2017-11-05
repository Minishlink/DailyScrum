// @flow

import React from 'react';

type PropsType = {
  value: string,
  label: string,
};

const PickerItem = (props: PropsType) => <option value={props.value}>{props.label}</option>;

export default PickerItem;
