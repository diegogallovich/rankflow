import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import prisma from '@/lib/prisma';
import { fetchWebflowCollections } from '@/lib/webflow';
import { Textarea } from '@/components/textarea';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/table';
import { Button } from '@/components/button';
import Link from 'next/link';

export default async function SitePage({ params }: { params: { id: string } }) {
  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const site = await prisma.site.findUnique({
    where: { id: params.id, userId },
    include: { collections: true },
  });

  if (!site) {
    throw new Error('Site not found');
  }

  if (!site.webflowSiteId || !site.webflowSiteToken) {
    throw new Error('Missing Webflow site information');
  }

  const webflowCollections = await fetchWebflowCollections(
    site.webflowSiteId,
    site.webflowSiteToken
  );

  const syncedCollections = site.collections;
  const unsyncedCollections = webflowCollections.filter(
    (wc) => !syncedCollections.some((sc) => sc.webflowCollectionId === wc.id)
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Site: {site.name}</h1>
      <form>
        <Textarea name="context" defaultValue={site.context || ''} />
        <Button type="submit">Update Context</Button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Available Collections</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {unsyncedCollections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>{collection.name}</TableCell>
                  <TableCell>
                    <Button>Sync</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Synced Collections</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {syncedCollections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>{collection.name}</TableCell>
                  <TableCell>
                    <Link href={`/collections/${collection.id}`}>
                      <Button>View Profile</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
