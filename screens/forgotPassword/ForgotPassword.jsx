import { View, Text, Pressable, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'

import { Input, InputField } from '@/components/ui/input'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, ButtonText } from '@/components/ui/button'
import api from '@/api/axiosInstance'

const ForgotPassword = () => {
    const insets = useSafeAreaInsets()
    const [email, setEmail ] = useState("")
const handlesubmit = async() =>{
    try { 
        const response = await api.post("forgot-password",{
            email: email
          })
          Alert.alert("Check your email", "Check your email to change password")
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
    return (
        <Pressable onPress={() => (Keyboard.dismiss())} style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, paddingHorizontal: 20 }}>
            <View>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField value={email} onChangeText={(e) => setEmail(e)} type='text' placeholder="Enter Email here..." />
                </Input>
                <Button style={{marginTop: 30,width: "30%"}} size="md" variant="solid" action="primary">
                    <ButtonText onPress={handlesubmit}>Send Mail</ButtonText>
                </Button>
            </View>
        </Pressable>
    )
}

export default ForgotPassword