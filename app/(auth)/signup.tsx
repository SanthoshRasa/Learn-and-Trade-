import {
  ScrollView,
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
import { useAuth } from '../../contexts/AuthContext';

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSignup = async () => {
    setError('');
    if (!email || !password || password !== confirmPassword) {
      setError('Please fill all fields and make sure passwords match.');
      return;
    }
    try {
      await signIn(email, password); // Mimic signup
      router.replace('/(app)/home');
    } catch (e) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <ScrollView
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
          Create Account
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          Start your trading journey today
        </Text>
        {error ? (
          <Text style={{ color: COLORS.error, marginTop: 8 }}>{error}</Text>
        ) : null}
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons
            name='person'
            size={20}
            color={isDark ? COLORS.textSecondaryDark : COLORS.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
            placeholder='Full Name'
            placeholderTextColor={
              isDark ? COLORS.textSecondaryDark : COLORS.textSecondary
            }
            value={name}
            onChangeText={setName}
            autoCapitalize='words'
          />
        </View>

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
            placeholder='Confirm Password'
            placeholderTextColor={
              isDark ? COLORS.textSecondaryDark : COLORS.textSecondary
            }
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color={isDark ? COLORS.textSecondaryDark : COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.signupButton, { backgroundColor: COLORS.primary }]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
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
            or sign up with
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

        <View style={styles.loginContainer}>
          <Text
            style={[
              styles.loginText,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text
              style={[
                styles.loginLink,
                { color: isDark ? COLORS.primary : COLORS.primary },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
    marginTop: SPACING.xl,
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
    padding: SPACING.lg,
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
  signupButton: {
    height: 56,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  signupButtonText: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  loginText: {
    fontSize: SIZES.body4,
  },
  loginLink: {
    fontSize: SIZES.body4,
    fontWeight: 'bold',
  },
});
