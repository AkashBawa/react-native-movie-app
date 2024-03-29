import { GluestackUIProvider, Icon } from '@gluestack-ui/themed';
import { StyleSheet, View } from 'react-native';
import { config } from "@gluestack-ui/config";
import { Box, StatusBar, Text } from '@gluestack-ui/themed'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


// Import components

// import ListMovies from './MoviesList';

// import TvShows from './TVshowList';

import MoviePage from './movie/MoviePage';
import SearchResults from './search/SearchMovies';
import TvShowPage from './tvShow/TvShowPage';

const Tab = createMaterialTopTabNavigator();


export default function Main({navigation}) {
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
                    () => <MoviePage navigation={navigation}/>
                }
            </Tab.Screen>
            <Tab.Screen name="Search" >
              {
                () => <SearchResults navigation={navigation}/>
              }
            </Tab.Screen>
            <Tab.Screen name="TV Shows">
              {
                () => <TvShowPage navigation={navigation}/>
              }
            </Tab.Screen>
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
