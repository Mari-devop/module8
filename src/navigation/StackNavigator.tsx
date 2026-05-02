import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MocktailFinderScreen } from '../screens/MocktailFinderScreen';
import { RecipeDetailsScreen } from '../screens/RecipeDetailsScreen';
import { SCREENS } from '../constants/screens';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
          borderBottomWidth: 1,
          borderBottomColor: colors.badgeBorder,
        },
        headerTintColor: colors.title,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name={SCREENS.MOCKTAIL_FINDER}
        component={MocktailFinderScreen}
        options={{ headerShown: false }} // Header is already rendered inside the screen
      />
      <Stack.Screen
        name={SCREENS.RECIPE_DETAILS}
        component={RecipeDetailsScreen}
        options={({ route }: any) => ({
          title: route.params?.recipe?.title || 'Details',
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
