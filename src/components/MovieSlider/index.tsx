import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "f975b4f5e10040b0ed800db3826ac8bc";
const TMDB_BASE = "https://api.themoviedb.org/3";

const URLS = {
  TRENDING: `${TMDB_BASE}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`,
  POPULAR: `${TMDB_BASE}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
  TOP_RATED: `${TMDB_BASE}/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
};

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
}

type MovieRowProps = {
  title: string;
  subtitle?: string;
  fetchUrl: string;
  id?: string;
  limit?: number;
};

function MovieCard({ movie, onDetails }: MovieCardProps) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <div className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[240px] snap-start">
      <div
        className="relative group cursor-pointer rounded-xl overflow-hidden bg-neutral-800"
        onClick={() => onDetails?.(movie.id)}
      >
        <div className="relative aspect-[2/3]">
          <img
            src={poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
          <button
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-2 rounded-full text-red-500 transition-all"
            onClick={(e) => e.stopPropagation()}
            aria-label="Favoritar"
            title="Favoritar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                       2 6 4 4 6.5 4c1.74 0 3.41 1.01 
                       4.22 2.61h.56C13.09 5.01 14.76 4 
                       16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 
                       6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

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
        <h3 className="text-amber-500 text-sm font-medium truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.463c.969 0 1.371 1.241.588 1.81l-2.803 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.834-2.034a1 1 0 00-1.175 0L6.12 16.282c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.484 8.72c-.783-.57-.38-1.81.588-1.81H6.535a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-500 text-xs">{movie.vote_average?.toFixed(1)}</span>
          </div>
          <span className="text-neutral-400 text-xs">{(movie.release_date || "").slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
}

function MovieRow({ title, subtitle, fetchUrl, id, limit = 18 }: MovieRowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return;
        setMovies((data?.results || []).slice(0, limit));
      })
      .catch(console.error);
    return () => { alive = false; };
  }, [fetchUrl, limit]);

  const scrollBy = (offset: number) => {
    trackRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleDetails = (id: number) => {
    navigate(`/detalhes/${id}?type=movie`); // 👈 mesma rota, indica "movie"
    // ou: navigate(`/detalhes/${id}`, { state: { mediaType: "movie" } });
  };

  return (
    <section className="py-12" id={id}>
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-200">{title}</h2>
            {subtitle && <p className="text-neutral-400 text-sm mt-1">{subtitle}</p>}
          </div>

          <div className="flex space-x-2">
            <button
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
              aria-label="Scroll left"
              onClick={() => scrollBy(-360)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
              aria-label="Scroll right"
              onClick={() => scrollBy(360)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div ref={trackRef} className="no-scrollbar flex space-x-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} onDetails={handleDetails} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MoviesHome() {
  return (
    <>
      <MovieRow
        id="trending"
        title="Em alta nesta semana"
        subtitle="Fique por dentro do que todo mundo está assistindo"
        fetchUrl={URLS.TRENDING}
      />
      <MovieRow
        id="popular"
        title="Popular"
        subtitle="Os filmes mais populares do momento"
        fetchUrl={URLS.POPULAR}
      />
      <MovieRow
        id="top-rate"
        title="Top Rated"
        subtitle="Os filmes mais bem avaliados"
        fetchUrl={URLS.TOP_RATED}
      />
    </>
  );
}
