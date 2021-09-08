import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { iComment, iMessage } from "../../interfaces/Workspace";
import { Card, Title, Paragraph } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import CommentsInput from "./CommentsInput";
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

export interface CommentShowProps {
  message: iMessage;
  workspaceId: string;
  feedId: string;
  scrollViewRef: any;
}

const CommentsShow: React.FC<CommentShowProps> = ({
  message,
  workspaceId,
  feedId,
  scrollViewRef,
}) => {
  const navigation: any = useNavigation();
  return (
    <View>
      {message ? (
        <View style={styles.container}>
          <Icons
            name="arrow-back-ios"
            size={30}
            onPress={() => navigation.goBack({ feedId, workspaceId })}
          />
          <Card style={styles.card} key={message.id}>
            <Card.Content>
              <View style={styles.user}>
                <Avatar.Text style={styles.avatar} size={38} label="AB" />
                <Title>Aymeric Bouault</Title>
              </View>
              <Paragraph style={styles.content}>{message.content}</Paragraph>
            </Card.Content>
          </Card>
          <View style={styles.borderComment}></View>

          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }>
            <View
              style={
                message.comments.length ? styles.container : styles.noMessage
              }>
              {message.comments.length > 0 ? (
                message.comments.map((comment: iComment) => {
                  return (
                    <Card style={styles.commentCard} key={comment.id}>
                      <Card.Content>
                        <View style={styles.user}>
                          <Avatar.Text
                            style={styles.avatar}
                            size={38}
                            label="AB"
                          />
                          <Title>Aymeric Bouault</Title>
                        </View>
                        <Paragraph style={styles.content}>
                          {comment.content}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  );
                })
              ) : (
                <Text>Soyez le premier à écrire un commentaire</Text>
              )}
            </View>
          </ScrollView>
          <View style={styles.inputContainer}>
            <CommentsInput
              workspaceId={workspaceId}
              feedId={feedId}
              messageId={message.id}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CommentsShow;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: "100%",
  },
  messagesContainer: {},
  card: {
    margin: 10,
    borderRadius: 25,
    borderBottomEndRadius: 1,
  },
  commentCard: {
    borderBottomEndRadius: 1,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#f7f5da",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
  },
  content: {
    margin: 5,
    marginTop: 20,
    justifyContent: "flex-start",
    fontSize: 16,
  },
  borderComment: {
    borderWidth: 0.5,
    marginTop: 5,
    marginBottom: 10,
  },
  noMessage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: 60,
  },
  inputContainer: {
    justifyContent: "flex-end",
    marginBottom: 60,
  },
});
