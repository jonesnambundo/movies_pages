import React from "react";
import SearchBar from "../../components/SearchBar";
import MovieRow from "../../components/MoviewRow";
import { URLS } from "../../api/tmdbApi";

export default function Home() {
  return (
    <>
      <SearchBar />
      <MovieRow
        id="trending"
        title="Em alta nesta semana"
        subtitle="Fique por dentro do que todo mundo está assistindo"
        fetchUrl={URLS.TRENDING_MOVIE}
      />
      <MovieRow
        id="popular"
        title="Popular"
        subtitle="Os filmes mais populares do momento"
        fetchUrl={URLS.POPULAR_MOVIE}
      />
      <MovieRow
        id="top-rate"
        title="Top Rated"
        subtitle="Os filmes mais bem avaliados"
        fetchUrl={URLS.TOP_RATED_MOVIE}
      />
    </>
  );
}