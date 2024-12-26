/* eslint-disable react-hooks/exhaustive-deps */
import {StatusBar} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreenName from '../constants/NavigationScreenName';
import AuthNavigator from '../screens/Auth';

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <NavigationContainer
        theme={{
          colors: {
            background: '#fff',
          },
        }}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <>
            <Stack.Screen
              name={NavigationScreenName.AUTH_NAVIGATOR}
              component={AuthNavigator}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
