// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Icon, Text, Modal } from '../../../components';
import appStyle from '../../../appStyle';
import { analyzeQuality } from '../../../modules/qualityIndicators';
import { bugsCountSelector, validationFeedbacksCountSelector } from '../../../modules/qualityIndicators/reducer';
import { isSyncingSelector } from '../../../modules/sync';
import { TipCard } from '../../../components/TipCard';

export class QualityIndicators extends Component<Props, State> {
  state = { helpText: null };

  onCloseModal = () => this.setState({ helpText: null });
  showBugsModal = () =>
    this.setState({
      helpText:
        'Bugs: this counts the tickets that were created during the sprint with a label that contains "bug" (case-insensitive).',
    });
  showValidationFeedbacksModal = () =>
    this.setState({
      helpText:
        'Validation feedbacks: this counts the tickets that are in the columns of the sprint with a label that contains "validation" (case-insensitive).',
    });

  renderQualityIndicator = (
    { id, count, text, showModal }: { id: string, count: number, text: string, showModal: Function },
    index: number
  ) => (
    <Card key={id} style={[styles.card, index === 0 && styles.firstCard]} onPress={Platform.OS !== 'web' && showModal}>
      {Platform.OS !== 'web' && (
        <View style={styles.helpIcon}>
          <Icon type="material" name="info-outline" size={appStyle.font.size.default} />
        </View>
      )}
      {this.renderCount(count)}
      <Text>
        {text}
        {count !== 1 ? 's' : ''}
      </Text>
    </Card>
  );

  renderCount = (count: number) => (
    <Text style={[styles.count, count === 0 ? styles.standardOK : styles.standardKO]}>{count}</Text>
  );

  render() {
    if (this.props.isLoading) {
      return (
        <View style={[styles.container, styles.loading, this.props.style]}>
          <ActivityIndicator />
        </View>
      );
    }

    const { bugs, validationFeedbacks } = this.props;
    if (bugs == null || validationFeedbacks == null) {
      return null;
    }

    const qualityIndicators = [
      {
        id: 'bugs',
        count: bugs,
        text: 'bug',
        showModal: this.showBugsModal,
      },
      {
        id: 'validationFeedbacks',
        count: validationFeedbacks,
        text: 'validation feedback',
        showModal: this.showValidationFeedbacksModal,
      },
    ];

    return (
      <View style={[styles.container, styles.indicatorCardsContainer, this.props.style]}>
        {qualityIndicators.map(this.renderQualityIndicator)}
        {Platform.OS !== 'web' &&
          !!this.state.helpText && (
            <Modal visible={!!this.state.helpText} onRequestClose={this.onCloseModal}>
              <View style={[styles.helpContainer, { top: Dimensions.get('screen').height / 3 }]}>
                <TipCard tip={{ text: this.state.helpText }} markAsRead={this.onCloseModal} />
              </View>
            </Modal>
          )}
      </View>
    );
  }
}

type Props = {
  style?: any,
  bugs: ?number,
  validationFeedbacks: ?number,
  analyzeQuality: Function,
};

type State = {
  helpText: ?string,
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorCardsContainer: {
    flexDirection: 'row',
  },
  firstCard: {
    marginRight: 2 * (appStyle.margin - appStyle.shadow.radius),
  },
  card: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2 * appStyle.margin,
  },
  count: {
    marginRight: appStyle.margin,
    fontSize: 1.5 * appStyle.font.size.big,
    fontWeight: 'bold',
  },
  standardOK: {
    color: appStyle.colors.green,
  },
  standardKO: {
    color: appStyle.colors.red,
  },
  helpIcon: {
    position: 'absolute',
    top: appStyle.margin / 2,
    right: appStyle.margin / 2,
  },
  helpContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  bugs: bugsCountSelector(state),
  validationFeedbacks: validationFeedbacksCountSelector(state),
  isLoading: isSyncingSelector(state, 'sprints', 'qualityIndicators'),
});

const mapDispatchToProps = {
  analyzeQuality,
};

export default connect(mapStateToProps, mapDispatchToProps)(QualityIndicators);
