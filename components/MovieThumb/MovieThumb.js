import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import style from './style';

class MovieThumb extends Component {
  render() {
    const { Title, Poster, Type, Year, imdbID, navigateToMovie} = this.props;
    const movie = {Poster, Title, Type, Year, imdbID};
    return (
      <TouchableOpacity onPress={() => navigateToMovie(movie)}>
        <View style={style.container}>
          <Image
            style={style.image}
            source={{ uri: Poster }}
            resizeMode="contain"
          />
          <Text>{Title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MovieThumb;
