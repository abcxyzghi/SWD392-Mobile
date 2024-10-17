import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Button, ButtonText } from '@/components/ui/button'
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { useNavigation } from 'expo-router'
import * as Yup from 'yup';
import api from '@/api/axiosInstance'

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
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    title: {
        height: "10%",
        display: "flex",
        justifyContent: "flex-end",
    },
    titleContent: {
        fontSize: 30,
        fontWeight: 800
    },
    container: {
        flex: 1,
    },
    scrollView: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    },

})
const Register = () => {

    const navigate = useNavigation()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
    });


    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is not valid'),
        phone: Yup.string().required('Phone is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')  // Ensures passwords match
            .required('Please confirm your password')
    });

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    const handleSubmit = async () => {
        try {
            await validationSchema.validate({ username, email, phone, password, rePassword }, { abortEarly: false });
            try {
                const res = await api.post("register", {
                    username: username,
                    email: email,
                    phone: phone,
                    password: password,
                })
                setUsername("");
                setEmail("");
                setPhone("");
                setPassword("");
                setRePassword("");
                Alert.alert("Success", "Registration is valid");
                navigate.navigate("LoginScreen")
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
            setErrors({});
        } catch (err) {
            // Check if the error is a Yup validation error
            if (err instanceof Yup.ValidationError) {
                // Map Yup validation errors into the state
                const formErrors = {};
                err.inner.forEach((error) => {
                    formErrors[error.path] = error.message;
                });
                setErrors(formErrors);
            }
        }
    }
    return (

        <View style={{ flex: 1 }}>
            <View style={styles.title}>
                <Text style={styles.titleContent}>Welcome Register</Text>
            </View>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <VStack className="w-full rounded-md border border-background-200 p-4">
                        <Heading className="text-typography-900 leading-3 pb-5 pt-2">Register</Heading>
                        <FormControl className="pb-4"
                            isInvalid={!!errors.username}
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}
                        >
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">FullName</Text>
                                <Input className="text-center">
                                    <InputField value={username}
                                        onChangeText={(e) => setUsername(e)} />

                                </Input>
                            </VStack>
                            {errors.username && (
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>{errors.username}</FormControlErrorText>
                                </FormControlError>
                            )}
                        </FormControl>
                        <FormControl className="pb-4"
                            isInvalid={!!errors.phone}
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}
                        >
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">Phone</Text>
                                <Input className="text-center">
                                    <InputField value={phone}
                                        onChangeText={(e) => setPhone(e)} />

                                </Input>
                            </VStack>
                            {errors.phone && (
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>{errors.phone}</FormControlErrorText>
                                </FormControlError>
                            )}
                        </FormControl>
                        <FormControl className="pb-4"
                            isInvalid={!!errors.email}
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}
                        >
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">Email</Text>
                                <Input className="text-center">
                                    <InputField value={email}
                                        onChangeText={(e) => setEmail(e)} />

                                </Input>
                            </VStack>
                            {errors.email && (
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>{errors.email}</FormControlErrorText>
                                </FormControlError>
                            )}
                        </FormControl>
                        <FormControl
                            className="pb-4"
                            isInvalid={!!errors.password}
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}
                        >
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
                            {errors.password && (
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>{errors.password}</FormControlErrorText>
                                </FormControlError>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={!!errors.rePassword}
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}
                        >
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">RePassword</Text>
                                <Input className="text-center">
                                    <InputField value={rePassword}
                                        onChangeText={(e) => setRePassword(e)} type={showPassword ? "text" : "password"} />
                                    <InputSlot className="pr-3" onPress={handleState}>
                                        {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                                        <InputIcon
                                            as={showPassword ? EyeIcon : EyeOffIcon}
                                            className="text-darkBlue-500"
                                        />
                                    </InputSlot>
                                </Input>
                            </VStack>
                            {errors.rePassword && (
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>{errors.rePassword}</FormControlErrorText>
                                </FormControlError>
                            )}
                        </FormControl>

                        <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                            <ButtonText>Register</ButtonText>
                        </Button>
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.register}>
                <Text>Already have an Account? </Text>
                <Text onPress={() => navigate.navigate("LoginScreen")} style={{ fontWeight: 600 }}>Login</Text>

            </View>
        </View>


    )
}

export default Register