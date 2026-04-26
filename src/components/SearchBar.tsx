import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchIcon } from './icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder = 'Search mocktails...' }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <SearchIcon size={20} color={colors.mainBtn} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.searchPlaceholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.badgeBG,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
    borderRadius: 12,
    paddingHorizontal: spacing.m,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: spacing.m,
    fontSize: 16,
    color: colors.title,
  },
});
