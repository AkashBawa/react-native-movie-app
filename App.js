import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import MainComponent from "./src/components/Main";
import SingleView from "./src/components/singleView/SingleView";

export default function App() {
  return (

    <NavigationContainer>

      
      <Stack.Navigator>
        
        <Stack.Screen
          name="index"
          component={MainComponent}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="details"  component={SingleView} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaProvider>

    //   <IndexComponent/>
    // </SafeAreaProvider>
  );
}
