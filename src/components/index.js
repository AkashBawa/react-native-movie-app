import { GluestackUIProvider } from '@gluestack-ui/themed';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { config } from "@gluestack-ui/config";
import { Box, StatusBar, Text } from '@gluestack-ui/themed'
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ListMovies from './MoviesList';
import tvShows from './TVshowList';
import SearchResults from './SearchMovies';

const Tab = createMaterialTopTabNavigator();


export default function Index({navigation}) {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <StatusBar backgroundColor='#2c3e50' />
        <Box bg='#2c3e50' justifyContent='center'>
          <Text color='#fff' style={styles.textArea} fontSize={20} fontWeight='bold'>
            Movie App
          </Text>
        </Box>
        <Tab.Navigator>
            <Tab.Screen name="Movies">
                {
                    () => <ListMovies navigation={navigation}/>
                }
            </Tab.Screen>
            <Tab.Screen name="Search Results" component={SearchResults} />
            <Tab.Screen name="TV Shows" component={SearchResults} />
        </Tab.Navigator>
       
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textArea: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});
