import { getLogtoContext, signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { SidebarSection, SidebarHeading, SidebarItem, SidebarLabel } from '@/components/sidebar';
import { PlusIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';
import { SignInSidebarItem } from '@/ui/sign-in';

const collectionsMock = [
  {
    id: '1',
    name: 'Collection 1',
  },
  {
    id: '2',
    name: 'Collection 2',
  },
  {
    id: '3',
    name: 'Collection 3',
  },
  {
    id: '4',
    name: 'Collection 4',
  },
  {
    id: '5',
    name: 'Collection 5',
  },
];

const currentSiteMock = {
  id: '1',
  collections: collectionsMock,
};

export default async function CollectionsSidebarSection() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  return (
    <SidebarSection>
      <SidebarHeading>Collections</SidebarHeading>
      {isAuthenticated &&
        currentSiteMock?.collections.map((collection) => (
          <SidebarItem
            key={collection.id}
            href={`/sites/${currentSiteMock.id}/collections/${collection.id}`}
            current={pathname === `/sites/${currentSiteMock.id}/collections/${collection.id}`}
          >
            {collection.name}
          </SidebarItem>
        ))}

      {isAuthenticated ? (
        <SidebarItem href={`/sites/${currentSiteMock.id}/collections/new`}>
          <PlusIcon />
          <SidebarLabel>Sync New Collection</SidebarLabel>
        </SidebarItem>
      ) : (
        <SignInSidebarItem
          onSignIn={async () => {
            'use server';
            await signIn(logtoConfig);
          }}
        >
          <PlusIcon />
          <SidebarLabel>Sign Up To Add</SidebarLabel>
        </SignInSidebarItem>
      )}
    </SidebarSection>
  );
}
