import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

function Header() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 pb-8 bg-linear-to-b from-white via-white/75 to-white/0 dark:from-slate-900 dark:via-slate-900/75 dark:to-slate-900/0">
      {/* Navbar superior */}
      <div className="flex items-center justify-between">
        {/* Botão Voltar */}
        <button
          type="button"
          onClick={handleBack}
          className="p-2 rounded-md text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Voltar para a página anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Logo / Título */}
        <button
          type="button"
          onClick={goHome}
          className="font-display text-2xl font-semibold text-slate-800 dark:text-slate-50 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          BookFinder
        </button>

        {/* Botão de tema */}
        <ThemeToggle />
      </div>

      {/* Barra de busca */}
      <SearchBar />
    </header>
  );
}

export default Header;
