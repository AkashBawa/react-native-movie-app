import { View, Text, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react';
import MovieList from "./MovieList"
import { getRequest } from "./../services/api";
import { StyleSheet } from 'react-native';

const ListMovies = ({ navigation })=> {

    const [movieListdata, setMovieList] = useState([]);
    const [movieType, setMovieType] = useState("popular");

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

                setMovieList(finalData)
            }
        } catch (err) {
            setMovieList([]);
        }

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
                movieListdata && <MovieList navigation={navigation} movies={movieListdata}></MovieList>
            }

        </View>
    )
}

const style = StyleSheet.create({
    dropDown: {
        margin: 25,
        justifyContent: "center"
    }
})

export default ListMovies;
