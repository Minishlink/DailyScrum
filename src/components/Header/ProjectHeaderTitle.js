// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Text from '../Text';
import { currentProjectNameSelector } from '../../modules/projects/reducer';
import appStyle from '../../appStyle';

class ProjectHeaderTitle extends PureComponent<Props> {
  render() {
    return (
      <Text style={styles.title} numberOfLines={1} allowFontScaling={false}>
        {this.props.projectName}
      </Text>
    );
  }
}

type Props = {
  projectName: ?string,
};

const styles = StyleSheet.create({
  title: {
    fontSize: appStyle.font.size.big,
    color: appStyle.colors.overPrimaryColor,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    marginLeft: Platform.OS === 'android' ? 16 : 0,
  },
});

const mapStateToProps = state => ({
  projectName: currentProjectNameSelector(state) || 'DailyScrum',
});

export default connect(mapStateToProps)(ProjectHeaderTitle);
