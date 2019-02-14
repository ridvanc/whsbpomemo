import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import AppBodyData from './appBodyData';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
class Sportanlagen extends React.Component {

  constructor(){
    super()
    this.state={
      data:[]
    }
  }

  getData(){
    return fetch('http://media-panda.de/locations.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({data: responseJson.features});
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentDidMount(){
    this.getData();
  }


 // ------- RENDERBEREICH -------

  render() {
      return(
      <AppBodyData data = {this.state.data}></AppBodyData>

    );
  }
}

export default Sportanlagen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexit: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        fontSize: 10
    }
});
