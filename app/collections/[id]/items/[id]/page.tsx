import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import prisma from '@/lib/prisma';
import { fetchWebflowItem } from '@/lib/webflow';
import { CollectionItemForm } from '@/app/ui/collection-item-form';

export default async function CollectionItemPage({
  params,
}: {
  params: { id: string; itemId: string };
}) {
  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collectionItem = await prisma.collectionItem.findUnique({
    where: { id: params.itemId, userId },
    include: { collection: { include: { site: true } } },
  });

  if (!collectionItem) {
    throw new Error('Collection item not found');
  }

  if (
    !collectionItem.collection.site.webflowSiteId ||
    !collectionItem.collection.site.webflowSiteToken ||
    !collectionItem.webflowItemId
  ) {
    throw new Error('Missing required Webflow information');
  }

  const webflowItem = await fetchWebflowItem(
    collectionItem.collection.site.webflowSiteId,
    collectionItem.collection.site.webflowSiteToken,
    collectionItem.webflowItemId
  );

  const combinedData = {
    ...collectionItem,
    webflowData: webflowItem,
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Collection Item: {webflowItem.name}</h1>
      <CollectionItemForm initialData={combinedData} />
    </div>
  );
}
