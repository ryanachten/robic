import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../services/context';

export const LogoutButton = () => {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={signOut}>
      <Text>Log out</Text>
    </TouchableOpacity>
  );
};
