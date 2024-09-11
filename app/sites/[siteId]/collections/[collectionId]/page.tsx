import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import prisma from '@/lib/prisma';
import { CollectionForm } from '@/app/ui/collection-form';

export default async function CollectionPage({ params }) {
  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collection = await prisma.collection.findUnique({
    where: { id: params.collectionId, userId },
    include: { site: true },
  });

  if (!collection) {
    throw new Error('Collection not found');
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Collection: {collection.name}</h1>
      <CollectionForm initialData={collection} />
    </div>
  );
}
