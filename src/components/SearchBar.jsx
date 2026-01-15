import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLang, setSearchLang] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const placeholders = {
    title: 'Digite o título do livro',
    author: 'Digite o nome autor',
    isbn: 'Digite o ISBN'
  }

  const navigate = useNavigate();
  

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/results?q=${searchTerm}&type=${searchType}&lang=${searchLang}&genre=${searchGenre}`
    );
  };

  return (
    <form onSubmit={handleSearch} className="w-sm m-auto mt-8">
      {/* Search Input */}
      <div className="border-2 border-gray-300 rounded-lg p-1 flex gap-1 mb-2">
        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="flex-none rounded-md p-2 hover:bg-gray-100 text-gray-600 transition"
          aria-label="Toggle filters"
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
        />

        <button
          type="submit"
          className="flex-none rounded-md p-2 hover:bg-blue-500 text-gray-600 hover:text-white transition"
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
      <div
        className={`border-2 border-gray-300 rounded-lg p-2 transition-all duration-200 ${
          showFilter ? "block" : "hidden"
        }`}
      >
        {/* Search Type Buttons */}
        <div className="flex rounded-md mb-2 gap-1">
          <button
            type="button"
            onClick={() => setSearchType("title")}
            className={`flex flex-1 items-center justify-center gap-1 px-2 py-1.5 rounded-md text-sm transition ${
              searchType === "title"
                ? "bg-blue-100 text-blue-700"
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span>Título</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchType("author")}
            className={`flex flex-1 items-center justify-center gap-1 px-2 py-1.5 rounded-md text-sm transition ${
              searchType === "author"
                ? "bg-blue-100 text-blue-700"
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span>Autor</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchType("isbn")}
            className={`flex flex-1 items-center justify-center gap-1 px-2 py-1.5 rounded-md text-sm transition ${
              searchType === "isbn"
                ? "bg-blue-100 text-blue-700"
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
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
              />
            </svg>
            <span>ISBN</span>
          </button>
        </div>

        {/* Select Dropdowns */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <label htmlFor="langSelect" className="sr-only">Idioma</label>
            <select
              id="langSelect"
              onChange={(e) => setSearchLang(e.target.value)}
              className="w-full appearance-none border-2 border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Todas as línguas</option>
              <option value="pt-br">Português</option>
              <option value="en">Inglês</option>
              <option value="es">Espanhol</option>
              <option value="fr">Francês</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          <div className="flex-1 relative">
            <label htmlFor="genreSelect" className="sr-only">Gênero</label>
            <select
              id="genreSelect"
              onChange={(e) => setSearchGenre(e.target.value)}
              className="w-full appearance-none border-2 border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Todos os gêneros</option>
              <option value="fantasy">Fantasia</option>
              <option value="action">Ação</option>
              <option value="romance">Romance</option>
              <option value="horror">Terror</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
