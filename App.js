import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import Login from './app/Login';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends Component {

  constructor() {
    super();
    
    this.state = {
      isReady: false,
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/background.png')]);
    await Promise.all([...imageAssets]);
  }
  
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading 
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <Login />;
  }
}

const styles = StyleSheet.create({
  
});
