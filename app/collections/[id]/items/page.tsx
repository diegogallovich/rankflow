import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import prisma from '@/lib/prisma';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/table';
import { Button } from '@/components/button';
import Link from 'next/link';

export default async function CollectionItemsPage({ params }: { params: { id: string } }) {
  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collection = await prisma.collection.findUnique({
    where: { id: params.id, userId },
    include: { items: true },
  });

  if (!collection) {
    throw new Error('Collection not found');
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Items for Collection: {collection.name}</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {collection.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Link href={`/collections/${collection.id}/items/${item.id}`}>
                  <Button>Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
