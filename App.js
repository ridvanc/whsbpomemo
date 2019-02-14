import React from 'react';
import { Button, View, Text } from 'react-native';
import Grillplaetze from './screens/Grillplaetze';
import Spielplaetze from './screens/Spielplaetze';
import Sportanlagen from './screens/Sportanlagen';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Herzlich Willkommen </Text>
        <Button
          title="Zu den Grillplätzen"
          onPress={() => this.props.navigation.navigate('gplaetze')}
        />
        <Button
          title="Zu den Spielplätzen"
          onPress={() => this.props.navigation.navigate('splaetze')}
        />
        <Button
          title="Zu den Sportanlagen"
          onPress={() => this.props.navigation.navigate('sportplaetze')}
        />
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    gplaetze: Grillplaetze,
    splaetze: Spielplaetze,
    sportplaetze: Sportanlagen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
