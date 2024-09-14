import { Button } from '@/components/button';
import SignIn from '@/ui/sign-in';
import { signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { NotifyUsDialog } from '@/ui/notify-us-dialog';

export default function AuthGate() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Whoa there...
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Seems like you can't get in here. Make sure you log in first.
        </p>
        <div className="mt-6">
          <SignIn
            onSignIn={async () => {
              'use server';
              await signIn(logtoConfig);
            }}
            cta="Sign In"
            color="blue"
          />
        </div>
        <div className="mt-4">
          <Button href="/" outline className="w-full">
            Go to Home Page
          </Button>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Keep seeing this page?
          </p>
          <NotifyUsDialog />
        </div>
      </div>
    </div>
  );
}
