import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Favoritos from "./pages/Favoritos/Favorites";
import Detalhes from "./pages/Detalhes";
import Erro from "./pages/Erro";
import Search from "./pages/Search/Search";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/series" element={<Series />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Erro />} />
    </Routes>
  );
}