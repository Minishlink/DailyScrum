import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '../Icon';
import Button from '../Button';

export default class DrawerHeaderLeft extends PureComponent {
  openDrawer = () => this.props.navigation.navigate('DrawerOpen');

  render() {
    return (
      <Button style={styles.container} onPress={this.openDrawer} borderless withRipple>
        <View style={styles.iconContainer}>
          <Icon name="menu" type="material" size={30} color="white" />
        </View>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    margin: 14,
  },
});
