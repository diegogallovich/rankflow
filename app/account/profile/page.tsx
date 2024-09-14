import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import Link from 'next/link';

export default async function Profile() {
  const { userInfo } = await getLogtoContext(logtoConfig, { fetchUserInfo: true });

  console.log(userInfo);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm">
        <Link href="/account" className="text-blue-500 hover:underline">
          Account
        </Link>
        <span className="mx-2">&gt;</span>
        <span>Profile</span>
      </nav>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage your profile</h1>
      </div>
    </div>
  );
}
