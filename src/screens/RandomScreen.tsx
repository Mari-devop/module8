import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { ShuffleIcon, HeartIcon, ShareIcon } from '../components/icons';
import { Badge } from '../components/Badge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const WINDOW_WIDTH = Dimensions.get('window').width;

const RECIPE_DATA = {
  title: 'Cucumber Cooler',
  subtitle: 'Cucumber & Mint',
  category: 'Refreshing',
  imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop', // Temporary visual placeholder
  ingredients: [
    'Half cucumber, sliced',
    'Fresh mint leaves',
    '1 oz lime juice',
    '0.5 oz agave syrup',
    'Tonic water',
    'Ice cubes'
  ],
  steps: [
    'Muddle cucumber slices and mint leaves.',
    'Add lime juice and agave syrup.',
    'Fill glass with ice cubes.',
    'Top with tonic water and stir.',
    'Garnish with cucumber ribbon.'
  ]
};

export const RandomScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: RECIPE_DATA.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <SafeAreaView style={styles.safeAreaContext}>
            <TouchableOpacity style={styles.shuffleButton} activeOpacity={0.8}>
              <ShuffleIcon size={24} color="#ffffff" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <View style={styles.contentWrap}>
          <View style={[styles.card, styles.titleCard]}>
            <Text style={styles.recipeTitle}>{RECIPE_DATA.title}</Text>
            <Text style={styles.recipeSubtitle}>{RECIPE_DATA.subtitle}</Text>
            <View style={styles.badgeWrapper}>
              <Badge label={RECIPE_DATA.category} active={true} onPress={() => { }} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Ingredients</Text>
            {RECIPE_DATA.ingredients.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Preparation Steps</Text>
            {RECIPE_DATA.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.listText}>{step}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
              <HeartIcon size={20} color="#ffffff" focused={false} />
              <Text style={styles.primaryButtonText}>Add to Favorites</Text>
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
