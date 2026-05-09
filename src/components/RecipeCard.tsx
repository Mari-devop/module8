import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { HeartIcon } from './icons';
import { spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

interface RecipeCardProps {
  title: string;
  subtitle: string;
  imageUrl: string | any;
  isFavorite: boolean;
  onFavoritePress: () => void;
  onPress?: () => void;
}

export const RecipeCard = ({ title, subtitle, imageUrl, isFavorite, onFavoritePress, onPress }: RecipeCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.badgeBorder }]} onPress={onPress} activeOpacity={0.9}>
      <Image 
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
        style={styles.image} 
      />
      <TouchableOpacity 
        style={[styles.favoriteButton, { backgroundColor: colors.badgeBG }]} 
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
        <Text style={[styles.title, { color: colors.title }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.subtitle }]}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.l,
    borderWidth: 1,
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
});
