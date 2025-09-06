import React from "react";
import { Link } from "react-router-dom";

export default function Erro() {
  return (
    <div className="min-h-screen bg-black flex items-center">
      <div className="max-w-2xl mx-auto p-6 w-full text-center text-white">
        <h1 className="text-5xl font-extrabold text-amber-400">404</h1>
        <p className="mt-4 text-neutral-300">Página não encontrada.</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}