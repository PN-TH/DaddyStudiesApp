import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { API_URL } from "./src/constants";
import { DrawerNavigator } from "./src/routes/Routes";
import AppProvider from "./src/contexts/AppProvider";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGIwYTI4YmQ2NmE3NzU4NmNmZjA3ZTMiLCJmaXJzdG5hbWUiOiJUaG9tYXMiLCJsYXN0bmFtZSI6IlBudGgiLCJlbWFpbCI6InRwb250aG9yZWF1QGdtYWlsLmNvbSIsInNjaG9vbElkIjoiMSIsImlzU2Nob29sQWRtaW4iOnRydWUsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2MzExMDUxNDcsImV4cCI6MTYzMTE5MTU0N30.Kyn-awL_Olp8tYhCe0Lwg_11i5p2hRPJI99C1L6BLI4",
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <DrawerNavigator />
      </AppProvider>
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
