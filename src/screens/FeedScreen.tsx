import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Messages from '../components/feed/Messages';
import { useQuery, gql } from '@apollo/client';
import { iMessage } from '../interfaces/Workspace';
import { AppContext } from '../contexts/AppProvider';

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
          userName
          createdAt
          comments {
            id
            content
            userId
            userName
            createdAt
          }
          likes {
            userId
            userName
          }
          dislikes {
            userId
            userName
          }
        }
      }
    }
  }
`;

const FeedScreen = ({ route, navigation }: any) => {
  const { workspace } = route.params || [];
  const [messages, setMessages] = useState<iMessage[]>([]);
  const [feedId, setFeedId] = useState<string>('');
  const scrollViewRef = useRef();
  const { firstFeedOnHomePage, refresh, setRefresh } = useContext(AppContext);
  const { loading, error, data, refetch } = useQuery(GET_WORKSPACE, {
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

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' />
      </View>
    );
  return (
    <Messages
      messages={messages}
      workspaceId={workspace ? workspace.id : firstFeedOnHomePage}
      feedId={feedId}
      scrollViewRef={scrollViewRef}
      refetch={refetch}
    />
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
});
