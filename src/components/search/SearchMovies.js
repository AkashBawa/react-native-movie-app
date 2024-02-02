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
    const [currentPage, setCurrentPage] = useState(1);
    const [previousActive, setPreviousActive] = useState(false);
    const [nextActive, setNextActive] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    const valueChange = (event) => {
        setSelectedValue(event)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {

        const response = await getRequest(`search/${selectedValue}?query=${inputValue}&include_adult=false&language=en-US&page=1`);

        let finalData = [];
        if (response && response.data && response.data.results) {
            response.data.results.forEach((item) => {

                let obj = {
                    poster_path: item.poster_path,
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

    useEffect(() => {
        setStartIndex((currentPage - 1) * 10);
        setEndIndex(currentPage * 10);
        checkNextPage();
        checkPreviousPage();
    }, [dataList, currentPage])

    const checkPreviousPage = () => {
        if (currentPage === 1) {
            setPreviousActive(false);
        } else {
            setPreviousActive(true);
        }
    }

    const checkNextPage = () => {
        if (dataList.length - 1 > (currentPage * 10)) {
            setNextActive(true);
        } else {
            setNextActive(false);
        }
    }

    const changePage = (num) => {
        let finalVal = currentPage + num;
        setCurrentPage(currentPage + num);
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
                    <InputField onChangeText={inputValueChange} placeholder="Search..." />
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
            <View style={styles.loadingState}>

            </View>

            {
                dataList.length == 0 ? <Text style={styles.centerText}>Please initiate a search</Text> : <ListCards startIndex={startIndex} endIndex={endIndex} navigation={navigation} listData={dataList} />
            }
            {
                dataList.length > 0 &&
                <HStack style={styles.paginationSection}>
                    <Button disabled={!previousActive} style={styles.paginationButton} title='Previous' onPress={() => changePage(-1)} color="#84158">
                        <ButtonText style={{ color: previousActive ? "#06ADCE" : "gray" }}>Prev.</ButtonText>
                    </Button>
                    <Button title='Next' style={styles.paginationButton} onPress={() => changePage(1)} color="#84158">
                        <ButtonText disabled={!nextActive} style={{ color: nextActive ? "#06ADCE" : "gray" }}>Next</ButtonText>
                    </Button>
                </HStack>
            }


        </View>
    )
}

export default SearchResults;

const styles = StyleSheet.create({

    paginationSection: {
        justifyContent: "center"
    },

    paginationButton: {
        backgroundColor: "transparent"
    },

    loadingState: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",

    },
    centerText: {
        textAlign: "center",
        fontSize: 25,
        lineHeight: 50
    },

    container: {
        padding: 15,
        flex: 1
    },

    optionStack: {
        display: "flex",
        marginTop: 10,
        marginBottom: 10
    },
    select: {
        flexGrow: 1
    },
    button: {
        backgroundColor: "#06ADCE",
        color: "white",
        marginLeft: 5
    },
    topInput: {
        marginTop: 10,
        marginBottom: 10
    }
})