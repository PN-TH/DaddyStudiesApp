import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { API_URL } from './src/constants';
import { DrawerNavigator } from './src/routes/Routes';
import AppProvider from './src/contexts/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

let apolloHttpLink = createHttpLink({
  uri: API_URL,
});

let apolloAuthContext = setContext(async (_, { headers }) => {
  const jwt_token = await AsyncStorage.getItem('@userToken');

  return {
    headers: {
      ...headers,
      Authorization: jwt_token ? jwt_token : '',
    },
  };
});

let client = new ApolloClient({
  link: apolloAuthContext.concat(apolloHttpLink),
  cache: new InMemoryCache(),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
});

export default App;
