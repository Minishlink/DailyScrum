import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icon';
import appStyle from '../../appStyle';

export default class DrawerHeaderLeft extends PureComponent {
  openDrawer = () => this.props.navigation.navigate('DrawerOpen');

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.openDrawer}>
        <Icon name="menu" type="material" size={30} color="white" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: appStyle.margin,
  },
});
