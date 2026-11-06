import * as Haptics from 'expo-haptics';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addFavorite, getFavorites, removeFavorite, type Favorite } from '@/db/favorites-repository';

const FAVORITES_KEY = ['favorites'];

export function useFavorites() {
  return useQuery({ queryKey: FAVORITES_KEY, queryFn: getFavorites });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ favorite, isFavorite }: { favorite: Favorite; isFavorite: boolean }) => {
      if (isFavorite) {
        await removeFavorite(favorite.id);
      } else {
        await addFavorite(favorite);
      }
    },
    onSuccess: () => {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return queryClient.invalidateQueries({ queryKey: FAVORITES_KEY });
    },
  });
}
