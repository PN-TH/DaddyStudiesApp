import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useMutation, gql } from "@apollo/client";
import { Badge } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ADD_MESSAGE = gql`
  mutation createMessageInFeed($input: InputMessages!) {
    createMessageInFeed(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          content
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
}

const MessagesInput: React.FC<MessageInputProps> = ({
  workspaceId,
  feedId,
}) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [addMessage] = useMutation(ADD_MESSAGE);

  const handleMessage = (text: string) => {
    setUserMessage(text);
  };

  const onSubmit = () => {
    addMessage({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          feedId: feedId,
          messageContent: userMessage,
        },
      },
    });
    setUserMessage("");
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        onChangeText={handleMessage}
        value={userMessage}
        placeholder="Ecrivez quelque chose"
        onSubmitEditing={() => onSubmit()}
      />
      <MaterialIcons
        style={styles.searchIcon}
        name="send"
        size={20}
        color="#000"
      />
    </View>
  );
};

export default MessagesInput;

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
