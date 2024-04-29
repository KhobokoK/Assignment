import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Dashbord from './Pages/Dashbord';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashbord" component={Dashbord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
