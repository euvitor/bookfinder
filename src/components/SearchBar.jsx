import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomCombobox from "./CustomCombobox";

/**
 * SearchBar - Barra de busca com filtros expansíveis
 *
 * Permite buscar livros por título, autor ou ISBN.
 * Filtros opcionais: idioma e gênero.
 * Redireciona para /results com query params.
 */
function SearchBar() {
  // Estados de filtros
  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLang, setSearchLang] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const searchWrapperRef = useRef(null);

  // Placeholders dinâmicos por tipo de busca
  const placeholders = {
    title: "Digite o título do livro",
    author: "Digite o nome autor",
    isbn: "Digite o ISBN",
  };

  const navigate = useNavigate();

  /**
   * handleSearch - Processa busca e redireciona para página de resultados
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(
      `/results?q=${searchTerm}&type=${searchType}&lang=${searchLang}&genre=${searchGenre}`,
    );
  };

  // Fecha painel de filtros ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      const wrapper = searchWrapperRef.current;
      if (!wrapper || wrapper.contains(event.target)) {
        return;
      }
      // Ignora cliques dentro do CustomCombobox
      if (
        event.target.closest("[data-combobox-options]") ||
        event.target.closest("[data-combobox-option]")
      ) {
        return;
      }
      setShowFilter(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchWrapperRef}
      className="w-full max-w-xl mx-auto mt-2 px-4 relative"
    >
      <form onSubmit={handleSearch}>
        {/* Barra de busca principal */}
        <div className="border border-white/20 dark:border-slate-700/30 rounded-xl p-1 flex gap-1 backdrop-blur-md bg-white/60 dark:bg-slate-800/40 shadow-lg shadow-gray-200/50 dark:shadow-slate-950/50 focus-within:border-blue-400/40 dark:focus-within:border-blue-500/40 focus-within:ring-2 focus-within:ring-blue-200/30 dark:focus-within:ring-blue-900/30 transition-all duration-200">
          {/* Botão toggle de filtros */}
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className={`flex-none rounded-lg p-2 transition-all duration-200 ${
              showFilter
                ? "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-500/10 dark:hover:bg-slate-600/30 text-gray-600 dark:text-slate-400"
            }`}
            aria-label="Toggle filters"
            aria-expanded={showFilter}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>

          {/* Input de busca */}
          <input
            type="text"
            className="flex-1 px-2 py-1 outline-none bg-transparent text-gray-800 dark:text-slate-100 placeholder:text-gray-500/70 dark:placeholder:text-slate-400/70 font-medium"
            placeholder={placeholders[searchType]}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />

          {/* Botão de buscar */}
          <button
            type="submit"
            className="flex-none rounded-lg p-2 bg-white/40 dark:bg-slate-700/40 text-gray-700 dark:text-slate-300 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 active:bg-blue-500 active:text-white transition-all duration-200"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        {/* Painel de Filtros (expansível) */}
        {showFilter && (
          <div className="absolute top-full left-0 right-0 mt-1 px-4 z-10 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="border border-white/20 dark:border-slate-700/30 rounded-xl p-3 backdrop-blur-lg bg-white/70 dark:bg-slate-800/60 shadow-xl shadow-gray-400/20 dark:shadow-slate-950/50">
              {/* Botões de tipo de busca (Título/Autor/ISBN) */}
              <div className="flex rounded-lg mb-3 gap-2">
                {[
                  {
                    type: "title",
                    label: "Título",
                    icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
                  },
                  {
                    type: "author",
                    label: "Autor",
                    icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
                  },
                  {
                    type: "isbn",
                    label: "ISBN",
                    icon: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z",
                  },
                ].map(({ type, label, icon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSearchType(type)}
                    className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      searchType === type
                        ? "bg-blue-500 dark:bg-blue-600 text-white shadow-md"
                        : "bg-white/50 dark:bg-slate-700/50 hover:bg-gray-200/60 dark:hover:bg-slate-600/60 text-gray-700 dark:text-slate-300"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={icon}
                      />
                    </svg>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Filtros de Idioma e Gênero */}
              <div className="flex gap-2">
                <CustomCombobox
                  label="Idioma"
                  value={searchLang}
                  onChange={setSearchLang}
                  options={[
                    { value: "", label: "Todas as línguas" },
                    { value: "pt-br", label: "Português" },
                    { value: "en", label: "Inglês" },
                    { value: "es", label: "Espanhol" },
                    { value: "fr", label: "Francês" },
                  ]}
                />
                <CustomCombobox
                  label="Gênero"
                  value={searchGenre}
                  onChange={setSearchGenre}
                  options={[
                    { value: "", label: "Todos os gêneros" },
                    { value: "fantasy", label: "Fantasia" },
                    { value: "action", label: "Ação" },
                    { value: "romance", label: "Romance" },
                    { value: "horror", label: "Terror" },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
