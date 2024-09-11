import { SiteForm } from '@/app/ui/site-form';
import prisma from '@/lib/prisma';

export default async function EditSitePage({ params }) {
  const site = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      <h1>Edit Site</h1>
      <SiteForm initialData={site} />
    </div>
  );
}
