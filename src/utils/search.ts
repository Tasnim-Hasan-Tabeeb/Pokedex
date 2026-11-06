/** Lower case, and treat spaces like the dashes in PokeAPI names ("mr mime" -> "mr-mime"). */
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * Keeps the items whose name contains the query, in any case.
 * An empty query keeps everything. PokeAPI has no search endpoint,
 * so this runs on the full list that is already loaded.
 */
export function filterByName<T extends { name: string }>(items: readonly T[], query: string): readonly T[] {
  const needle = normalize(query);
  if (needle === '') return items;
  return items.filter((item) => item.name.includes(needle));
}
