import React from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

import {
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";

class Spielplaetze extends React.Component {

  constructor() {
      super();
      this.state = {
        markers: [],
        loaded: false
      }

    }

    componentDidMount() {
      this.getLocations();
      this.getPosition();
    }

    getPosition(){
      navigator.geolocation.getCurrentPosition(
        (position) => {
        console.log(position);
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta:  0.020,
              longitudeDelta:  0.020,
            }
          });
        },
        (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
    }

    getLocations(){
    return fetch('http://media-panda.de/cologne.geojson')
    .then(response => response.json())
    .then(responseData =>{
       var markers = [];

        for (var i = 0; i < responseData.features.length; i++) {
          if (responseData.features[i].properties.Torwand != '<Null>'){
            var coords = responseData.features[i].geometry.coordinates;
            var marker = {
              coordinate: {
                latitude: coords[1],
                longitude: coords[0],
              }
            }
            markers.push(marker);
          }
        }
        this.setState({
          markers: markers,
          loaded: true,
        });
      }
    ).done();
  }

  render() {

  return (
      <View style={styles.container}>
      <MapView.Animated
        style={styles.map}
        region={this.state.region}
        showsUserLocation={true}
      >
       {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinate}
          />
       ))}
       </MapView.Animated>
      </View>
     );
  }
}

export default Spielplaetze;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  map: {
    width: "100%",
    height: "100%",
  },
})
