export function getPathnameFromReferer(referer: string) {
  const url = new URL(referer);
  return url.pathname;
}
