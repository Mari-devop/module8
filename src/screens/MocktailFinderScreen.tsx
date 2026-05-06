import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/RecipeCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Recipe } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SCREENS } from '../constants/screens';
import { fetchMocktails } from '../api/api';
import { useFavorites } from '../context/FavoritesContext';

const CATEGORIES = ['All', 'Refreshing', 'Fruity', 'Sparkling', 'Citrus', 'Sweet', 'Sour', 'Herbal', 'Spicy'];
const INGREDIENTS = ['Mint', 'Lime', 'Berry', 'Citrus', 'Ginger', 'Cucumber', 'Tropical'];

export const MocktailFinderScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchMocktails()
      .then(result => {
        setRecipes(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('Помилка:', err);
        setError('Не вдалося завантажити дані. Перевірте підключення до мережі.');
        setLoading(false);
      });
  }, []);

  const toggleIngredient = (ing: string) => {
    setActiveIngredients(prev =>
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const getCategoryKeywords = (cat: string) => {
    switch (cat) {
      case 'Refreshing': return ['mint', 'cooler', 'water', 'ice', 'slush'];
      case 'Fruity': return ['apple', 'peach', 'fruit', 'mango', 'banana', 'melon', 'punch', 'berry', 'cherry'];
      case 'Sparkling': return ['sparkling', 'soda', 'fizz', 'tonic'];
      case 'Citrus': return ['lemon', 'lime', 'orange', 'citrus', 'grapefruit'];
      case 'Sweet': return ['chocolate', 'vanilla', 'sweet', 'sugar', 'syrup', 'candy'];
      case 'Sour': return ['sour', 'lemon', 'lime'];
      case 'Herbal': return ['mint', 'basil', 'rosemary', 'tea'];
      case 'Spicy': return ['ginger', 'spice', 'pepper'];
      default: return [];
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const titleLower = recipe.title.toLowerCase();
    
    // Search
    if (searchQuery && !titleLower.includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category
    if (activeCategory !== 'All') {
      const keywords = getCategoryKeywords(activeCategory);
      const matchesKeyword = keywords.some(kw => titleLower.includes(kw));
      
      // Deterministic fallback so categories are never completely empty
      const charSum = recipe.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const assignedCat = CATEGORIES[(charSum % (CATEGORIES.length - 1)) + 1]; // +1 to avoid 'All'
      
      if (!matchesKeyword && assignedCat !== activeCategory) {
        return false;
      }
    }

    // Ingredients
    if (activeIngredients.length > 0) {
      const matchesAnyIng = activeIngredients.some(ing => titleLower.includes(ing.toLowerCase()));
      // Deterministic fallback for ingredients too
      const charSum2 = recipe.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 2;
      const assignedIng = INGREDIENTS[charSum2 % INGREDIENTS.length];

      if (!matchesAnyIng && !activeIngredients.includes(assignedIng)) {
        return false;
      }
    }

    return true;
  });

  const renderHeader = () => (
    <>
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
          <Badge
            label="All"
            active={activeIngredients.length === 0}
            onPress={() => setActiveIngredients([])}
          />
          {INGREDIENTS.map((ing) => (
            <Badge
              key={ing}
              label={ing}
              active={activeIngredients.includes(ing)}
              onPress={() => toggleIngredient(ing)}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Recipes</Text>
        {filteredRecipes.length === 0 && !loading && !error && (
          <Text style={styles.emptyText}>Не знайдено жодного рецепту.</Text>
        )}
      </View>
    </>
  );

  const renderItem = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeListItem}>
      <RecipeCard
        title={item.title}
        subtitle={item.subtitle}
        imageUrl={item.imageUrl}
        isFavorite={isFavorite(item.id)}
        onFavoritePress={() => toggleFavorite(item)}
        onPress={() => navigation.navigate(SCREENS.RECIPE_DETAILS, { recipe: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Mocktail Finder"
        subtitle="Discover delicious non-alcoholic drinks"
      />

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.mainBtn} />
          <Text style={styles.loadingText}>Завантаження...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  recipeListItem: {
    paddingHorizontal: spacing.l,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l,
  },
  loadingText: {
    marginTop: spacing.m,
    fontSize: 16,
    color: colors.title,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    paddingHorizontal: spacing.l,
    fontSize: 15,
    color: colors.subtitle,
    marginTop: spacing.s,
  },
});
