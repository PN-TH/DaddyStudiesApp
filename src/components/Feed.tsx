import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {},
});
