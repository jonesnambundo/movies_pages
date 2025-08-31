import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Series from "./pages/Series";
import Favoritos from "./pages/Favoritos";
import MovieDetails from "./pages/Detalhes/MovieDetails";
import Erro from "./pages/Erro";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/series" element={<Series />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/detalhes/:id" element={<MovieDetails />} />
      <Route path="*" element={<Erro />} />
    </Routes>
  );
}
