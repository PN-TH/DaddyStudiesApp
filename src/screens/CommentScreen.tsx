import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CommentsShow from '../components/feed/CommentsShow';
import { useQuery, gql } from '@apollo/client';
import { AppContext } from '../contexts/AppProvider';
import { iMessage } from '../interfaces/Workspace';
const GET_MESSAGE = gql`
  query getMessageById($input: InputMessages!) {
    getMessageById(input: $input) {
      id
      content
      userId
      userName
      comments {
        id
        userId
        content
        userName
      }
    }
  }
`;

const CommentScreen = ({ route }) => {
  const { message, feedId, workspaceId } = route.params || [];
  const [comments, setComments] = useState<iMessage>();
  const scrollViewRef = useRef();
  const { firstFeedOnHomePage } = useContext(AppContext);

  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: {
      input: {
        parentWorkspaceId: workspaceId ? workspaceId : firstFeedOnHomePage,
        feedId: feedId,
        messageId: message.id,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setComments(data.getMessageById);
    }
  }, [data]);

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' />
      </View>
    );
  return (
    <View>
      <CommentsShow
        message={comments}
        feedId={feedId}
        workspaceId={workspaceId}
        scrollViewRef={scrollViewRef}
      />
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
});
