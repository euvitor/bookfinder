import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomCombobox from "./CustomCombobox";
import { useRef } from "react";

function SearchBar() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLang, setSearchLang] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const searchWrapperRef = useRef(null);

  const placeholders = {
    title: "Digite o título do livro",
    author: "Digite o nome autor",
    isbn: "Digite o ISBN",
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(
      `/results?q=${searchTerm}&type=${searchType}&lang=${searchLang}&genre=${searchGenre}`,
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const wrapper = searchWrapperRef.current;
      if (!wrapper || wrapper.contains(event.target)) {
        return;
      }
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
      className="w-full max-w-xl mx-auto mt-8 px-4 relative"
    >
      <form onSubmit={handleSearch}>
        {/* Search Input */}
        <div className="border-2 border-gray-200 rounded-lg p-1 flex gap-1 bg-white shadow-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-200 transition">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className={`flex-none rounded-md p-2 ${showFilter ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-600"}`}
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

          <input
            type="text"
            className="flex-1 px-2 py-1 outline-none text-gray-700 placeholder:text-gray-400"
            placeholder={placeholders[searchType]}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />

          <button
            type="submit"
            className="flex-none rounded-md p-2 bg-white text-gray-600 hover:bg-gray-100 active:bg-blue-500 active:text-white"
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

        {/* Filters */}
        {showFilter && (
          <div className="absolute top-full left-0 right-0 mt-1 px-4 z-10 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="border-2 border-gray-200 rounded-lg p-1 bg-white shadow-md">
              {/* Search Type Buttons */}
              <div className="flex rounded-md mb-2 gap-2">
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
                    className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
                      searchType === type
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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

              {/* Select Dropdowns */}
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
