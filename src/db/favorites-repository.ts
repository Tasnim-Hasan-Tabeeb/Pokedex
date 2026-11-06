import { getDatabase } from './database';

export type Favorite = { id: number; name: string };

export async function getFavorites(): Promise<Favorite[]> {
  const db = await getDatabase();
  return db.getAllAsync<Favorite>('SELECT id, name FROM favorites ORDER BY id');
}

export async function addFavorite(favorite: Favorite): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('INSERT OR REPLACE INTO favorites (id, name) VALUES (?, ?)', [
    favorite.id,
    favorite.name,
  ]);
}

export async function removeFavorite(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM favorites WHERE id = ?', [id]);
}
