import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import style from './../../shared/style';

class Movie extends Component {

  render() {
    const movie = this.props.navigation.getParam('movie');
    return (
      <View style={style.container}>
        <Image
          style={{ width: '80%', height: '80%' }}
          source={{ uri: movie.Poster }}
          resizeMode="contain"
        />
        <Text>{movie.Title}</Text>
      </View>
    );
  }
}

export default Movie;
