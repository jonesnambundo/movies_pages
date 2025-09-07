import { useEffect, useState } from "react";
import TvRow from "../../components/TvRow";
import { URLS } from "../../api/tmdbApi";

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export default function Series() {
  const [backdrop, setBackdrop] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBackdrop() {
      try {
        const res = await fetch(URLS.POPULAR_TV);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const random =
            data.results[Math.floor(Math.random() * data.results.length)];
          setBackdrop(`${BACKDROP_BASE}${random.backdrop_path}`);
        }
      } catch (error) {
        console.error("Erro ao buscar backdrop:", error);
      }
    }
    fetchBackdrop();
  }, []);

  return (
    <div className="pb-12">
      {/* Hero com fundo aleatório */}
      <div
        className="container mx-auto px-4 mb-0 relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: backdrop ? `url(${backdrop})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* camada de escurecimento */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 py-20 md:py-28">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-200">
            Séries
          </h1>
          <p className="text-neutral-200 mt-6 max-w-2xl text-lg md:text-xl leading-relaxed">
            Descubra o que está em alta, o que é popular e as séries melhor
            avaliadas.
          </p>
        </div>
      </div>

      {/* Listas de séries */}
      <TvRow
        id="tv-trending"
        title="Em alta"
        subtitle="O que todo mundo está assistindo esta semana"
        fetchUrl={URLS.TRENDING_TV}
      />
      <TvRow
        id="tv-popular"
        title="Populares"
        subtitle="As séries mais populares do momento"
        fetchUrl={URLS.POPULAR_TV}
      />
      <TvRow
        id="tv-top-rated"
        title="Top Rated"
        subtitle="As séries mais bem avaliadas"
        fetchUrl={URLS.TOP_RATED_TV}
      />
    </div>
  );
}
