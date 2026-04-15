/** Firma gönderi akışı — `app/akis` ile eşleşmeli; revalidatePath vb. için tek kaynak. */
export const PUBLIC_FEED_ROUTE = "/akis" as const;

export function isPublicFeedPath(pathname: string): boolean {
  return pathname === PUBLIC_FEED_ROUTE || pathname.startsWith(`${PUBLIC_FEED_ROUTE}?`);
}
