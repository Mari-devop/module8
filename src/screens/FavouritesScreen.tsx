import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { HeartPulseIcon } from '../components/icons';
import { RecipeCard } from '../components/RecipeCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Header } from '../components/Header';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface FavouritesScreenProps {
  savedRecipes?: Recipe[];
  onDiscoverPress: () => void;
}

export const FavouritesScreen = ({ savedRecipes = [], onDiscoverPress }: FavouritesScreenProps) => {
  return (
    <View style={styles.container}>
      <Header
        title="Favourites"
        subtitle="Your saved mocktail recipes"
      />

      {savedRecipes.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          <Text style={styles.listCount}>{savedRecipes.length} recipes saved</Text>
          {savedRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              subtitle={recipe.subtitle}
              imageUrl={recipe.imageUrl}
              isFavorite={recipe.isFavorite}
              onFavoritePress={() => { }}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContent}>
          <View style={styles.iconContainer}>
            <HeartPulseIcon size={32} color={colors.mainBtn} />
          </View>
          <Text style={styles.title}>No favourites yet</Text>
          <Text style={styles.subtitle}>
            Start exploring and save your favorite{'\n'}mocktail recipes!
          </Text>

          <TouchableOpacity style={styles.button} onPress={onDiscoverPress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Discover Recipes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  listContent: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.m,
    paddingBottom: 100,
  },
  listCount: {
    color: colors.subtitle,
    fontSize: 14,
    marginBottom: spacing.m,
    marginLeft: 4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.iconBG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.l,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.categoryTitle,
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.subtitle,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.activeBadgeBG,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: colors.activeBadgeBG,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
