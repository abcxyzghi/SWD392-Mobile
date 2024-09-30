import { View, Text, Pressable, Keyboard } from 'react-native'
import React from 'react'
import { Input, InputField } from '@/components/ui/input'
import Register from '@/components/register/Register'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  return (

    <Pressable onPress={() => (Keyboard.dismiss())} style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, paddingHorizontal: 20 }}>
      <Register />
    </Pressable>
  )
}

export default RegisterScreen