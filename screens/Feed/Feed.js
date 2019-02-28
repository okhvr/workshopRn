import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

import MoviesList from './../../components/MoviesList';
import LoaderIndicator from '../../components/LoaderIndicator';

import { fetchMovies } from './../../api';

import style from './style';

class Feed extends Component {
  state = {
    loading: false,
    refreshing: false,
    data: null,
    page: 1,
    search: '',
    hasMoreResults: true,
  };

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    const { page, search, hasMoreResults } = this.state;
    
    if (!hasMoreResults) {
      return;
    } 

    this.setState({ loading: true });
    
    fetchMovies(page, search)
      .then(res => {
        const data = page === 1 ? res : [...this.state.data, ...res];
        this.setState({
          loading: false,
          data,
          hasMoreResults: !!res.length
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  loadMore = () => {
    this.setState((state) => ({ page: state.page + 1}), this.loadMovies);
  };

  updateMovies = () => {
    this.setState({
      page: 1,
      hasMoreResults: true
    }, this.loadMovies);
  };

  getNewMovies = (unique, old) => {
    return unique.filter(movie => {
      return !old.find(item => movie.imdbID === item.imdbID);
    });
  };

  navigateToMovie = (movie) => {
    this.props.navigation.navigate('Movie', {movie});
  };

  handleSearch = (text) => {
    this.setState({
      page: 1,
      search: text,
      hasMoreResults: true
    }, this.loadMovies);
  }

  render() {
    const { loading, refreshing, data } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'red', flex: 1 }}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(e) => this.handleSearch(e)}
        placeholder='search year'
      />
        {!data && !loading && (
          <TouchableOpacity
            onPress={this.loadMovies}
            style={style.button}
          >
            <Text style={style.buttonLabel}>Find Stuff</Text>
          </TouchableOpacity>
        )}
        <MoviesList
          loadMore={this.loadMore}
          updateMovies={this.updateMovies}
          navigateToMovie={this.navigateToMovie}
          loading={loading}
          refreshing={refreshing}
          data={data}
        />
        {loading && 
          (<View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <LoaderIndicator width={30} height={30}/>
          </View>)
        }
      </SafeAreaView>
    );
  }
}

export default Feed;
