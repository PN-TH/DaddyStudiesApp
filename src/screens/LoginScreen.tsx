import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginForm from '../components/login/LoginForm';

const LoginScreen = ({ route, navigation }: any) => {
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
