'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { createCollectionItemSchema, updateCollectionItemSchema } from '@/lib/definitions';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';

export async function createCollectionItem(formData: FormData) {
  const { webflowItemId, targetKeyword, context, status, collectionId } =
    createCollectionItemSchema.parse({
      webflowItemId: formData.get('webflowItemId'),
      targetKeyword: formData.get('targetKeyword'),
      context: formData.get('context'),
      status: formData.get('status'),
      collectionId: formData.get('collectionId'),
    });

  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collectionItem = await prisma.collectionItem.create({
    data: {
      webflowItemId,
      targetKeyword,
      context,
      status,
      collectionId,
      userId,
    },
  });

  revalidatePath(`/sites/${collectionItem.collection.siteId}/collections/${collectionId}`);
  return { message: 'Collection item created successfully' };
}

export async function updateCollectionItem(formData: FormData) {
  const { id, targetKeyword, context, status } = updateCollectionItemSchema.parse({
    id: formData.get('id'),
    targetKeyword: formData.get('targetKeyword'),
    context: formData.get('context'),
    status: formData.get('status'),
  });

  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collectionItem = await prisma.collectionItem.update({
    where: { id, userId },
    data: { targetKeyword, context, status },
    include: { collection: true },
  });

  revalidatePath(
    `/sites/${collectionItem.collection.siteId}/collections/${collectionItem.collectionId}/items/${id}`
  );
  return { message: 'Collection item updated successfully' };
}
