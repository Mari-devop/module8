import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { HeartIcon } from './icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface RecipeCardProps {
  title: string;
  subtitle: string;
  imageUrl: string | any;
  isFavorite: boolean;
  onFavoritePress: () => void;
}

export const RecipeCard = ({ title, subtitle, imageUrl, isFavorite, onFavoritePress }: RecipeCardProps) => {
  return (
    <View style={styles.container}>
      <Image 
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
        style={styles.image} 
      />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={onFavoritePress} 
        activeOpacity={0.8}
      >
        <HeartIcon 
          size={18} 
          color={isFavorite ? colors.favoriteHeart : colors.mainBtn} 
          focused={isFavorite} 
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.badgeBG,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    backgroundColor: colors.badgeBG,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.title,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subtitle,
  },
});
