import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icons from '@expo/vector-icons/AntDesign';
import { iMessage } from '../../interfaces/Workspace';
import { useMutation, gql } from '@apollo/client';

export interface LikeProps {
  message: iMessage;
  workspaceId: string;
  feedId: string;
}

const ADD_LIKE = gql`
  mutation addLikeToMessage($input: InputLikeMessage!) {
    addLikeToMessage(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          likes {
            userId
          }
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

const Like: React.FC<LikeProps> = ({ message, workspaceId, feedId }) => {
  // const { userInfos } = useContext(UserContext)
  const [active, setActive] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);
  const addLikes = async () => {
    await addLike({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          // eslint-disable-next-line object-shorthand
          feedId: feedId,
          messageId: message.id,
        },
      },
    });
    setActive(!active);
  };
  // useEffect(() => {
  //   if (message.likes) {
  //     for (let i = 0; i < message.likes.length; i += 1) {
  //       if (message.likes[i].userId === userInfos.userId) {
  //         setActive(true)
  //       }
  //     }
  //   }
  // }, [message])

  return (
    <View>
      <View style={styles.likeContainer}>
        <Icons name='like1' size={24} style={styles.icons} />
        <Text style={{ fontSize: 16 }}>0</Text>
      </View>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    color: '#3b3b3b',
    marginRight: 5,
  },
});
