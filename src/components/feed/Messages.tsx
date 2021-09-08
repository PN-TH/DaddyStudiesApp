import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { iMessage } from "../../interfaces/Workspace";
import MessagesInput from "./MessagesInput";
import { Card, Title, Paragraph } from "react-native-paper";
import { Avatar } from "react-native-paper";
import Like from "./Like";
import Dislike from "./Dislike";
import Comments from "./Comments";

export interface FeedProps {
  messages: iMessage[];
  workspaceId: string;
  feedId: string;
  scrollViewRef: any;
}

const Messages: React.FC<FeedProps> = ({
  messages,
  workspaceId,
  feedId,
  scrollViewRef,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }>
        {messages.length ? (
          <View>
            {messages.map((message: iMessage) => {
              return (
                <Card style={styles.card} key={message.id}>
                  <Card.Content>
                    <View style={styles.user}>
                      <Avatar.Text style={styles.avatar} size={38} label="AB" />
                      <Title>Aymeric Bouault</Title>
                    </View>
                    <Paragraph style={styles.content}>
                      {message.content}
                    </Paragraph>
                    <View style={styles.iconContainer}>
                      <Comments
                        message={message}
                        workspaceId={workspaceId}
                        feedId={feedId}
                      />
                      <Like />
                      <Dislike />
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        ) : (
          <Text style={styles.noMessages}>
            Soyez le premier à écrire sur ce channel
          </Text>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <MessagesInput workspaceId={workspaceId} feedId={feedId} />
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: "100%",
  },
  messagesContainer: {},
  card: {
    margin: 10,
    borderRadius: 25,
    borderBottomEndRadius: 0,
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
  inputContainer: {
    justifyContent: "flex-end",
    marginBottom: Platform.OS === "ios" ? 60 : 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  noMessages: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
  },
});
