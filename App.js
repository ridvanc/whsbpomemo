import React from 'react';
import { Button, View, Text } from 'react-native';
import Grillplaetze from './screens/Grillplaetze';
import Spielplaetze from './screens/Spielplaetze';
import Sportanlagen from './screens/Sportanlagen';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons, FontAwesome} from '@expo/vector-icons';

class HomeScreen extends React.Component {


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Herzlich Willkommen </Text>
      </View>
    );
  }
}


export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Grillplätze: { screen: Grillplaetze },
    Spielplätze: { screen: Spielplaetze },
    Sportanlagen: { screen: Sportanlagen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
          return <Ionicons name={iconName} size={25} color={'#f5c431'} />;
        }
        if (routeName === 'Grillplätze') {
          iconName = 'ios-bonfire';
          return <Ionicons name={iconName} size={25} color={'tomato'} />;
        }
        if (routeName === 'Spielplätze') {
          iconName = 'ios-happy';
          return <Ionicons name={iconName} size={25} color={'#6eac00'} />;
        }
        if (routeName === 'Sportanlagen') {
          iconName = 'ios-basketball';
          return <Ionicons name={iconName} size={25} color={'#4285f4'} />;
        }

      },

    }),
    tabBarOptions: {
    },
  }
));
