'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { createCollectionSchema, updateCollectionSchema } from '@/lib/definitions';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';

export async function createCollection(formData: FormData) {
  const { webflowCollectionId, name, context, siteId } = createCollectionSchema.parse({
    webflowCollectionId: formData.get('webflowCollectionId'),
    name: formData.get('name'),
    context: formData.get('context'),
    siteId: formData.get('siteId'),
  });

  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  await prisma.collection.create({
    data: {
      webflowCollectionId,
      name,
      context,
      siteId,
      userId,
    },
  });

  revalidatePath(`/sites/${siteId}/collections`);
  return { message: 'Collection created successfully' };
}

export async function updateCollection(formData: FormData) {
  const { id, name, context } = updateCollectionSchema.parse({
    id: formData.get('id'),
    name: formData.get('name'),
    context: formData.get('context'),
  });

  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const collection = await prisma.collection.update({
    where: { id, userId },
    data: { name, context },
  });

  revalidatePath(`/sites/${collection.siteId}/collections/${id}`);
  return { message: 'Collection updated successfully' };
}
