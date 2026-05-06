import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={styles.container}>
        <FavoritesProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
