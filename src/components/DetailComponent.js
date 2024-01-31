import { Text, View, StatusBar, Box, ButtonBack, Image, VStack, HStack, Icon, ArrowLeftIcon, Center, Button } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StyleSheet } from "react-native";
import { config } from "@gluestack-ui/config";
import Config from '../config/api'
import { useEffect, useState } from "react";
import { getRequest } from "./../services/api";

const DetailComponent = ({ navigation, route }) => {

  const [finalData, setFinalData] = useState({});
  const { type, id } = route.params;
  useEffect(() => {
    fetchDetails();
  }, [])

  const fetchDetails = async () => {
    try {

      let url = "";

      const response = await getRequest(`/${type}/${id}?language=en-US`);

      if (response && response.data) {
        const obj = {
          id: response.data.id,
          details: response.data.overview,
          poster: response.data.poster_path,
          name: response.data.title ? response.data.title : response.data.name,
          popularity: response.data.popularity,
          releaseDate: response.data.release_date
        }
        console.log("obj", obj)
        setFinalData(obj);
      }

    } catch (err) {
      console.error(err);
    }
  }

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaProvider config={config}>
      <GluestackUIProvider config={config}>
        <StatusBar backgroundColor='#2c3e50' />
        {/* <ButtonBack onPress={() => navigation.goBack()} /> */}
       
        <Box bg='white' justifyContent='center'>
          <HStack style={styles.topLabel}>
            <Button style={styles.backIcon} onPress={() => {
              goBack();
            }}>
              <Icon style={styles.colorBlue} as={ArrowLeftIcon} m="$2" w="$4" h="$4" />
              <Text style={styles.colorBlue} >Back to List</Text>
            </Button>
           
            <Text color='black' style={styles.textArea} fontSize={16}>
              {finalData.name}
            </Text>
          </HStack>
          
        </Box>

        <VStack alignItems='center' style={styles.vstack}>
          <Text style={styles.heading}>{finalData.name}</Text>
          <Image
            alt='movieImage'
            source={{ uri: `${Config.BASE_URL_FOR_IMAGE}${finalData.poster}` }}
            style={{
              width: 300,
              height: 300,
              objectFit: "contain"
            }}
          />

          <VStack style={styles.details}>
            <Text style={{...styles.detailFont, ...styles.hstack}}>
              {finalData.details}
            </Text>
            <HStack >
              <Text style={styles.detailFont}>
                Popularity: {finalData.popularity} |{" "}
              </Text>
              <Text style={styles.detailFont}>
                Release Date: {finalData.releaseDate}
              </Text>
            </HStack>
          </VStack>

        </VStack>

      </GluestackUIProvider>

    </SafeAreaProvider>


  )
}


export default DetailComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    margin: 16
  },

  hstack:  {
    marginBottom: 15
  },

  backIcon: {
    backgroundColor: "transparent",
    margin: 0,
    padding: 0
  },  

  colorBlue: {
    color: "#6CA3F1"
  },

  topLabel: {
    alignItems: "center",
  },

  details: {
    margin: 15,
    fontSize: 1
  },

  detailFont: {
    fontSize: 15
  },

  heading: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "bold"
  },

  textArea: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});

