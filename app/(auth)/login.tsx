import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    router.replace('/');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Welcome Back
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          Sign in to continue your trading journey
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons
            name='mail'
            size={20}
            color={isDark ? COLORS.textSecondaryDark : COLORS.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
            placeholder='Email'
            placeholderTextColor={
              isDark ? COLORS.textSecondaryDark : COLORS.textSecondary
            }
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name='lock-closed'
            size={20}
            color={isDark ? COLORS.textSecondaryDark : COLORS.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
            placeholder='Password'
            placeholderTextColor={
              isDark ? COLORS.textSecondaryDark : COLORS.textSecondary
            }
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={isDark ? COLORS.textSecondaryDark : COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text
            style={[
              styles.forgotPasswordText,
              { color: isDark ? COLORS.primary : COLORS.primary },
            ]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: COLORS.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View
            style={[
              styles.dividerLine,
              {
                backgroundColor: isDark ? COLORS.borderDark : COLORS.border,
              },
            ]}
          />
          <Text
            style={[
              styles.dividerText,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            or continue with
          </Text>
          <View
            style={[
              styles.dividerLine,
              {
                backgroundColor: isDark ? COLORS.borderDark : COLORS.border,
              },
            ]}
          />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons name='logo-google' size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons name='logo-facebook' size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text
            style={[
              styles.signupText,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Don&apos;t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text
              style={[
                styles.signupLink,
                { color: isDark ? COLORS.primary : COLORS.primary },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  header: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: SIZES.body3,
  },
  form: {
    gap: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: SIZES.body3,
  },
  eyeIcon: {
    padding: SPACING.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: SIZES.body4,
  },
  loginButton: {
    height: 56,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  loginButtonText: {
    color: COLORS.background,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    fontSize: SIZES.body4,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  signupText: {
    fontSize: SIZES.body4,
  },
  signupLink: {
    fontSize: SIZES.body4,
    fontWeight: 'bold',
  },
});
