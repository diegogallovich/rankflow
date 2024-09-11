import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import prisma from '@/lib/prisma';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collection = await prisma.collection.findUnique({
    where: { id: params.id, userId },
    include: { site: true },
  });

  if (!collection) {
    throw new Error('Collection not found');
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Collection: {collection.name}</h1>
      <form>
        <Textarea name="context" defaultValue={collection.context || ''} />
        <Button type="submit">Update Context</Button>
      </form>
      {/* Add fields configuration here */}
    </div>
  );
}
