import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import SearchItem from "../components/SearchItem";
import { searchBooks } from "../api/books";

/**
 * Results - Página de resultados de busca
 *
 * Exibe lista de livros com base nos parâmetros da URL (query, type, lang, genre).
 * Implementa paginação com botão "Carregar Mais" (load more pattern).
 *
 * Query params esperados:
 * - q: termo de busca
 * - type: "title" | "author" | "isbn"
 * - lang: código do idioma (opcional)
 * - genre: gênero/categoria (opcional)
 */
function Results() {
  // Estados principais
  const [books, setBooks] = useState([]); // Array acumulativo de livros
  const [loading, setLoading] = useState(true); // Loading inicial
  const [loadingMore, setLoadingMore] = useState(false); // Loading do botão "carregar mais"
  const [error, setError] = useState(null);

  // Controles de paginação
  const [startIndex, setStartIndex] = useState(0); // Índice atual na API
  const [hasMore, setHasMore] = useState(true); // Ainda tem mais resultados?
  const [totalItems, setTotalItems] = useState(0); // Total de resultados disponíveis

  const [searchParams] = useSearchParams();
  const itemsPerPage = 20;
  const [isGridView, setIsGridView] = useState(() => {
    return localStorage.getItem("viewMode") !== "list"; // Lazy initialization: lê do localStorage na montagem
  });
  const handleViewToggle = () => {
    setIsGridView((prev) => {
      const next = !prev;
      localStorage.setItem("viewMode", next ? "grid" : "list");
      return next;
    });
  };
  /**
   * fetchBooks - Busca livros na API
   *
   * @param {number} index - Índice inicial (startIndex) para a API
   * @param {boolean} append - Se true, adiciona aos livros existentes; se false, substitui
   */
  const fetchBooks = async (index = 0, append = false) => {
    const query = searchParams.get("q");
    const type = searchParams.get("type") || "title";
    const lang = searchParams.get("lang");
    const genre = searchParams.get("genre");

    if (!query) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      // Define qual loading ativar (inicial ou "carregar mais")
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await searchBooks({
        q: query,
        type,
        lang,
        genre,
        maxResults: itemsPerPage,
        startIndex: index,
      });

      const newBooks = data.items || [];

      // Append: adiciona aos existentes | Replace: substitui tudo
      if (append) {
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      } else {
        setBooks(newBooks);
      }

      // Atualiza controles de paginação
      setTotalItems(data.totalItems || 0);
      setHasMore(
        newBooks.length === itemsPerPage &&
          index + itemsPerPage < (data.totalItems || 0),
      );
      setStartIndex(index + itemsPerPage);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
      setError(err.message || "Erro ao buscar livros");
      if (!append) {
        setBooks([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Busca inicial - reseta tudo quando os parâmetros de busca mudam
  useEffect(() => {
    setBooks([]);
    setStartIndex(0);
    setHasMore(true);
    setError(null);
    fetchBooks(0, false);
  }, [searchParams]);

  /**
   * handleLoadMore - Carrega próxima página de resultados
   * Adiciona novos livros ao array existente
   */
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchBooks(startIndex, true);
    }
  };

  // === ESTADOS DE UI ===

  // Loading inicial
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-slate-400">
              Buscando livros...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Erro na busca
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Tentar novamente
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Estado sem resultados
  if (books.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-2">
              Nenhum livro encontrado
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              Tente buscar com outros termos ou filtros
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Resultado com livros
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
      <Header />
      <main className="flex-1 w-full px-4 py-8">
        {/* Contador + Toggle de visualização */}
        <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
          <p className="text-gray-600 dark:text-slate-400 text-sm">
            Mostrando {books.length} de {totalItems.toLocaleString()}{" "}
            {books.length === 1 ? "livro" : "livros"}
          </p>

          {/* Botões Grid/Lista */}
          <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm">
            {/* Botão Grid */}
            <button
              onClick={() => !isGridView && handleViewToggle()}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                isGridView
                  ? "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-500/10 dark:hover:bg-slate-600/30 text-gray-600 dark:text-slate-400"
              }`}
              aria-label="Visualização em grade"
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
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </button>

            {/* Botão Lista */}
            <button
              onClick={() => isGridView && handleViewToggle()}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                !isGridView
                  ? "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-500/10 dark:hover:bg-slate-600/30 text-gray-600 dark:text-slate-400"
              }`}
              aria-label="Visualização em lista"
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
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid ou Lista de livros */}
        <div
          className={`max-w-7xl mx-auto mb-8 ${
            isGridView
              ? "grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6"
              : "flex flex-col gap-2"
          }`}
        >
          {books.map((book) => (
            <SearchItem
              key={book.id}
              id={book.id}
              image={book.volumeInfo.imageLinks?.thumbnail}
              title={book.volumeInfo.title}
              author={
                book.volumeInfo.authors?.join(", ") || "Autor Desconhecido"
              }
              book={book}
              isListView={!isGridView} // ← prop nova para o SearchItem
            />
          ))}
        </div>

        {/* Botão "Carregar Mais" */}
        {hasMore && (
          <div className="max-w-7xl mx-auto flex justify-center pb-8">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 hover:bg-gray-500/5 dark:hover:bg-slate-600/30 text-gray-600 dark:text-slate-400 disabled:bg-gray-400/10 font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Carregando...</span>
                </>
              ) : (
                <>
                  <span>Carregar mais livros</span>
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* Mensagem de fim dos resultados */}
        {!hasMore && books.length > 0 && (
          <div className="max-w-7xl mx-auto text-center pb-8">
            <p className="text-gray-500 dark:text-slate-500 text-sm">
              Todos os resultados foram carregados ({books.length} livros)
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Results;
