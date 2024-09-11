'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { createSiteSchema, updateSiteSchema } from '@/lib/definitions';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';

export async function createSite(formData: FormData) {
  const { name, source, context, webflowSiteId, webflowSiteToken } = createSiteSchema.parse({
    name: formData.get('name'),
    source: formData.get('source'),
    context: formData.get('context'),
    webflowSiteId: formData.get('webflowSiteId'),
    webflowSiteToken: formData.get('webflowSiteToken'),
  });

  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  await prisma.site.create({
    data: {
      name,
      source,
      context,
      webflowSiteId,
      webflowSiteToken,
      userId,
    },
  });

  revalidatePath('/sites');
  return { message: 'Site created successfully' };
}

export async function updateSite(formData: FormData) {
  const { id, name, context, webflowSiteToken } = updateSiteSchema.parse({
    id: formData.get('id'),
    name: formData.get('name'),
    context: formData.get('context'),
    webflowSiteToken: formData.get('webflowSiteToken'),
  });

  const { userInfo } = await getLogtoContext(logtoConfig);
  const userId = userInfo?.sub;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  await prisma.site.update({
    where: { id, userId },
    data: { name, context, webflowSiteToken },
  });

  revalidatePath(`/sites/${id}`);
  return { message: 'Site updated successfully' };
}
