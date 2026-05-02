import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigator } from './StackNavigator';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { RandomScreen } from '../screens/RandomScreen';
import { SCREENS } from '../constants/screens';
import { colors } from '../theme/colors';
import { HomeIcon, HeartIcon, ShuffleIcon } from '../components/icons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colors.badgeBorder,
          height: 80,
          paddingHorizontal: 20,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.activeBadgeBG,
        tabBarInactiveTintColor: colors.mainBtn,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        }
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME_TAB}
        component={StackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon size={24} color={color} focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name={SCREENS.FAVOURITES_TAB}
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <HeartIcon size={24} color={color} focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name={SCREENS.RANDOM_TAB}
        component={RandomScreen}
        options={{
          tabBarLabel: 'Random',
          tabBarIcon: ({ color, focused }) => (
            <ShuffleIcon size={24} color={color} focused={focused} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
