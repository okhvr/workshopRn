import React, { Component } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';

import MovieThumb from './../MovieThumb';

class MoviesList extends Component {

  renderMovieThumbNail = ({ item }, index) => (
    <MovieThumb key={item.imdbID} {...item} />
  );

  keyExtractor = (item, index) => item.imdbID;

  onEndReached = () => {
    this.props.loadMore();
  }

  onRefresh = () => {
    this.props.updateMovies();
  }

  render() {
    const { data } = this.props;
    return (
      <View style={{flex: 1}}>
          <FlatList
            data={data}
            scrollable
            keyExtractor={this.keyExtractor}
            renderItem={this.renderMovieThumbNail}
            onEndReached={this.onEndReached}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
      </View>
    );
  }
}

export default MoviesList;
