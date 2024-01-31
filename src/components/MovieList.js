import { FlatList } from '@gluestack-ui/themed'
import MovieCard from './MovieCard';
import  Config from '../config/api'

const MovieList = (props) => {
  const { navigation, movies } = props;
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieCard 
        navigation = {navigation}
          image={`${Config.BASE_URL_FOR_IMAGE}${item.poster_path}`}
          title= {item.title}
          popularity={item.popularity}
          release_date={item.release_date}
          id={item.id}
          type={item.type}
          // label={item.id}
        //   source={movie.source}
        //   url={movie.url}
        //   navigation={navigation}
          // image="https://image.tmdb.org/t/p/w500/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg"
        />
      )}
    />
  )
}

export default MovieList
