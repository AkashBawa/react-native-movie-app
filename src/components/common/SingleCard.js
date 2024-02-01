import { View, HStack, Text, VStack, Image,  Button, ButtonText } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native';

const SingleCard = props => {
    const { navigation, image, title, popularity, release_date, id, type } = props
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
                            navigation.navigate('details', {
                                type,
                                id: id,
                               
                            } )
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
        marginTop: 10,
        marginBottom: 10,
    },
    imageStyle: {
        marginRight: 10
    },
    title:{
        fontWeight: "bold",
        flex: 1,
        flexWrap: "wrap"
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
  

export default SingleCard;
