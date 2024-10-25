import { View, Text, StyleSheet, Alert, Keyboard, Image } from 'react-native'
import React, { useState } from 'react'
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText } from '@/components/ui/form-control'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Button, ButtonText } from '@/components/ui/button'
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { GoogleSocialButton } from 'react-native-social-buttons'
import { useNavigation } from 'expo-router'
import api from '@/api/axiosInstance'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/features/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Yup from 'yup'
import { Formik } from 'formik'

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

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    const handleState = () => {
        setShowPassword((showState) => !showState);
    };

    const handleSubmit = async (values) => {
        try {
            const res = await api.post("login", {
                username: values.username,
                password: values.password
            });
            Keyboard.dismiss();
            dispatch(login(res.data));
            AsyncStorage.setItem("token", res.data.token);
            Alert.alert("Success", "Login Successfully");
            navigate.navigate('HomeScreen');
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Login failed. Please check your credentials.");
        }
    };

    return (
        <View style={styles.view}>
            <View style={styles.title}>
                <Text style={styles.titleContent}>Welcome Fedutoy</Text>
            </View>

            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <FormControl className="p-4 border rounded-lg border-outline-300">
                            <VStack space="xl">
                                <Heading className="text-typography-900 leading-3 pt-2">Login</Heading>

                                <VStack space="xs">
                                    <Text className="text-typography-500 leading-1">Username</Text>
                                    <Input>
                                        <InputField
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            type="text"
                                        />
                                    </Input>
                                    {errors.username && touched.username && (
                                        <Text style={{ color: 'red' }}>{errors.username}</Text>
                                    )}
                                </VStack>

                                <VStack space="xs">
                                    <Text className="text-typography-500 leading-1">Password</Text>
                                    <Input>
                                        <InputField
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <InputSlot className="pr-3" onPress={handleState}>
                                            <InputIcon
                                                as={showPassword ? EyeIcon : EyeOffIcon}
                                                className="text-darkBlue-500"
                                            />
                                        </InputSlot>
                                    </Input>
                                    {errors.password && touched.password && (
                                        <Text style={{ color: 'red' }}>{errors.password}</Text>
                                    )}
                                </VStack>

                                <View>
                                    <Text onPress={() => navigate.navigate("ForgotPasswordScreen")} style={{ fontWeight: 600 }}>Forgot Password</Text>
                                    <Button className="ml-auto" onPress={handleSubmit}>
                                        <ButtonText className="text-typography-0">Login</ButtonText>
                                    </Button>
                                </View>
                            </VStack>
                        </FormControl>
                    </View>
                )}
            </Formik>

            <View style={styles.loginGG}>
                <GoogleSocialButton onPress={() => { }} buttonViewStyle={styles.buttonGG} />
            </View>
            <View style={styles.register}>
                <Text>Don't have an Account? </Text>
                <Text onPress={() => navigate.navigate("RegisterScreen")} style={{ fontWeight: 600 }}>Register</Text>
            </View>
        </View>
    );
};

export default Login
