import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

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
  };

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    this.setState({ loading: true });
    
    fetchMovies(this.state.page)
      .then(res => {
        if (this.state.data) {
          this.state.data.push(...res)
        } else {
          this.setState({ data: res });
        }
        this.setState({ loading: false });
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
    this.setState({refreshing: true});
    fetchMovies(1)
      .then(res => {
        if (this.state.data) {
          const newData = this.getNewMovies(res, this.state.data);
          this.setState({ data: [...newData, ...this.state.data] });
        } else {
          this.setState({ data: res });
        }
        this.setState({refreshing: false});
      })
      .catch(err => {
        console.error(err);
        this.setState({refreshing: false});
      });
  };

  getNewMovies = (unique, old) => {
    return unique.filter(movie => {
      return !old.find(item => movie.imdbID === item.imdbID);
    });
  };

  render() {
    const { loading, refreshing, data } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'red', flex: 1 }}>
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
