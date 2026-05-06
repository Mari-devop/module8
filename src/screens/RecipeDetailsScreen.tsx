import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Recipe } from '../data/mockData';
import { HeartIcon, ShareIcon } from '../components/icons';
import { useFavorites } from '../context/FavoritesContext';
import { fetchMocktailDetails } from '../api/api';

type ParamList = {
  RecipeDetails: {
    recipe: Recipe;
  };
};

export const RecipeDetailsScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'RecipeDetails'>>();
  const navigation = useNavigation();
  const { recipe } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(recipe.id);

  const [details, setDetails] = useState<Partial<Recipe> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMocktailDetails(recipe.id)
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Не вдалося завантажити деталі рецепту.');
        setLoading(false);
      });
  }, [recipe.id]);

  const ingredientsToDisplay = details?.ingredients || recipe.ingredients || [];
  const instructionsToDisplay = details?.instructions || recipe.instructions || 'No instructions available.';

  const parseInstructions = (instructions: string) => {
    return instructions
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s + '.');
  };

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.subtitle}>{recipe.subtitle}</Text>
          </View>
        </View>

        {recipe.duration && (
          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>Duration: {recipe.duration}</Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.activeBadgeBG} />
            <Text style={styles.loadingText}>Завантаження деталей...</Text>
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {ingredientsToDisplay.map((ing, idx) => (
                <View key={idx} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredientText}>{ing}</Text>
                </View>
              ))}
              {ingredientsToDisplay.length === 0 && (
                <Text style={styles.instructionsText}>No ingredients found.</Text>
              )}
            </View>

            <View style={styles.stepsCard}>
              <Text style={styles.stepsCardTitle}>Preparation Steps</Text>
              <View style={styles.stepsList}>
                {parseInstructions(instructionsToDisplay).map((step, idx) => (
                  <View key={idx} style={styles.stepItem}>
                    <View style={styles.stepBadge}>
                      <Text style={styles.stepNumber}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.addFavoriteBtn} onPress={() => toggleFavorite(recipe)} activeOpacity={0.8}>
              <HeartIcon size={20} color={'#ffffff'} focused={isFav} />
              <Text style={styles.addFavoriteBtnText}>
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareBtn} onPress={() => {}} activeOpacity={0.8}>
              <ShareIcon size={20} color={colors.title} />
              <Text style={styles.shareBtnText}>Share Recipe</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.l,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#ffffff',
    marginTop: -24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  titleContainer: {
    flex: 1,
    paddingRight: spacing.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.title,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtitle,
  },
  infoBadge: {
    backgroundColor: colors.badgeBG,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: 8,
    marginBottom: spacing.l,
  },
  infoText: {
    color: colors.title,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.title,
    marginTop: spacing.m,
    marginBottom: spacing.m,
  },
  ingredientsList: {
    marginBottom: spacing.l,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientBullet: {
    fontSize: 20,
    color: colors.mainBtn,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: colors.title,
  },
  instructionsText: {
    fontSize: 16,
    color: colors.subtitle,
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },
  stepsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
    padding: spacing.l,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepsCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.title,
    marginBottom: spacing.l,
  },
  stepsList: {
    flexDirection: 'column',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.m,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.activeBadgeBG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
    marginTop: 2,
  },
  stepNumber: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.categoryTitle,
    lineHeight: 22,
  },
  addFavoriteBtn: {
    backgroundColor: colors.activeBadgeBG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: spacing.m,
  },
  addFavoriteBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: spacing.s,
  },
  shareBtn: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
    marginBottom: spacing.xxl,
  },
  shareBtnText: {
    color: colors.title,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.s,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.m,
    color: colors.title,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: spacing.m,
  },
});
