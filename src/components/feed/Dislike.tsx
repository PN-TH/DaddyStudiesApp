import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from '@expo/vector-icons/AntDesign';
import { iMessage } from '../../interfaces/Workspace';
import { useMutation, gql } from '@apollo/client';
import { AppContext } from '../../contexts/AppProvider';

export interface LikeProps {
  message: iMessage;
  workspaceId: string;
  feedId: string;
  refetch: any;
}

const ADD_DISLIKE = gql`
  mutation addDislikeToMessage($input: InputDislikeMessage!) {
    addDislikeToMessage(input: $input) {
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

const Dislike: React.FC<LikeProps> = ({
  message,
  workspaceId,
  feedId,
  refetch,
}) => {
  const { userLogged } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [addDislike] = useMutation(ADD_DISLIKE);

  // Ajoute un dislike en base de données
  const addDislikes = async () => {
    await addDislike({
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
    if (message.dislikes && userLogged) {
      setActive(false);
      for (let like of message.dislikes) {
        if (like.userId === userLogged.userId) {
          setActive(true);
        }
      }
    }
  };

  useEffect(() => {
    checkActive();
  }, [message]);

  return (
    <View>
      <TouchableOpacity onPress={addDislikes}>
        <View style={styles.dislikeContainer}>
          <Icons
            name='like1'
            size={24}
            style={active ? styles.activeIcons : styles.inactiveIcons}
          />
          <Text style={{ fontSize: 16 }}>
            {message.dislikes ? message.dislikes.length : null}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Dislike;

const styles = StyleSheet.create({
  dislikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveIcons: {
    color: '#3b3b3b',
    marginRight: 5,
  },
  activeIcons: {
    color: 'red',
    marginRight: 5,
  },
});
