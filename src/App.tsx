import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/detalhes/");
  const isFavoritesOrSearch = location.pathname === "/favoritos" || location.pathname === "/search";

  const showHeader = !isDetailsPage && !isFavoritesOrSearch;
  const showFooter = !isDetailsPage;

  return (
    <div className="min-h-screen text-white bg-black">
      {showHeader && <Header />}
      <main className={showHeader ? "pt-20" : ""}>
        <AppRoutes />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}