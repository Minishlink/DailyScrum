// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Text from '../Text';
import { currentProjectNameSelector } from '../../modules/projects/reducer';
import appStyle from '../../appStyle';

class ProjectHeaderTitle extends PureComponent {
  props: PropsType;

  render() {
    return (
      <Text style={styles.title}>
        {this.props.projectName}
      </Text>
    );
  }
}

type PropsType = {
  projectName: ?string,
};

const styles = StyleSheet.create({
  title: {
    fontSize: appStyle.font.size.big,
    color: appStyle.colors.overPrimaryColor,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    marginHorizontal: 16,
  },
});

const mapStateToProps = state => ({
  projectName: currentProjectNameSelector(state) || 'DailyScrum',
});

export default connect(mapStateToProps)(ProjectHeaderTitle);
