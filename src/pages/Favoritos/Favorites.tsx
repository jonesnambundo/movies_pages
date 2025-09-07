import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { fetchMovieDetails, fetchTvDetails } from "../../api/tmdbApi";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

interface FavoriteItem {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

function FavoriteCard({
  item,
  onDetails,
}: {
  item: FavoriteItem;
  onDetails: () => void;
}) {
  const title = item.title || item.name || "Título desconhecido";
  const date = item.release_date || item.first_air_date || "";
  const year = date.slice(0, 4);
  const rating = Number(item.vote_average?.toFixed(1) || 0);
  const poster = item.poster_path
    ? `${IMG_BASE}${item.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <div className="w-full">
      <div className="relative group rounded-xl overflow-hidden bg-neutral-800">
        <div className="relative aspect-[2/3]">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />

          {/* Overlay e botão de detalhes */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="pointer-events-none absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="pointer-events-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onDetails();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Ver detalhes
            </button>
          </div>
        </div>
      </div>

      <div className="px-1 pt-3">
        <h3 className="text-neutral-200 text-sm font-medium truncate">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.463c.969 0 1.371 1.241.588 1.81l-2.803 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.834-2.034a1 1 0 00-1.175 0L6.12 16.282c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.484 8.72c-.783-.57-.38-1.81.588-1.81H6.535a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            <span className="text-neutral-300 text-xs">{rating.toFixed(1)}</span>
          </div>
          <span className="text-neutral-400 text-xs">{year}</span>
        </div>
      </div>
    </div>
  );
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
        try {
          const data =
            fav.media_type === "movie"
              ? await fetchMovieDetails(fav.id)
              : await fetchTvDetails(fav.id);

          if (!data) return null;

          // Reanexa o media_type original do favorito
          return {
            ...data,
            media_type: fav.media_type,
          } as FavoriteItem;
        } catch (e) {
          console.error("Erro ao carregar detalhe:", fav, e);
          return null;
        }
      });

      const allDetails = await Promise.all(detailsPromises);
      const validDetails = allDetails.filter(Boolean) as FavoriteItem[];
      setFavoriteDetails(validDetails);
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
            <FavoriteCard
              key={`${item.media_type}-${item.id}`}
              item={item}
              onDetails={() => handleDetails(item.id, item.media_type)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
