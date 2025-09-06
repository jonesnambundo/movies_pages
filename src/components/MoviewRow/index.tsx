import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard";
import { URLS } from "../../api/tmdbApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

type MovieRowProps = {
  title: string;
  subtitle?: string;
  fetchUrl: string;
  id?: string;
  limit?: number;
};

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
    navigate(`/detalhes/${id}?type=movie`);
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

export default MovieRow;