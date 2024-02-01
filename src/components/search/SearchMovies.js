import {
    View, Text, Input, InputSlot, InputField, InputIcon,
    SearchIcon, VStack, Select, SelectTrigger, SelectInput,
    SelectPortal, SelectBackdrop, SelectContent,
    SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, ChevronDownIcon, SelectIcon, Icon, HStack, Button, ButtonText
} from "@gluestack-ui/themed"
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getRequest } from "../../services/api";

import ListCards from "../common/ListCards";
const SearchResults = ({ navigation }) => {

    const [selectedValue, setSelectedValue] = useState('movie');
    const [inputValue, setInputValue] = useState('');
    const [dataList, setDataList] = useState([]);

    const valueChange = (event) => {
        setSelectedValue(event)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        // movie https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
        // tv : https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1
        // multi:  https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1'

        const response = await getRequest(`search/${selectedValue}?query=${inputValue}&include_adult=false&language=en-US&page=1`);
        
        let finalData = [];
        if(response && response.data && response.data.results) {
            response.data.results.forEach ((item) => {

                let obj = {
                    poster_path : item.poster_path,
                    title: item.title ? item.title : item.name,
                    popularity: item.popularity,
                    release_date: item.release_date ? item.release_date : item.first_air_date,
                    id: item.id,
                    type: selectedValue == "multi" ? item.media_type : selectedValue
                }

                finalData.push(obj);
            })
        }
        setDataList(finalData);
    }

    const inputValueChange = (event) => {
        setInputValue(event)
    }

    return (
        <View style={styles.container}>
            <VStack>
                <Text>Search Movie/TV Show Name</Text>
                <Input style={styles.topInput}>
                    <InputSlot pl="$3">
                        <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField onChangeText={inputValueChange}  placeholder="Search..." />
                </Input>
                <Text>Choose Search Type</Text>
            </VStack>

            <HStack style={styles.optionStack}>
                <Select selectedValue={selectedValue} style={styles.select} onValueChange={(e) => valueChange(e)}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Select option" />
                        <SelectIcon mr="$3">
                            <Icon as={ChevronDownIcon} />
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem selected label="Movie" value="movie" />
                            <SelectItem label="multi" value="multi" />
                            <SelectItem label="TV" value="tv" />
                        </SelectContent>

                    </SelectPortal>

                </Select>
                <Button style={styles.button} onPress={() => {
                    fetchData();
                }}>
                    <ButtonText>Search</ButtonText>
                </Button>
            </HStack>

            {
                dataList && <ListCards navigation={navigation} movies={dataList}/>
            }
        </View>
    )
}

export default SearchResults;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },

    optionStack : {
        display: "flex",
        marginTop: 10,
        marginBottom: 10
    },
    select : {
        flexGrow: 1
    },
    button : {
        backgroundColor:"#06ADCE",
        color: "white",
        marginLeft: 5
    },
    topInput: {
        marginTop: 10,
        marginBottom: 10
    }
})