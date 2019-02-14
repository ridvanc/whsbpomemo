import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';

export default class AppBodyData extends React.Component {


    render(){


      let coord = this.props.data.map(function(coordinates, index){
        var lat = coordinates.geometry.coordinates[1];
        var long = coordinates.geometry.coordinates[0];
      });

    return (
      <View style={styles.container}>

      <MapView style={styles.map}
        showsUserLocation
        >
        <MapView.Marker
          coordinate={{
            latitude: {lat},
            longitude: {long},
          }}
        />
      </MapView>

      </View>
    );
  }
}

module.export = AppBodyData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
      width: "100%",
      height: "100%",
    },
    flexit: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        fontSize: 10
    }
});
