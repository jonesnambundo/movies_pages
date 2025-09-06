import React from "react";
import { useFavorites } from "../../hooks/useFavorites";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
  onDetails?: (id: number) => void;
  mediaType: "movie" | "tv";
}

function MovieCard({ movie, onDetails, mediaType }: MovieCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  const isFav = isFavorited(movie.id, mediaType);

  return (
    <div className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[240px] snap-start">
      <div
        className="relative group rounded-xl overflow-hidden bg-neutral-800"
      >
        <div className="relative aspect-[2/3]">
          <img
            src={poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="pointer-events-none absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="pointer-events-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onDetails?.(movie.id);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
        <h3 className="text-neutral-400 text-sm font-medium truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.463c.969 0 1.371 1.241.588 1.81l-2.803 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.834-2.034a1 1 0 00-1.175 0L6.12 16.282c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.484 8.72c-.783-.57-.38-1.81.588-1.81H6.535a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            <span className="text-neutral-400 text-xs">{movie.vote_average?.toFixed(1)}</span>
          </div>
          <span className="text-neutral-400 text-xs">{(movie.release_date || "").slice(0, 4)}</span>
          <button
            className="p-1 rounded-full text-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id, mediaType);
            }}
            aria-label="Favoritar"
            title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${isFav ? "text-red-500 fill-current" : "text-purple-600"}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.61h.56C13.09 5.01 14.76 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;