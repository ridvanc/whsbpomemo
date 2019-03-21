import React from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import Geolib from 'geolib';


import {
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";



const geolib = require('geolib');

class Spielplaetze extends React.Component {

  constructor() {

      super();
      this.state = {
        markers: [],
        loaded: false
      }

    }

    componentDidMount() {
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
      }, () => this.getLocations());
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  );
}

    getLocations(){
    return fetch('http://media-panda.de/bp/whs.geojson')
    .then(response => response.json())
    .then(responseData => {
      let { region } = this.state;
      let { latitude, longitude } = region;

      let markers = responseData.features.map(feature =>  {
        let coords = feature.geometry.coordinates
        return {
          coordinate: {
            latitude: coords[1],
            longitude: coords[0],
          }
        }
      }).filter(marker => {
        let distance = this.calculateDistance(latitude, longitude, marker.coordinate.latitude, marker.coordinate.longitude);
        return distance <= 500;
      });

        this.setState({
          markers: markers,
          loaded: true,
        });
      }
    ).done();
  }
  calculateDistance(origLat, origLon, markerLat, markerLon) {
    return geolib.getDistance(
      {latitude: origLat, longitude: origLon},
      {latitude: markerLat, longitude: markerLon}
    );
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
