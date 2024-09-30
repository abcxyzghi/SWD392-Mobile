
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from '@/screens/login/LoginScreen';
import RegisterScreen from '@/screens/register/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function TabLayout() {


  return (
    // <Stack.Navigator initialRouteName='LoginScreen'>
    //   <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
    //   <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    // </Stack.Navigator>
    <></>
  );
}
