'use client';

import { useFormState } from 'react-dom';
import { createSite, updateSite } from '@/app/actions/site';

export function SiteForm({ initialData }) {
  const [state, formAction] = useFormState(initialData ? updateSite : createSite, null);

  return (
    <form action={formAction}>
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      <input type="text" name="name" defaultValue={initialData?.name} required />
      <select name="source" defaultValue={initialData?.source} required>
        <option value="webflow">Webflow</option>
        <option value="rankflow">Rankflow</option>
      </select>
      <textarea name="context" defaultValue={initialData?.context} required />
      {!initialData && <input type="text" name="webflowSiteId" placeholder="Webflow Site ID" />}
      <input
        type="password"
        name="webflowSiteToken"
        placeholder="Webflow Site Token"
        defaultValue={initialData?.webflowSiteToken}
      />
      <button type="submit">{initialData ? 'Update' : 'Create'} Site</button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
