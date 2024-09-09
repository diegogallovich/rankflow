import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    // Redirect to home page if user is not authenticated
    return redirect('/');
  }

  const user = {
    email: claims?.email,
    created_at: claims?.iat ? new Date(Number(claims.iat) * 1000).toISOString() : undefined,
    last_sign_in_at: claims?.auth_time
      ? new Date(Number(claims.auth_time) * 1000).toISOString()
      : undefined,
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
      <h1 className="mb-6 text-3xl font-bold">Your Account</h1>

      <div className="mb-6">
        <Text className="text-lg font-semibold">Email:</Text>
        <Text>{user.email}</Text>
      </div>

      {user.created_at && (
        <div className="mb-6">
          <Text className="text-lg font-semibold">Account created:</Text>
          <Text>{new Date(user.created_at).toLocaleDateString()}</Text>
        </div>
      )}

      {user.last_sign_in_at && (
        <div className="mb-6">
          <Text className="text-lg font-semibold">Last sign in:</Text>
          <Text>{new Date(user.last_sign_in_at).toLocaleDateString()}</Text>
        </div>
      )}

      <div className="space-y-4">
        <Button href="/account/change-password">Change Password</Button>
        <form action="/api/auth/sign-out" method="post">
          <Button type="submit" outline>
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
