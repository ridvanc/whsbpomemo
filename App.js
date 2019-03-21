import React from 'react';
import { Button, View, Text } from 'react-native';
import Grillplaetze from './screens/Grillplaetze';
import Spielplaetze from './screens/Spielplaetze';
import Sportanlagen from './screens/Sportanlagen';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';

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
          iconName = 'home';
        }
        if (routeName === 'Grillplätze') {
          iconName = 'fire';
        }
        if (routeName === 'Spielplätze') {
          iconName = 'child';
        }
        if (routeName === 'Sportanlagen') {
          iconName = 'dribbble';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <FontAwesome name={iconName} size={25} color={tintColor} />;

      },
    }),
    tabBarOptions: {
      activeTintColor: '#6eac00',
      inactiveTintColor: 'gray',
    },
  }
));
