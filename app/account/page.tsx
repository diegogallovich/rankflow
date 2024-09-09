import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login page if user is not authenticated
    return redirect('/login');
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
      <h1 className="mb-6 text-3xl font-bold">Your Account</h1>

      <div className="mb-6">
        <Text className="text-lg font-semibold">Email:</Text>
        <Text>{user.email}</Text>
      </div>

      <div className="mb-6">
        <Text className="text-lg font-semibold">Account created:</Text>
        <Text>{new Date(user.created_at).toLocaleDateString()}</Text>
      </div>

      <div className="mb-6">
        <Text className="text-lg font-semibold">Last sign in:</Text>
        <Text>
          {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
        </Text>
      </div>

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
