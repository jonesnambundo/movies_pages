import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchMovieDetails, fetchTvDetails } from "../../api/tmdbApi";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

type MediaType = "movie" | "tv";

type CommonDetails = {
  id: number;
  title?: string;
  name?: string;
  tagline?: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  success?: boolean;
};

function DetailsCard({
  title,
  tagline,
  year,
  rating,
  overview,
  poster,
  onBack,
}: {
  title: string;
  tagline?: string;
  year: string;
  rating: number;
  overview: string;
  poster: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-neutral-900/80 backdrop-blur-sm text-white rounded-lg shadow-xl overflow-hidden ring-1 ring-white/10">
      <div className="md:w-1/3 w-full">
        <img src={poster} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 md:w-2/3">
        <h1 className="text-2xl font-bold">{title}</h1>
        {tagline && <p className="text-neutral-300 text-sm mt-1 italic">{tagline}</p>}
        <ul className="mt-4 space-y-1 text-neutral-300 text-sm">
          <li><span className="font-semibold text-white">Ano:</span> {year}</li>
          <li><span className="font-semibold text-white">Avaliação:</span> {rating}</li>
        </ul>
        <p className="mt-4 text-neutral-100 text-sm leading-relaxed">{overview}</p>
        <button
          onClick={onBack}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors" // Corrigido
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default function Detalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const mediaTypeFromQuery = qs.get("type") as MediaType | null;
  const mediaType: MediaType = mediaTypeFromQuery || "movie";

  const [data, setData] = useState<CommonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchDetails = async () => {
      let result;
      if (mediaType === "movie") {
        result = await fetchMovieDetails(Number(id));
      } else {
        result = await fetchTvDetails(Number(id));
      }
      setData(result);
      setLoading(false);
    };
    fetchDetails();
  }, [id, mediaType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center">
        <div className="max-w-4xl mx-auto p-6 w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-72 bg-neutral-800 rounded-lg" />
            <div className="h-6 bg-neutral-800 rounded w-2/3" />
            <div className="h-4 bg-neutral-800 rounded w-1/2" />
            <div className="h-24 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.success === false) {
    return (
      <div className="min-h-screen bg-black flex items-center">
        <div className="max-w-4xl mx-auto p-6 w-full">
          <p className="text-red-400">Não foi possível carregar os detalhes.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded" // Corrigido
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const title = data.title || data.name || "Sem título";
  const date = data.release_date || data.first_air_date || "";
  const year = date.slice(0, 4);
  const rating = Number(data.vote_average?.toFixed(1) || 0);
  const poster = data.poster_path
    ? `${IMG_BASE}${data.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";
  const backdropUrl = data.backdrop_path ? `${BACKDROP_BASE}${data.backdrop_path}` : null;

  return (
    <div
      className="min-h-screen relative flex items-center"
      style={
        backdropUrl
          ? { backgroundImage: `url(${backdropUrl})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }
          : { backgroundColor: "#000" }
      }
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative px-4 py-10 w-full">
        <DetailsCard
          title={title}
          tagline={data.tagline}
          year={year}
          rating={rating}
          overview={data.overview}
          poster={poster}
          onBack={() => navigate(-1)}
        />
      </div>
    </div>
  );
}