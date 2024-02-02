import { View, Text, HStack, Button, ButtonText ,Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { getRequest } from "./../../services/api";
import ListCards from '../common/ListCards';


const TvShowPage = ({navigation}) => {

    const [TVListdata, setTVList] = useState([]);
    const [TVType, setTVType] = useState("popular");
    const [currentPage, setCurrentPage] = useState(1);
    const [previousActive, setPreviousActive] = useState(false);
    const [nextActive, setNextActive] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    useEffect(() => {
        fetchTVs();
    }, [TVType])

    const fetchTVs = async () => {
        try {
            const response = await getRequest(`tv/${TVType}?language=en-US&page=1`);
            let finalData = [];
            if (response && response.data && response.data.results) {
                response.data.results.forEach ((item) => {

                    let obj = {
                        poster_path : item.poster_path,
                        title: item.title ? item.title : item.name,
                        popularity: item.popularity,
                        release_date: item.release_date ? item.release_date : item.first_air_date,
                        id: item.id,
                        type: 'tv'
                    }
    
                    finalData.push(obj);
                })
            }
            setTVList(finalData)
        } catch (err) {
            setTVList([]);
        }

    }

    useEffect(() => {
        setStartIndex((currentPage - 1) * 10);
        setEndIndex(currentPage * 10);
        checkNextPage();
        checkPreviousPage();
    }, [TVListdata, currentPage])

    const checkPreviousPage = () => {
        if ( currentPage === 1) {
            setPreviousActive(false);
        } else {
            setPreviousActive(true);
        }
    }

    const checkNextPage = () => {
        if (TVListdata.length - 1 > (currentPage * 10)) {
            setNextActive(true);
        } else {
            setNextActive(false);
        }
    }

    const changePage = (num) => {
        setCurrentPage( currentPage  + num );
    }

    const valueChange = (event) => {
        setTVType(event)
    }

    return (
        <View style={{ flex: 1, padding: 15, justifyContent:"center" }}>
            <View style={style.dropDown}>
                <Select selectedValue={TVType} onValueChange={(e) => valueChange(e)}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Select option" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Airing today" value="airing_today" />
                            <SelectItem selected label="Popular" value="popular" />
                            <SelectItem label="Top rated" value="top_rated" />
                            <SelectItem label="On the air" value="on_the_air" />
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>

            {
                TVListdata && <ListCards startIndex={startIndex} endIndex={endIndex} navigation={navigation} listData={TVListdata}/>
            }
            <HStack style={style.paginationSection}>
                <Button disabled={!previousActive} style={style.paginationButton} title='Previous' onPress={()=> changePage(-1)} color="#84158">
                    <ButtonText style={{color: previousActive ? "#06ADCE" : "gray"}}>Prev.</ButtonText>
                </Button>
                <Button title='Next' style={style.paginationButton} onPress={()=> changePage(1)} color="#84158">
                    <ButtonText disabled={!nextActive} style={{color: nextActive ? "#06ADCE" : "gray"}}>Next</ButtonText>
                </Button>
            </HStack>

        </View>
    )
}

const style = StyleSheet.create({
    dropDown: {
        margin: 25,
        justifyContent: "center"
    },
    paginationSection: {
        justifyContent: "center"
    },

    paginationButton: {
        backgroundColor: "transparent"
    }
})

export default TvShowPage;