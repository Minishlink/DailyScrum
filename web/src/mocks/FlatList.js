import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

export default class FlatList extends Component {
  renderItem = item => {
    const renderedItem = this.props.renderItem({ item });
    return <View key={item.key || this.props.keyExtractor(item)}>{renderedItem}</View>;
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={this.props.contentContainerStyle}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      >
        {this.props.data.map(this.renderItem)}
      </ScrollView>
    );
  }
}
