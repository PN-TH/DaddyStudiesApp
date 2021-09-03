import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/Routes";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { API_URL } from "./src/constants";

const App = () => {
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
  });
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Daddy Studies</Text>
        <Routes />
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
  },
});

export default App;
