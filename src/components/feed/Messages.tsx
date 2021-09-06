import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { iMessage } from "../../interfaces/Workspace";

export interface FeedProps {
  messages: iMessage[];
}

const Messages: React.FC<FeedProps> = ({ messages }) => {
  return (
    <View style={styles.container}>
      {messages.map((el: iMessage) => {
        return (
          <Text style={styles.content} key={el.id}>
            {el.content}
          </Text>
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  content: {
    margin: 5,
  },
});
