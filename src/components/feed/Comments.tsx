import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const Comments = () => {
  return (
    <View>
      <View style={styles.commentContainer}>
        <Icons name="comment" size={24} style={styles.icons} />
        <Text style={{ fontSize: 16 }}>0</Text>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    color: "#3b3b3b",
    marginRight: 5,
  },
});
