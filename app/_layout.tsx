import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import "../global.css";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/screens/login/LoginScreen';
import RegisterScreen from '@/screens/register/RegisterScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "../redux/store"
import {  TamaguiProvider } from '@tamagui/core';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { tamaguiConfig } from '@/tamagui.config';
import ForgotPassword from '@/screens/forgotPassword/ForgotPassword';
import ProductDetail from '@/screens/productDetail/ProductDetail';


const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
    <GluestackUIProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='HomeScreen'>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false ,title:"Login"}} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} options={{ title:"Forgot Password" }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="DetailScreen" component={ProductDetail} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
    </TamaguiProvider>
    </PersistGate>
    </Provider>
  );
}
