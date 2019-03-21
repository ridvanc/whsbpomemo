import React from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

import {
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";

class Grillplaetze extends React.Component {
  constructor() {
      super();
      this.state = {

        LATLNG: {
        latitude: 51.574673003480285,
        longitude: 7.0262687035819535,
      },

        markers: [],
        testmarkers: [],
        testmarkers2: [],
        loaded: false
      }

    }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (posData) => {
          this.setState({
            region: {
              latitude: posData.coords.latitude,
              longitude: posData.coords.longitude,
              latitudeDelta: 0.020,
              longitudeDelta: 0.020,
            }
          });
        },
        (error) => alert(error.message),
        {timeout: 10000}
      );
      this.getLocations()
    }


    getLocations(){
    return fetch('http://media-panda.de/cologne.geojson')
    .then(response => response.json())
    .then(responseData =>{
       var markers = [];
        for (var i = 0; i < responseData.features.length; i++) {

          if(responseData.features[i].properties.Torwand != '<Null>'){
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
console.log(this.state.LATLNG)


  return (
      <View style={styles.container}>

      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={this.state.region}

        followUserLocation={true}>

       {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={marker.coordinate}
          />
       ))}


       <MapView.Circle
                key = { (this.state.latitude + this.state.longitude).toString() }
                center = { this.state.LATLNG }
                radius = { 500 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }

        />




       </MapView>







      </View>
     );
  }
}

export default Grillplaetze;

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
