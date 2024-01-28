import { View, HStack, Text, VStack, Image,  Button, ButtonText } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native';

const MovieCard = props => {
    const { navigation, image, title, popularity, release_date } = props
    return (
        <View style={styles.mainContainer}>
            <HStack style={styles.horizontalStack}>
                <View style={styles.imageStyle}>
                    <Image
                        alt='movieImage'
                        source={{ uri :image}}
                        style={{
                            height: "100%"
                        }}
                    />
                </View>

                <VStack>
                    <Text style={styles.title}>{title}</Text>
                    <Text>Popularity: {popularity}</Text>
                    <Text>Release Date: {release_date}</Text>
                    <Button
                        onPress={() => {
                            navigation.navigate('Web', { label, url })
                        }}
                        variant='link'
                        style={styles.button}
                    >
                        <ButtonText style={styles.buttonText}>More Details</ButtonText>
                    </Button>
                </VStack>
            </HStack>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    horizontalStack: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        // justifyContent: "space-evenly"
    },
    imageStyle: {
        marginRight: 10
    },
    title:{
        fontWeight: "bold"
    },
    button : {
        backgroundColor:"#06ADCE",
        color: "white",
        width: "100%"
    },
    buttonText: {
        color: "white"
    }
  })
  

export default MovieCard;
