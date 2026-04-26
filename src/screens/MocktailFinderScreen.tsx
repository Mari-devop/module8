import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/RecipeCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const CATEGORIES = ['All', 'Refreshing', 'Fruity', 'Sparkling', 'Citrus', 'Sweet', 'Sour', 'Herbal', 'Spicy'];
const INGREDIENTS = ['Mint', 'Lime', 'Berry', 'Citrus', 'Ginger', 'Cucumber', 'Tropical'];
const RECIPES = [
  {
    id: '1',
    title: 'Virgin Mojito',
    subtitle: 'Refreshing Mint & Lime',
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=600&auto=format&fit=crop',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Orange Sunshine',
    subtitle: 'Bright Citrus Blend',
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451b66?q=80&w=600&auto=format&fit=crop',
    isFavorite: false,
  },
];

export const MocktailFinderScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <View style={styles.container}>
      <Header 
        title="Mocktail Finder" 
        subtitle="Discover delicious non-alcoholic drinks" 
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onPress={() => setActiveCategory(cat)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter by Ingredients</Text>
          <View style={styles.wrapList}>
            {INGREDIENTS.map((ing) => (
              <Badge
                key={ing}
                label={ing}
                active={false}
              />
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Recipes</Text>
          {RECIPES.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              subtitle={recipe.subtitle}
              imageUrl={recipe.imageUrl}
              isFavorite={recipe.isFavorite}
              onFavoritePress={() => { }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchWrapper: {
    paddingHorizontal: spacing.l,
    marginTop: spacing.m,
  },
  section: {
    marginTop: spacing.l,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.categoryTitle,
    paddingHorizontal: spacing.l,
    marginBottom: spacing.s,
  },
  horizontalList: {
    paddingHorizontal: spacing.l,
  },
  wrapList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.l,
  },
});
