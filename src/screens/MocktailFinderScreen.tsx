import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/RecipeCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { MOCK_SAVED_RECIPES } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SCREENS } from '../constants/screens';

const CATEGORIES = ['All', 'Refreshing', 'Fruity', 'Sparkling', 'Citrus', 'Sweet', 'Sour', 'Herbal', 'Spicy'];
const INGREDIENTS = ['Mint', 'Lime', 'Berry', 'Citrus', 'Ginger', 'Cucumber', 'Tropical'];

export const MocktailFinderScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigation = useNavigation<StackNavigationProp<any>>();

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
          <View style={styles.recipeListContainer}>
            {MOCK_SAVED_RECIPES.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                subtitle={recipe.subtitle}
                imageUrl={recipe.imageUrl}
                isFavorite={recipe.isFavorite}
                onFavoritePress={() => { }}
                onPress={() => navigation.navigate(SCREENS.RECIPE_DETAILS, { recipe })}
              />
            ))}
          </View>
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
  recipeListContainer: {
    paddingHorizontal: spacing.l,
  },
});
