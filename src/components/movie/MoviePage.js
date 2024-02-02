import { View, Text, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Button, HStack } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

// Import components
// import MovieList from "./MovieList";
import ListCards from '../common/ListCards';
import { getRequest } from "./../../services/api";
import { ButtonText } from '@gluestack-ui/themed';


const MoviePage = ({ navigation })=> {

    const [movieListdata, setMovieList] = useState([]);
    const [movieType, setMovieType] = useState("popular");
    const [currentPage, setCurrentPage] = useState(1);
    const [previousActive, setPreviousActive] = useState(false);
    const [nextActive, setNextActive] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    useEffect(() => {
        fetchMovies();
    }, [movieType])

    const fetchMovies = async () => {
        try {
            const response = await getRequest(`movie/${movieType}?language=en-US&page=1`);
            let finalData = [];
            if (response && response.data && response.data.results) {
                response.data.results.forEach ((item) => {

                    let obj = {
                        poster_path : item.poster_path,
                        title: item.title ? item.title : item.name,
                        popularity: item.popularity,
                        release_date: item.release_date ? item.release_date : item.first_air_date,
                        id: item.id,
                        type: 'movie'
                    }
    
                    finalData.push(obj);
                })
                console.log(finalData.length);
                setMovieList(finalData);
            }
        } catch (err) {
            setMovieList([]);
        }

    }

    useEffect(() => {
        setStartIndex((currentPage - 1) * 10);
        setEndIndex(currentPage * 10);
        checkNextPage();
        checkPreviousPage();
    }, [movieListdata, currentPage])

    const checkPreviousPage = () => {
        if ( currentPage === 1) {
            setPreviousActive(false);
        } else {
            setPreviousActive(true);
        }
    }

    const checkNextPage = () => {
        if (movieListdata.length - 1 > (currentPage * 10)) {
            setNextActive(true);
        } else {
            setNextActive(false);
        }
    }

    const changePage = (num) => {
        let finalVal = currentPage + num;
        setCurrentPage( currentPage  + num );
    }

    const valueChange = (event) => {
        setMovieType(event)
    }

    return (
        <View style={{ flex: 1, padding: 15, justifyContent:"center" }}>
            <View style={style.dropDown}>
                <Select selectedValue={movieType} onValueChange={(e) => valueChange(e)}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Select option" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Now playing" value="now_playing" />
                            <SelectItem selected label="popular" value="popular" />
                            <SelectItem label="Top Rated" value="top_rated" />
                            <SelectItem label="Upcoming" value="upcoming" />
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>

            {
                movieListdata && <ListCards startIndex={startIndex} endIndex={endIndex} navigation={navigation} listData={movieListdata}/>
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

export default MoviePage;
