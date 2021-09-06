import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useMutation, gql } from "@apollo/client";
import { Badge } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AppContext } from "../../contexts/AppProvider";
import Messages from "./Messages";

const ADD_COMMENT = gql`
  mutation createCommentInMessage($input: InputComments!) {
    createCommentInMessage(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          content
          comments {
            id
            content
          }
        }
      }
      assets {
        id
        assetName
      }
    }
  }
`;

export interface MessageInputProps {
  workspaceId: string;
  feedId: string;
  messageId: string;
}

const CommentsInput: React.FC<MessageInputProps> = ({
  workspaceId,
  feedId,
  messageId,
}) => {
  const [userComment, setUserComment] = useState<string>("");
  const [addComment] = useMutation(ADD_COMMENT);
  const { setRefresh } = useContext(AppContext);

  const handleMessage = (text: string) => {
    setUserComment(text);
  };

  const onSubmit = () => {
    addComment({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          // eslint-disable-next-line object-shorthand
          feedId: feedId,
          messageId: messageId,
          commentContent: userComment,
        },
      },
    });
    setRefresh(true);
    setUserComment("");
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        onChangeText={handleMessage}
        value={userComment}
        placeholder="Ecrivez quelque chose"
        onSubmitEditing={() => onSubmit()}
      />
      <MaterialIcons
        style={styles.searchIcon}
        name="send"
        size={30}
        color="#000"
      />
    </View>
  );
};

export default CommentsInput;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    flex: 1,
    backgroundColor: "#fff",
    color: "#424242",
    fontSize: 16,
  },
});
