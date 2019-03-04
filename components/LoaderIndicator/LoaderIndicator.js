import React, { Component } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';

import sharedStyle from './../../shared/style';
import style from './style';

const imgUrl = 'https://cdn3.iconfinder.com/data/icons/pictofoundry-pro-vector-set/512/LoadingIndicator-512.png';

class LoaderIndicator extends Component {
  rotate = new Animated.Value(0);

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.rotate, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear(),
      }),
      {
        iterations: 5
      }
    ).start()
  }

  render() {
    return (
        <Animated.Image
            source={{ uri: imgUrl }}
            style={{
                height: this.props.height,
                width: this.props.width,
                transform: [{
                    rotate: this.rotate.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg'],
                    })
                }],
            }}
        />
    );
  }
}

export default LoaderIndicator;
