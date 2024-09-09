import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { Text } from '@/components/ui/text';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    // Redirect to home page if user is not authenticated
    return redirect('/');
  }

  const userEmail = claims?.email;

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <Text className="mb-6 text-3xl font-bold">Welcome to your account profile, {userEmail}</Text>
    </div>
  );
}
