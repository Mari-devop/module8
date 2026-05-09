import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

interface BadgeProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const Badge = ({ label, active = false, onPress }: BadgeProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.badgeBG, borderColor: colors.badgeBorder },
        active && { backgroundColor: colors.activeBadgeBG, borderColor: colors.activeBadgeBG }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.label,
        { color: colors.badgeTitle },
        active && { color: colors.text }
      ]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginRight: spacing.s,
    marginBottom: spacing.s,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
