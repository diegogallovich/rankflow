import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/table';

export default async function Profile() {
  const { userInfo, claims } = await getLogtoContext(logtoConfig, { fetchUserInfo: true });

  console.log(userInfo);
  console.log(claims);

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

      {claims && (
        <div>
          <h2>Claims:</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(claims).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{String(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {userInfo && (
        <div className="mt-32">
          <h2>User Info:</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(userInfo).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{String(JSON.stringify(value))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
