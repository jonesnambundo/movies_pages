
function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#" className="inline-block mb-6">
              <span className="text-purple-500 font-bold text-2xl">
                Movie<span className="text-white">Art</span>
              </span>
            </a>
            <p className="mb-4 text-sm">
              Descubra e explore os filmes mais recentes do mundo todo. 
              O MoviArt dá acesso a uma vasta coleção de filmes de 
              todos os gêneros.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#trending"
                  className="hover:text-purple-400 transition-all"
                >
                  Trending
                </a>
              </li>
              <li>
                <a
                  href="#popular"
                  className="hover:text-purple-400 transition-all"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href="#top-rated"
                  className="hover:text-purple-400 transition-all"
                >
                  Top Rated
                </a>
              </li>
              <li>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Ajuda
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Fique por dentro dos últimos filmes e notícias
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-neutral-800 border-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                />
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all text-sm">
                Inscreva -se 
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-xs">
            &copy; MoviArt. All rights reserved.
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            Powered by{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 transition-all"
            >
              TMDB API
            </a>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
            <a href="#" className="hover:text-purple-400 transition-all">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-purple-400 transition-all">
              Termos de Serviço
            </a>
            <a href="#" className="hover:text-purple-400 transition-all">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
