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
    <header className="w-full px-4 pt-3 pb-4 border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between">
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

        <button
          type="button"
          onClick={goHome}
          className="font-display text-2xl font-semibold text-slate-800 dark:text-slate-50 tracking-tight"
        >
          BookFinder
        </button>

        <ThemeToggle />
      </div>
      <SearchBar />
    </header>
  );
}

export default Header;
