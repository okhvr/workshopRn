import React, { Component } from 'react';
import { PermissionsAndroid, View, Button, CameraRoll, ScrollView, Image } from 'react-native';

import sharedStyle from './../../shared/style';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log(granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      return true;
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

class Third extends Component {

  state = {photos: []};

  _handleButtonPress = async () => {
    if (await requestCameraPermission()){
      CameraRoll.getPhotos({
          first: 20,
      })
      .then((r) => {
           this.setState({ photos: r.edges})
      })
      .catch((err) => {
         console.error(err);
      });
    };
  };

  render() {
    return (
      <View style={sharedStyle.container}>
        <Button title="Load Images" onPress={this._handleButtonPress} />
        <ScrollView>
          {this.state.photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={{
                width: 300,
                height: 100,
              }}
              source={{ uri: p.node.image.uri }}
            />
          );
        })}
        </ScrollView>
      </View>
    );
  }
}

export default Third;
