import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ResearchScreen from './ResearchScreen';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer> 
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{title:"Sujets", headerShown: false , }}/>
        <Tab.Screen name="Research" component={ResearchScreen} options={{title:"Recherche", headerShown: false , }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
