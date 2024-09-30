
import React from 'react'
import Login from '@/components/login/Login'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, Keyboard } from 'react-native';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <Pressable onPress={()=> (Keyboard.dismiss())} style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, paddingHorizontal: 20 }}>
      <Login />
    </Pressable>
  )
}

export default LoginScreen