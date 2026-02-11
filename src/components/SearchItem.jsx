import { useNavigate } from "react-router-dom";
import { getBestBookCover } from "../utils/imageHelpers";

/**
 * SearchItem - Card de livro na lista de resultados
 *
 * @param {string} id - ID do livro
 * @param {string} image - URL thumbnail (não usado mais, usamos book completo)
 * @param {string} title - Título do livro
 * @param {string} author - Autor(es)
 * @param {object} book - Objeto completo do livro (para passar ao Details)
 */

function SearchItem({ id, title, author, book }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`, {
      state: { book },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Capa com aspect ratio fixo */}
      <div className="relative aspect-2/3 bg-gray-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={getBestBookCover(book.volumeInfo.imageLinks)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ESem capa%3C/text%3E%3C/svg%3E";
          }}
          loading="lazy"
        />
      </div>

      {/* Info do livro */}
      <div className="p-4">
        <h3 className="font-displayfont-display text-base font-semibold text-gray-900 dark:text-slate-50 mb-1 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="font-sans text-sm text-gray-600 dark:text-slate-400 line-clamp-1">
          {author}
        </p>
      </div>
    </div>
  );
}

export default SearchItem;
