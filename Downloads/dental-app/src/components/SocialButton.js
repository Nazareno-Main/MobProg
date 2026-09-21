import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';

export default function SocialButton({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.circle} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={22} color={colors.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
});