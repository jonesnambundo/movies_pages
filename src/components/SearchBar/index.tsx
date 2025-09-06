import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/images/banner-homem-aranha.png"
import { URLS } from "../../api/tmdbApi";

const TRENDING_URL = URLS.TRENDING_MOVIE;

export default function SearchBar() {
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const res = await fetch(TRENDING_URL);
        const data = await res.json();
        const items = (data?.results || []).filter(
          (i: any) => i?.backdrop_path
        );
        if (!items.length || canceled) return;
        const pick = items[Math.floor(Math.random() * items.length)];
        const url = `https://image.tmdb.org/t/p/original${pick.backdrop_path}`;
        if (!canceled) setBgUrl(url);
      } catch (e) {
        console.error("Erro ao buscar imagem de fundo TMDB:", e);
      }
    })();
    return () => {
      canceled = true;
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen bg-neutral-900 bg-cover bg-center transition-all duration-300"
      style={{ backgroundImage: `url(${bgUrl || bannerImg})` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-purple-500 drop-shadow-lg">
          Filmes & Séries
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-neutral-100">
          Lista de Filmes e Séries baseada na API The Movie DB. <br /> Confira
          as produções mais populares do mundo.
        </p>
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar filmes ou séries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-neutral-800/80 text-white px-4 py-3 pr-12 rounded-full text-lg w-full focus:w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition duration-300"
            aria-label="Buscar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}