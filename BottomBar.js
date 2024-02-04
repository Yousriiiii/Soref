import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ResearchScreen from './ResearchScreen';


import HomeIcon from './assets/HomeIcon.png';
import ResearchIcon from './assets/ResearchIcon.png';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{title:"Sujets", headerShown: false , tabBarIcon: ({ focused }) => (
              <Image
                source={HomeIcon}
                style={{
                  width: 60,
                  height: 60,
                  tintColor: focused ? 'blue' : 'gray', // You can customize the tint color
                }}
              />
            ), }}/>
        <Tab.Screen name="Research" component={ResearchScreen} options={{title:"Recherche", headerShown: false , tabBarIcon: ({ focused }) => (
              <Image
                source={ResearchIcon}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? 'blue' : 'gray', // You can customize the tint color
                }}
              />
            ), }} />
      </Tab.Navigator>
  );
};


export default BottomBar;
