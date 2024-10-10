import { View, Text, Pressable, Keyboard } from 'react-native'
import React from 'react'
import { Input, InputField } from '@/components/ui/input'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, ButtonText } from '@/components/ui/button'

const ForgotPassword = () => {
    const insets = useSafeAreaInsets()
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
                    <InputField placeholder="Enter Email here..." />
                </Input>
                <Button style={{marginTop: 30,width: "30%"}} size="md" variant="solid" action="primary">
                    <ButtonText>Send Mail</ButtonText>
                </Button>
            </View>
        </Pressable>
    )
}

export default ForgotPassword