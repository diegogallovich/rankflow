export async function fetchWebflowCollections(webflowSiteId: string, webflowSiteToken: string) {
  // Dummy function
  console.log('Fetching Webflow collections for', webflowSiteId, 'with token', webflowSiteToken);
  return [
    { id: 'dummy1', name: 'Dummy Collection 1' },
    { id: 'dummy2', name: 'Dummy Collection 2' },
  ];
}

export async function fetchWebflowItem(
  webflowSiteId: string,
  webflowSiteToken: string,
  itemId: string
) {
  // Dummy function
  console.log('Fetching Webflow item', itemId, 'from site', webflowSiteId);
  return {
    id: itemId,
    name: 'Dummy Item',
    // Add other properties as needed
  };
}
