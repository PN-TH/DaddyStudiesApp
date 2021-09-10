import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gql, useMutation } from '@apollo/client';
import { iInputLogin } from '../../interfaces/Auth';
import jwt_decode from 'jwt-decode';
import { AppContext } from '../../contexts/AppProvider';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const POST_LOGIN = gql`
  mutation Mutation($loginInput: InputLogin!) {
    login(input: $loginInput) {
      token
    }
  }
`;

const LoginForm = () => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { setUserLogged, setUserToken } = useContext(AppContext);
  const navigation: any = useNavigation();

  // utilisation de useMutation pour envoyer les data au back
  //  check si retour des data, si oui on envoi
  // le token au local storage
  const [login, { data, error }] = useMutation(POST_LOGIN, {
    errorPolicy: 'all',
  });

  // On définit notre Objet input que l'on va envoyer
  const loginInput: iInputLogin = { loginInput: { email, password, remember } };

  // La méthode onSubmit ajoute la variable à la useMutation login()
  const formSubmit = async (): Promise<void> => {
    const response = await login({ variables: loginInput });
    if (!response.data.login) {
      const errorMessage = error?.graphQLErrors.map(
        ({ message }) => message
      )[0];
      alert(errorMessage);
    } else {
      try {
        const token = response.data.login.token;
        await AsyncStorage.setItem('@userToken', token);
        const user = jwt_decode(token);
        setUserLogged(user);
        navigation.navigate('Feed');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setMail(text)}
          value={email}
          placeholder='Email'
          keyboardType='email-address'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCorrect={false}
          placeholder='Mot de passe'
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={formSubmit}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputContainer: {
    width: '100%',
    margin: 20,
  },
  textInput: {
    margin: 20,
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // placeholderTextColor: 'gray',
  },
  button: {
    padding: 20,
    borderRadius: 50,
    width: '50%',
    backgroundColor: 'gray',
  },
  buttonText: { color: 'white' },
});
