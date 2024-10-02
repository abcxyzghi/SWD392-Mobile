import { View, Text, StyleSheet, Alert, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText } from '@/components/ui/form-control'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Button, ButtonText } from '@/components/ui/button'
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { GoogleSocialButton } from 'react-native-social-buttons'
import {useNavigation } from 'expo-router'
import api from '@/api/axiosInstance'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/features/authSlice'

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center"
    },
    loginGG: {
        width: "100%",
        marginTop: 50
    },
    buttonGG: {
        width: "100%",
        height: 50,
        borderRadius: "30%"
    },
    register: {
        flexDirection: 'row',
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        height: "20%",
        display: "flex",
        justifyContent: "center",
    },
    titleContent: {
        fontSize: 30,
        fontWeight: 800
    }

})
const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigation()
    const [email, setEmail ] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
   
    
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const handleSubmit = async () => {
        console.log(email)
        console.log(password)
      try {
        const res = await api.post("login",{
            email: email,
            password: password 
        })
        Keyboard.dismiss()
        setEmail("")
        setPassword("")
        dispatch(login(res.data))
        Alert.alert("Success", "Login Successfully");
        navigate.navigate('HomeScreen')
      } catch (error) {
        console.log(error)
      }
    }
    return (
        <View style={styles.view}>
            <View style={styles.title}>
                <Text style={styles.titleContent}>Welcome Fedutoy</Text>
            </View>

            <View>
                <FormControl className="p-4 border rounded-lg border-outline-300">
                    <VStack space="xl">
                        <Heading className="text-typography-900 leading-3 pt-2">Login</Heading>
                        <VStack space="xs">
                            <Text className="text-typography-500 leading-1">Email</Text>
                            <Input>
                                <InputField value={email}
                                    onChangeText={(e) => setEmail(e)} type="text" />
                            </Input>
                        </VStack>
                        <VStack space="xs">
                            <Text className="text-typography-500 leading-1">Password</Text>
                            <Input className="text-center">
                                <InputField value={password}
                                    onChangeText={(e) => setPassword(e)} type={showPassword ? "text" : "password"} />
                                <InputSlot className="pr-3" onPress={handleState}>
                                    {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                                    <InputIcon
                                        as={showPassword ? EyeIcon : EyeOffIcon}
                                        className="text-darkBlue-500"
                                    />
                                </InputSlot>
                            </Input>
                        </VStack>
                        <View >
                            <Text onPress={() => alert("not fount")} style={{ fontWeight: 600 }}>Forgot Password</Text>
                            <Button
                                className="ml-auto"
                                onPress={handleSubmit}
                            >
                                <ButtonText className="text-typography-0">Login</ButtonText>
                            </Button>
                        </View>
                    </VStack>
                </FormControl>
            </View>

            <View style={styles.loginGG}>
                <GoogleSocialButton onPress={() => { }} buttonViewStyle={styles.buttonGG} />
            </View>
            <View style={styles.register}>
                <Text>Don't have an Account? </Text>
                <Text onPress={()=> navigate.navigate("RegisterScreen")} style={{ fontWeight: 600 }}>Register</Text>               
            </View>

        </View>
    )
}

export default Login