import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MocktailFinderScreen } from './src/screens/MocktailFinderScreen';
import { FavouritesScreen } from './src/screens/FavouritesScreen';
import { RandomScreen } from './src/screens/RandomScreen';
import { TabBar, TabType } from './src/components/TabBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Home');

  const MOCK_SAVED_RECIPES = [
    {
      id: '1',
      title: 'Virgin Mojito',
      subtitle: 'Refreshing Mint & Lime',
      imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=600&auto=format&fit=crop',
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Tropical Sunrise',
      subtitle: 'Mango & Passion Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451b66?q=80&w=600&auto=format&fit=crop',
      isFavorite: true,
    },
  ];

  return (
    <View style={styles.container}>
      {activeTab === 'Home' && <MocktailFinderScreen />}

      {activeTab === 'Favourites' && (
        <FavouritesScreen
          savedRecipes={MOCK_SAVED_RECIPES}
          onDiscoverPress={() => setActiveTab('Home')}
        />
      )}

      {activeTab === 'Random' && <RandomScreen />}

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
