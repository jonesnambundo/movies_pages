import React from "react";
import TvRow from "../../components/TvRow";
import { URLS } from "../../api/tmdbApi";

export default function Series() {
  return (
    <div className="pt-28 pb-12">
      <div className="container mx-auto px-4 mb-4">
        <h1 className="text-3xl font-bold text-amber-200">Séries</h1>
        <p className="text-neutral-300 mt-2">
          Descubra o que está em alta, o que é popular e as séries melhor avaliadas.
        </p>
      </div>

      <TvRow
        id="tv-trending"
        title="Em alta (Séries)"
        subtitle="O que todo mundo está assistindo esta semana"
        fetchUrl={URLS.TRENDING_TV}
      />
      <TvRow
        id="tv-popular"
        title="Populares (Séries)"
        subtitle="As séries mais populares do momento"
        fetchUrl={URLS.POPULAR_TV}
      />
      <TvRow
        id="tv-top-rated"
        title="Top Rated (Séries)"
        subtitle="As séries mais bem avaliadas"
        fetchUrl={URLS.TOP_RATED_TV}
      />
    </div>
  );
}