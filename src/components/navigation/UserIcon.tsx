import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const UserIcon = () => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      style={styles.button}
    >
      <View style={styles.avatar}>
        <Text>GD</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserIcon;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: 10,
  },
  avatar: {
    padding: 10,
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
});
