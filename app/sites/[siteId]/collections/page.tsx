import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import prisma from '@/lib/prisma';
import { fetchWebflowCollections } from '@/lib/webflow'; // You'll need to implement this function
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/table';
import Link from 'next/link';

export default async function CollectionsOverviewPage({ params }) {
  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const site = await prisma.site.findUnique({
    where: { id: params.siteId, userId },
    include: { collections: true },
  });

  if (!site) {
    throw new Error('Site not found');
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
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Collections for {site.name}</h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Unsynced Collections</h2>
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
                    <Link
                      href={`/sites/${site.id}/collections/new?webflowCollectionId=${collection.id}`}
                    >
                      Sync
                    </Link>
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
                    <Link href={`/sites/${site.id}/collections/${collection.id}`}>View</Link>
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
