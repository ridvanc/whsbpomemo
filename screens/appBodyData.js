import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { MapView } from 'expo';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -37.812365;
const LONGITUDE = 144.962338;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      data: [],
      isLoaded: false,
      boundingBox: {
        westLng: 0,
        southLat: 0,
        eastLng: 0,
        northLat: 0
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({isLoaded: false});
    let data = await (await fetch(someURL)).json();
    this.setState({data: data, isLoaded: true});
  }

  onRegionChangeComplete = (region) => {
    let boundingBox = this.getBoundingBox(region);
    this.setState({region, boundingBox});
  }

  getBoundingBox = (region) => {
    let boundingBox = {
      westLng: region.longitude - region.longitudeDelta/2, // westLng - min lng
      southLat: region.latitude - region.latitudeDelta/2, // southLat - min lat
      eastLng: region.longitude + region.longitudeDelta/2, // eastLng - max lng
      northLat: region.latitude + region.latitudeDelta/2 // northLat - max lat
    }

    return boundingBox;
  }

  isInBoudingBox(coordinate) {
    if (coordinate.latitude > this.state.boundingBox.southLat && coordinate.latitude < this.state.boundingBox.northLat &&
        coordinate.longitude > this.state.boundingBox.westLng && coordinate.longitude < this.state.boundingBox.eastLng)
    {
      return true;
    }

    return false;
  }

  render() {
    return (
      <MapView style={ { flex: 1 } } initialRegion={ this.state.region } onRegionChangeComplete={this.onRegionChangeComplete}>
        <MapView.Marker coordinate={ { latitude: this.state.region.latitude, longitude: this.state.boundingBox.westLng } } >
            <MapView.Callout>
              <View>
                <Text>This is a west lng</Text>
              </View>
            </MapView.Callout>
        </MapView.Marker>
        <MapView.Marker coordinate={ { latitude: this.state.region.latitude, longitude: this.state.boundingBox.eastLng } }  />

        {this.state.isLoaded ? this.state.data.map(p =>
          this.isInBoudingBox({ latitude: parseFloat(p.lat), longitude: parseFloat(p.lon) }) ?
          <MapView.Marker coordinate={ { latitude: parseFloat(p.lat), longitude: parseFloat(p.lon) } }>
            <MapView.Callout>
              <View>
                <Text>This is a test callout</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
          : null)
        : console.log('data does not exist yet')}
      </MapView>
      );
  }
}
