import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Messages from '../components/feed/Messages';
import { useQuery, gql } from '@apollo/client';
import { iMessage } from '../interfaces/Workspace';
import { AppContext } from '../contexts/AppProvider';
import LoginForm from '../components/login/LoginForm';

const LoginScreen = ({ route, navigation }: any) => {
  const { workspace } = route.params || [];
  const [messages, setMessages] = useState<iMessage[]>([]);
  const [feedId, setFeedId] = useState<string>('');
  const scrollViewRef = useRef();
  const { firstFeedOnHomePage, refresh, setRefresh } = useContext(AppContext);
  // const { loading, error, data, refetch } = useQuery(GET_WORKSPACE, {
  //   variables: {
  //     input: {
  //       id: workspace ? workspace.id : firstFeedOnHomePage,
  //     },
  //   },
  // });

  return (
    <View>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
});
