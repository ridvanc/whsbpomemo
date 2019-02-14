import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions
} from "react-native";
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
class Grillplaetze extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <MapView provider={PROVIDER_GOOGLE} style={styles.map} showsUserLocation
            followsUserLocation
            >

        </MapView>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height : SCREEN_HEIGHT,
    width : SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
});
export default Grillplaetze;
