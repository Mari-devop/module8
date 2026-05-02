import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Recipe } from '../data/mockData';
import { HeartIcon } from '../components/icons';

type ParamList = {
  RecipeDetails: {
    recipe: Recipe;
  };
};

export const RecipeDetailsScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'RecipeDetails'>>();
  const navigation = useNavigation();
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.subtitle}>{recipe.subtitle}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteBtn}>
            <HeartIcon size={24} color={recipe.isFavorite ? colors.favoriteHeart : colors.mainBtn} focused={recipe.isFavorite} />
          </TouchableOpacity>
        </View>

        {recipe.duration && (
          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>Duration: {recipe.duration}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsList}>
          {recipe.ingredients?.map((ing, idx) => (
            <View key={idx} style={styles.ingredientItem}>
              <Text style={styles.ingredientBullet}>•</Text>
              <Text style={styles.ingredientText}>{ing}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>{recipe.instructions}</Text>
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
  favoriteBtn: {
    backgroundColor: colors.badgeBG,
    padding: spacing.m,
    borderRadius: 50,
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
    color: colors.title,
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },
});
