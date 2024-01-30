import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();;
import IndexComponent from "./src/components/index";
import DetailComponent from "./src/components/DetailComponent";

export default function App() {
  return (

    <NavigationContainer>

      
      <Stack.Navigator>
        
        <Stack.Screen
          name="index"
          component={IndexComponent}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="details" component={DetailComponent} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaProvider>

    //   <IndexComponent/>
    // </SafeAreaProvider>
  );
}
