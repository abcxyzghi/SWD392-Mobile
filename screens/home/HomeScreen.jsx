import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/redux/features/authSlice'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
    const user = useSelector(selectAuth)
    const insets = useSafeAreaInsets()
  return (
    <View style={{paddingTop:insets.top,justifyContent:"center",flex:1,alignItems:"center"}}>
      <Text>{user.username}</Text>
    </View>
  )
}

export default HomeScreen