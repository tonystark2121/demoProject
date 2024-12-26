import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Dashboard from './Dashboard';
import GoogleMap from './GoogleMap';

const Stack = createStackNavigator();
export default function AuthNavigator({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="login">
      <Stack.Screen name="login" animation="spring" component={Login} />
      <Stack.Screen name="Dashboard" animation="spring" component={Dashboard} />
      <Stack.Screen name="GoogleMap" animation="spring" component={GoogleMap} />
    </Stack.Navigator>
  );
}
