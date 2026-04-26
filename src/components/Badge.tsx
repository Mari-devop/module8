import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface BadgeProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const Badge = ({ label, active = false, onPress }: BadgeProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.badgeBG,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginRight: spacing.s,
    marginBottom: spacing.s,
  },
  activeContainer: {
    backgroundColor: colors.activeBadgeBG,
    borderColor: colors.activeBadgeBG,
  },
  label: {
    color: colors.badgeTitle,
    fontSize: 14,
    fontWeight: '500',
  },
  activeLabel: {
    color: colors.text,
  },
});
