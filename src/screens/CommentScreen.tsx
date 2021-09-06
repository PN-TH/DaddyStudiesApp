import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentsShow from "../components/feed/CommentsShow";

const CommentScreen = ({ route }) => {
  const { message, feedId, workspaceId } = route.params || [];
  console.log(route.params);
  return (
    <View>
      <CommentsShow
        message={message}
        feedId={feedId}
        workspaceId={workspaceId}
      />
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
