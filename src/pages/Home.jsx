import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";

/**
 * Home - Página inicial do BookFinder
 *
 * Apresenta a marca, slogan e barra de busca centralizada.
 * Layout com dark mode toggle no canto superior direito.
 */
function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors">
      {/* Toggle de tema */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-xl text-center">
          {/* Logo */}
          <h1 className="font-display text-5xl font-semibold text-slate-800 dark:text-slate-50 mb-2 transition-colors">
            BookFinder
          </h1>

          {/* Slogan */}
          <p className="text-[21px] text-slate-700 dark:text-slate-300 mb-8 transition-colors">
            ENCONTRE{" "}
            <span className="font-semibold text-blue-500 dark:text-blue-400">
              QUALQUER
            </span>{" "}
            LIVRO
          </p>

          {/* Barra de busca com filtros */}
          <SearchBar />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
