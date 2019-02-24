import { AppRegistry} from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";

import FeedScreen from './screens/Feed';
import SecondScreen from './screens/Second';
import ThirdScreen from './screens/Third';
import MovieScreen from './screens/Movie';

import { name as appName } from './app.json';

const MoviesNavigator = createStackNavigator({
  Feeds: FeedScreen,
  Movie: MovieScreen,
});

const TabNavigator = createBottomTabNavigator({
  Home: MoviesNavigator,
  Second: SecondScreen,
  Third: ThirdScreen,
}, {
  tabBarOptions: {
    scrollEnabled: true,
    tabStyle: {
    },
    style: {
    },
  },
});

AppRegistry.registerComponent(appName, () => createAppContainer(TabNavigator));
