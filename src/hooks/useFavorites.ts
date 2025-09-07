import { useState, useEffect } from "react";

interface Favorite {
  id: number;
  media_type: "movie" | "tv" ;
}

const FAVORITES_KEY = "tmdb_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  const isFavorited = (id: number, media_type: "movie" | "tv"): boolean => {
    return favorites.some(
      (fav) => fav.id === id && fav.media_type === media_type
    );
  };

  const toggleFavorite = (id: number, media_type: "movie" | "tv") => {
    setFavorites((prevFavorites) => {
      // Esta linha encontra um favorito que tem o MESMO ID e o MESMO TIPO DE MÍDIA.
      const existingFavorite = prevFavorites.find(
        (fav) => fav.id === id && fav.media_type === media_type
      );
      if (existingFavorite) {
        // Se o favorito JÁ existe, ele é removido.
        return prevFavorites.filter(
          (fav) => fav.id !== id || fav.media_type !== media_type
        );
      } else {
        // Se o favorito NÃO existe, ele é adicionado com seu ID e tipo de mídia.
        return [...prevFavorites, { id, media_type }];
      }
    });
  };

  return { favorites, isFavorited, toggleFavorite };
}
