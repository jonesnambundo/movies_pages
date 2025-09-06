import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { URLS } from "../../api/tmdbApi";
import MovieCard from "../../components/MovieCard";


interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const fetchResults = async () => {
      try {
        const response = await fetch(`${URLS.SEARCH}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        const filteredResults = data.results.filter(
          (item: SearchResult) => item.media_type !== "person" && item.poster_path
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const handleDetails = (id: number, type: "movie" | "tv") => {
    navigate(`/detalhes/${id}?type=${type}`);
  };

  return (
    <div className="pt-28 pb-12 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-200">Resultados da busca por: "{query}"</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm"
        >
          Voltar
        </button>
      </div>

      <p className="text-neutral-300 mt-2">
        {loading ? "Carregando..." : `${results.length} resultados encontrados.`}
      </p>

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {results.map((item) => (
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