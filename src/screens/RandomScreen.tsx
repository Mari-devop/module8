import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { ShuffleIcon, HeartIcon, ShareIcon } from '../components/icons';
import { Badge } from '../components/Badge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { fetchMocktails, fetchMocktailDetails } from '../api/api';
import { Recipe } from '../data/mockData';
import { useFavorites } from '../context/FavoritesContext';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const RandomScreen = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [details, setDetails] = useState<Partial<Recipe> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const { isFavorite, toggleFavorite } = useFavorites();

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const recipes = await fetchMocktails();
      setAllRecipes(recipes);
      if (recipes.length > 0) {
        pickRandomRecipe(recipes);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const pickRandomRecipe = async (recipesArray = allRecipes) => {
    if (recipesArray.length === 0) return;
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * recipesArray.length);
    const randomRecipe = recipesArray[randomIndex];
    setCurrentRecipe(randomRecipe);
    try {
      const recipeDetails = await fetchMocktailDetails(randomRecipe.id);
      setDetails(recipeDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const parseInstructions = (instructions: string) => {
    if (!instructions) return [];
    return instructions
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s + '.');
  };

  if (loading && !currentRecipe) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.activeBadgeBG} />
      </View>
    );
  }

  if (!currentRecipe) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.errorText}>No recipes found.</Text>
      </View>
    );
  }

  const isFav = isFavorite(currentRecipe.id);
  const ingredientsToDisplay = details?.ingredients || [];
  const stepsToDisplay = parseInstructions(details?.instructions || '');

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentRecipe.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <SafeAreaView style={styles.safeAreaContext}>
            <TouchableOpacity style={styles.shuffleButton} activeOpacity={0.8} onPress={() => pickRandomRecipe()}>
              <ShuffleIcon size={24} color="#ffffff" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <View style={styles.contentWrap}>
          <View style={[styles.card, styles.titleCard]}>
            <Text style={styles.recipeTitle}>{currentRecipe.title}</Text>
            <Text style={styles.recipeSubtitle}>{currentRecipe.subtitle}</Text>
            <View style={styles.badgeWrapper}>
              <Badge label="Random Pick" active={true} onPress={() => { }} />
            </View>
          </View>
          
          {loading ? (
             <View style={[styles.card, { alignItems: 'center', paddingVertical: spacing.xxl }]}>
               <ActivityIndicator size="large" color={colors.activeBadgeBG} />
             </View>
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.cardSectionTitle}>Ingredients</Text>
                {ingredientsToDisplay.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))}
                {ingredientsToDisplay.length === 0 && (
                  <Text style={styles.listText}>No ingredients listed.</Text>
                )}
              </View>
              <View style={styles.card}>
                <Text style={styles.cardSectionTitle}>Preparation Steps</Text>
                {stepsToDisplay.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.stepNumberCircle}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.listText}>{step}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={() => toggleFavorite(currentRecipe)}>
              <HeartIcon size={20} color="#ffffff" focused={isFav} />
              <Text style={styles.primaryButtonText}>
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <ShareIcon size={20} color={colors.categoryTitle} />
              <Text style={styles.secondaryButtonText}>Share Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.title,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageContainer: {
    width: WINDOW_WIDTH,
    height: 380,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  safeAreaContext: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
  },
  shuffleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.activeBadgeBG,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  contentWrap: {
    marginTop: -40,
    paddingHorizontal: spacing.l,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: spacing.l,
    marginBottom: spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  titleCard: {
    alignItems: 'flex-start',
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.categoryTitle,
    marginBottom: 4,
  },
  recipeSubtitle: {
    fontSize: 15,
    color: colors.subtitle,
    marginBottom: spacing.m,
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
  },
  cardSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.categoryTitle,
    marginBottom: spacing.m,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.activeBadgeBG,
    marginRight: spacing.m,
    marginLeft: spacing.xs,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.l,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.activeBadgeBG,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 15,
    color: '#364153',
    lineHeight: 22,
    flex: 1,
  },
  actionRow: {
    marginTop: spacing.s,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.activeBadgeBG,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.s,
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: colors.categoryTitle,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.s,
  },
});
