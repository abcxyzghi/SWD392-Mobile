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
import HomeScreen from '@/screens/home/HomeScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "../redux/store"

const Stack = createStackNavigator();
// Prevent the splash screen from auto-hiding before asset loading is complete.
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
    <GluestackUIProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='RegisterScreen'>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
    </PersistGate>
    </Provider>
  );
}
