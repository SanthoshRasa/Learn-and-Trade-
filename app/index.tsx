import { Redirect } from 'expo-router';

export default function Index() {
  // const { user, isLoading } = useAuth();
  const user = {
    name: 'John Doe',
    level: 1,
    xp: 100,
    winRate: 50,
  };
  // Show nothing while checking auth status

  return <Redirect href={user ? '/(app)/home' : '/(auth)/onboarding'} />;
}
