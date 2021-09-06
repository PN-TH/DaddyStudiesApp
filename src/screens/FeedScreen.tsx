import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Messages from "../components/feed/Messages";
import { useQuery, gql } from "@apollo/client";
import { iMessage } from "../interfaces/Workspace";
import { AppContext } from "../contexts/AppProvider";

const GET_WORKSPACE = gql`
  query getWorkspaceById($input: WorkspaceId!) {
    getWorkspaceById(input: $input) {
      id
      title
      schoolId
      feed {
        id
        feedName
        messages {
          id
          content
          userId
          likes {
            userId
          }
          comments {
            id
            content
            userId
          }
        }
      }
    }
  }
`;

const FeedScreen = ({ route, navigation }: any) => {
  const { workspace } = route.params || [];
  const [messages, setMessages] = useState<iMessage[]>([]);
  const [feedId, setFeedId] = useState<string>("");
  const scrollViewRef = useRef();
  const { firstFeedOnHomePage } = useContext(AppContext);
  const { loading, error, data } = useQuery(GET_WORKSPACE, {
    variables: {
      input: {
        id: workspace ? workspace.id : firstFeedOnHomePage,
      },
    },
  });
  useEffect(() => {
    if (data) {
      setMessages(data.getWorkspaceById.feed[0].messages);
      setFeedId(data.getWorkspaceById.feed[0].id);
    }
  }, [data, messages]);

  return (
    <View style={styles.container}>
      <Messages
        messages={messages}
        workspaceId={workspace ? workspace.id : firstFeedOnHomePage}
        feedId={feedId}
        scrollViewRef={scrollViewRef}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {},
});
