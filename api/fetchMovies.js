import axios from 'axios';
import { AsyncStorage } from 'react-native';

const apikey = '2f3933e4';
const endpoint = `http://www.omdbapi.com/?apikey=${apikey}&s=*apple*`;

const fetchMovies = async (page, query) => {
  const queryYear = query ? `&y=${query}` : '';
  const url = `${endpoint}&page=${page}${queryYear}`;
  const response = await axios(url);
  try {
    await AsyncStorage.setItem(endpoint, JSON.stringify(response.data));
  } catch (error) {
    console.error('fetch failed with error:', error);
  }
  return response.data.Search || [];
};

export default fetchMovies;
