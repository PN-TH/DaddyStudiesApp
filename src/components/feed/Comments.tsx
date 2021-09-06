import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { iMessage } from "../../interfaces/Workspace";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
export interface CommentsProps {
  message: iMessage;
  workspaceId: string;
  feedId: string;
}

const Comments: React.FC<CommentsProps> = ({
  message,
  workspaceId,
  feedId,
}) => {
  const navigation: any = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.commentContainer}
        onPress={() =>
          navigation.navigate("Comments", { message, feedId, workspaceId })
        }>
        <Icons name="comment" size={24} style={styles.icons} />
        <Text style={{ fontSize: 16 }}>{message.comments.length}</Text>
      </TouchableOpacity>
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
