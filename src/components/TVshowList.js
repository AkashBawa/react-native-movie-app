import { View, Text, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react';
import MovieList from "./MovieList"
import { getRequest } from "./../services/api";
import { StyleSheet } from 'react-native';


const TvShows = ({navigation}) => {

    const [TVListdata, setTVList] = useState([]);
    const [TVType, setTVType] = useState("popular");

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
            console.log(finalData)
            setTVList(finalData)
        } catch (err) {
            setTVList([]);
        }

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
                TVListdata && <MovieList navigation={navigation} movies={TVListdata}></MovieList>
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

export default TvShows;