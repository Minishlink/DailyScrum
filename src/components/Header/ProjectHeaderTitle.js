// @flow
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
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
  },
});

const mapStateToProps = state => ({
  projectName: currentProjectNameSelector(state) || 'DailyScrum',
});

export default connect(mapStateToProps)(ProjectHeaderTitle);
