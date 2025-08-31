import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./AppRoutes";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white bg-black">
        <Header />
        <main className="pt-20">
          {/* espaço por causa do header fixo */}
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
