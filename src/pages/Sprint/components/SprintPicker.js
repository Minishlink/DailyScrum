import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker as RCTPicker, Platform } from 'react-native';
import { Picker } from '../../../components';
import { currentSprintSelector, sprintsListForCurrentProjectSelector } from '../../../modules/sprints/reducer';
import { SprintType } from '../../../types';
import { changeCurrentSprint } from '../../../modules/sprints';
import appStyle from '../../../appStyle';

class SprintPicker extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    // Fix RN-bug https://github.com/facebook/react-native/issues/13351
    return this.props.currentSprint !== nextProps.currentSprint;
  }

  render() {
    const { sprints, currentSprint } = this.props;
    return (
      <Picker
        selectedValue={currentSprint && currentSprint.id}
        onValueChange={this.props.changeCurrentSprint}
        mode="dialog"
        prompt="Change current sprint"
        selectedValueText={currentSprint && `${currentSprint.number} - ${currentSprint.goal}`}
      >
        {sprints.map(sprint =>
          <RCTPicker.Item
            key={sprint.id}
            label={`${sprint.number} - ${sprint.goal}`}
            value={sprint.id}
            color={
              // Fix RN-bug https://github.com/facebook/react-native/issues/13351
              Platform.OS === 'ios' && currentSprint && sprint.id === currentSprint.id
                ? appStyle.colors.primary
                : 'black'
            }
          />
        )}
      </Picker>
    );
  }
}

type PropsType = {
  sprints: SprintType[],
  currentSprint: ?SprintType,
  changeCurrentSprint: Function,
};

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  sprints: sprintsListForCurrentProjectSelector(state),
});

const mapDispatchToProps = {
  changeCurrentSprint,
};

export default connect(mapStateToProps, mapDispatchToProps)(SprintPicker);
