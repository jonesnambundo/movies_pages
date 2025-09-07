import SearchBar from "../../components/SearchBar";
import MovieRow from "../../components/MoviewRow"; 
import { URLS } from "../../api/tmdbApi";

export default function Home() {
  return (
    <>
      <SearchBar />

      {/* Seção Trending */}
      <section id="trending" className="scroll-mt-28">
        <MovieRow
          title="Em alta nesta semana"
          subtitle="Fique por dentro do que todo mundo está assistindo"
          fetchUrl={URLS.TRENDING_MOVIE}
        />
      </section>

      {/* Seção Popular */}
      <section id="popular" className="scroll-mt-28">
        <MovieRow
          title="Popular"
          subtitle="Os filmes mais populares do momento"
          fetchUrl={URLS.POPULAR_MOVIE}
        />
      </section>

      {/* Seção Top Rated */}
      <section id="top-rated" className="scroll-mt-28">
        <MovieRow
          title="Top Rated"
          subtitle="Os filmes mais bem avaliados"
          fetchUrl={URLS.TOP_RATED_MOVIE}
        />
      </section>
    </>
  );
}
