// adapted from https://gist.github.com/MoOx/96169e8af11894d3e74a2aa29b2ccac5

// partial dirty implementation of react-native Picker
// should match http://facebook.github.io/react-native/docs/picker.html

// https://github.com/necolas/react-native-web/issues/184
import { createElement } from 'react-native';
import PickerItem from './PickerItem';

type PropsType = {
  selectedValue: string,
  onValueChange: Function,
  children?: Array<React$Element<any>>,
};

const handleValueChange = (children: ?Array<React$Element<any>>, cb: Function) => (event: SyntheticEvent) => {
  if (children && event.target && event.target.value !== undefined) {
    const value = event.target.value;
    return children.some((child, index) => child.props.value == value && cb(value, index));
  }
  return null;
};

const Picker = (props: PropsType) => {
  const { selectedValue, onValueChange, children, ...otherProps } = props;
  return createElement('select', {
    value: selectedValue,
    onChange: handleValueChange(children, onValueChange),
    ...otherProps,
    children,
  });
};

Picker.Item = PickerItem;

export default Picker;
