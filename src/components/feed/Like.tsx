import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from '@expo/vector-icons/AntDesign';
import { iMessage } from '../../interfaces/Workspace';
import { useMutation, gql } from '@apollo/client';
import { AppContext } from '../../contexts/AppProvider';
import { useFocusEffect } from '@react-navigation/core';

export interface LikeProps {
  message: iMessage;
  workspaceId: string;
  feedId: string;
  refetch: any;
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

const Like: React.FC<LikeProps> = ({
  message,
  workspaceId,
  feedId,
  refetch,
}) => {
  const { userLogged } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);

  // Ajoute un like en base de données
  const addLikes = async () => {
    await addLike({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          feedId: feedId,
          messageId: message.id,
        },
      },
    });
    await refetch();
    setActive(!active);
  };

  // Vérifie si l'ID de l'utilisateur est présent dans la liste des likes du message et si oui setActive(true)
  const checkActive = async () => {
    if (message.likes && userLogged) {
      setActive(false);
      for (let like of message.likes) {
        if (like.userId === userLogged.userId) {
          setActive(true);
        }
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkActive();
    }, [message, active])
  );

  useEffect(() => {
    checkActive();
  }, [message]);

  return (
    <View>
      <TouchableOpacity onPress={addLikes}>
        <View style={styles.likeContainer}>
          <Icons
            name='like1'
            size={24}
            style={active ? styles.activeIcons : styles.inactiveIcons}
          />
          <Text style={{ fontSize: 16 }}>
            {message.likes ? message.likes.length : null}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveIcons: {
    color: '#3b3b3b',
    marginRight: 5,
  },
  activeIcons: {
    color: 'green',
    marginRight: 5,
  },
});
