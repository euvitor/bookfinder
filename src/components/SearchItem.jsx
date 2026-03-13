import { useNavigate } from "react-router-dom";
import { getBestBookCover } from "../utils/imageHelpers";

/**
 * SearchItem - Card de livro na lista de resultados
 *
 * Exibe capa, título, autor, ano, páginas e avaliação do livro.
 * Ao clicar, redireciona para detalhes passando o objeto book via state.
 *
 * @param {string} id - ID único do livro (Google Books ID)
 * @param {string} title - Título do livro
 * @param {string} author - Autor(es) formatado
 * @param {object} book - Objeto completo do livro da API
 * @param {boolean} isListView - Define layout: lista ou grid
 */
function SearchItem({ id, title, author, book, isListView }) {
  const navigate = useNavigate();
  const { volumeInfo } = book;

  /**
   * handleClick - Redireciona para página de detalhes com dados do livro
   * Usa location.state para evitar nova requisição à API
   */
  const handleClick = () => {
    navigate(`/details/${id}`, { state: { book } });
  };

  // Apenas o ano da string de data (ex: "2003-07-21" → "2003")
  const year = volumeInfo.publishedDate?.split("-")[0];

  // Dados opcionais (exibidos apenas quando disponíveis)
  const rating = volumeInfo.averageRating;
  const pages = volumeInfo.pageCount;

  // === MODO LISTA ===
  if (isListView) {
    return (
      <div
        onClick={handleClick}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex gap-3 p-2 group"
      >
        {/* Capa pequena */}
        <img
          src={getBestBookCover(volumeInfo.imageLinks)}
          alt={title}
          className="w-12 h-16 object-cover rounded shrink-0"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ESem capa%3C/text%3E%3C/svg%3E";
          }}
          loading="lazy"
        />

        {/* Informações */}
        <div className="flex flex-col justify-center min-w-0 gap-0.5">
          <h3 className="font-display text-sm font-semibold text-gray-900 dark:text-slate-50 line-clamp-1 leading-tight">
            {title}
          </h3>
          <p className="font-sans text-xs text-gray-600 dark:text-slate-400 line-clamp-1">
            {author}{year && ` · ${year}`}{pages && ` · ${pages} págs.`}
          </p>

          {/* Estrelas (apenas se tiver avaliação) */}
          {rating && (
            <div className="flex items-center gap-1 mt-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-3 h-3"
                  fill={star <= Math.round(rating) ? "#f59e0b" : "none"}
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
              <span className="text-[10px] text-gray-500 dark:text-slate-400">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === MODO GRID ===
  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Capa (aspect ratio 2:3 fixo) */}
      <div className="relative aspect-2/3 bg-gray-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={getBestBookCover(volumeInfo.imageLinks)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ESem capa%3C/text%3E%3C/svg%3E";
          }}
          loading="lazy"
        />
      </div>

      {/* Informações */}
      <div className="p-2 sm:p-3 lg:p-4">
        <h3 className="font-display text-[12px] sm:text-sm lg:text-base font-semibold text-gray-900 dark:text-slate-50 mb-0.5 sm:mb-1 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Autor + Ano */}
        <p className="font-sans text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-slate-400 line-clamp-1">
          {author}{year && ` · ${year}`}
        </p>

        {/* Avaliação numérica (apenas se disponível) */}
        {rating && (
          <p className="text-[10px] sm:text-xs text-amber-500 font-medium mt-0.5">
            ★ {rating.toFixed(1)}
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchItem;
