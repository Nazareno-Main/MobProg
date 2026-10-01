import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function InputField({
  label,
  icon,
  error,
  isPassword = false,
  style,
  ...textInputProps
}) {
  const [secure, setSecure] = useState(isPassword);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
          error && styles.inputRowError,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? colors.primary : colors.placeholder}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...textInputProps}
        />

        {isPassword ? (
          <TouchableOpacity onPress={() => setSecure((prev) => !prev)}>
            <Ionicons
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.placeholder}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.secondary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  inputRowFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  inputRowError: {
    borderColor: colors.danger,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});