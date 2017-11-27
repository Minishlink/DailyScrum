// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { isEqual } from 'lodash';
import ActionSheet from '@yfuks/react-native-action-sheet';
import { Text, Card, Button } from '../../components';
import appStyle from '../../appStyle';
import MemberIcon from './MemberIcon';
import PointsBadge from './PointsBadge';
import { Analytics } from '../../services';
import type { CardType } from '../../types';
import { differenceInBusinessDays } from '../../services/Time';
import Icon from '../Icon';

export default class extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(nextProps.card, this.props.card);
  }

  showActionSheet = () => {
    Analytics.logEvent('card_actionSheet_trigger'); // how curious are users?
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Open in Trello', 'Cancel'],
        cancelButtonIndex: 1,
      },
      index => {
        switch (index) {
          case 0:
            Linking.openURL(this.props.card.url).catch(e => console.error('Error opening URL', e));
            break;
          default:
            break;
        }
      }
    );
  };

  render() {
    const { card } = this.props;
    const validationLatenessInDays =
      card.dateEndDevelopment &&
      differenceInBusinessDays(
        (card.dateDone && new Date(card.dateDone).getTime()) || Date.now(),
        new Date(card.dateEndDevelopment).getTime()
      );

    return (
      <Button style={this.props.style} onLongPress={this.showActionSheet}>
        <View>
          <Card>
            <View style={styles.labelsRow}>
              <View style={styles.idShortContainer}>
                <Text>#{card.idShort}</Text>
              </View>
              {validationLatenessInDays >= 1 && (
                <View style={styles.lateValidationContainer}>
                  <Text style={styles.lateValidationText}>{validationLatenessInDays}</Text>
                  <Icon
                    type="material-community"
                    name="clock-alert"
                    size={appStyle.font.size.default}
                    color={appStyle.colors.overRed}
                  />
                </View>
              )}
            </View>
            <Text style={styles.title}>{card.name}</Text>
            <View style={styles.membersRow}>
              <View style={styles.pointsContainer}>
                {card.points != null && <PointsBadge points={card.points.toLocaleString()} />}
                {card.points != null && card.postPoints != null && <View style={{ width: 4 }} />}
                {card.postPoints != null && <PointsBadge points={card.postPoints.toLocaleString()} isPostEstimation />}
              </View>
              <View style={styles.membersContainer}>
                <View style={styles.members}>
                  {card.members.map(member => (
                    <View key={member.id} style={styles.member}>
                      <MemberIcon member={member} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Card>
        </View>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  membersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: appStyle.margin,
  },
  membersContainer: {
    alignSelf: 'flex-end',
  },
  members: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  member: {
    marginLeft: 5,
  },
  idShortContainer: {
    backgroundColor: appStyle.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: appStyle.borderRadius,
  },
  lateValidationContainer: {
    flexDirection: 'row',
    backgroundColor: appStyle.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: appStyle.borderRadius,
  },
  lateValidationText: {
    marginRight: 2,
    color: appStyle.colors.overRed,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

type Props = {
  card: CardType,
  style?: any,
};
