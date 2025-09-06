import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { fetchMovieDetails, fetchTvDetails } from "../../api/tmdbApi";
import MovieCard from "../../components/MovieCard";

interface FavoriteItem {
  id: number;
  media_type: "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export default function Favoritos() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [favoriteDetails, setFavoriteDetails] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllDetails = async () => {
      setLoading(true);
      const detailsPromises = favorites.map(async (fav) => {
        if (fav.media_type === "movie") {
          return fetchMovieDetails(fav.id);
        } else {
          return fetchTvDetails(fav.id);
        }
      });
      const allDetails = await Promise.all(detailsPromises);
      const validDetails = allDetails.filter(Boolean);
      setFavoriteDetails(validDetails as FavoriteItem[]);
      setLoading(false);
    };

    if (favorites.length > 0) {
      fetchAllDetails();
    } else {
      setFavoriteDetails([]);
      setLoading(false);
    }
  }, [favorites]);

  const handleDetails = (id: number, type: "movie" | "tv") => {
    navigate(`/detalhes/${id}?type=${type}`);
  };

  return (
    <div className="pt-28 pb-12 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-200">Favoritos</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
        >
          Voltar
        </button>
      </div>

      <p className="text-neutral-300 mt-2">
        Sua lista de filmes e séries favoritos.
      </p>

      {loading ? (
        <p className="text-center mt-8 text-neutral-400">Carregando...</p>
      ) : favorites.length === 0 ? (
        <p className="text-center mt-8 text-neutral-400">
          Você ainda não tem nenhum favorito.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
          {favoriteDetails.map((item) => (
            <div key={item.id} className="w-full">
              <MovieCard
                movie={{
                  id: item.id,
                  title: item.title || item.name || "Título desconhecido",
                  poster_path: item.poster_path,
                  vote_average: item.vote_average,
                  release_date: item.release_date || item.first_air_date || "",
                }}
                onDetails={() => handleDetails(item.id, item.media_type)}
                mediaType={item.media_type}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}