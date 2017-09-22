// @flow
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { isEqual } from 'lodash';
import { Text, Card } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import MemberIcon from './MemberIcon';
import PointsBadge from './PointsBadge';
import * as Analytics from '../../services/Analytics';
import ActionSheet from '@yfuks/react-native-action-sheet';
import type { CardType } from '../../types';

export default class extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
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
    return (
      <TouchableOpacity activeOpacity={0.7} onLongPress={this.showActionSheet}>
        <View>
          <Card>
            <View style={styles.labelsRow}>
              <View style={styles.idShortContainer}>
                <Text>
                  #{card.idShort}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>
              {card.name}
            </Text>
            <View style={styles.membersRow}>
              <View style={styles.pointsContainer}>
                {card.points != null && <PointsBadge points={card.points.toLocaleString()} />}
                {card.points != null && card.postPoints != null && <View style={{ width: 4 }} />}
                {card.postPoints != null && <PointsBadge points={card.postPoints.toLocaleString()} isPostEstimation />}
              </View>
              <View style={styles.membersContainer}>
                <View style={styles.members}>
                  {card.members.map(member =>
                    <View key={member.id} style={styles.member}>
                      <MemberIcon member={member} />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Card>
        </View>
      </TouchableOpacity>
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
  },
  title: {
    marginVertical: appStyle.margin,
  },
  membersContainer: {
    flex: 5,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
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
    height: 16,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 3,
  },
  pointsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'flex-end',
  },
});

type PropsType = {
  card: CardType,
};
