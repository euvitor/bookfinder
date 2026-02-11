import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import SearchItem from "../components/SearchItem";
import { searchBooks } from "../api/books";

function Results() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      const query = searchParams.get("q");
      const type = searchParams.get("type") || "title";
      const lang = searchParams.get("lang");
      const genre = searchParams.get("genre");

      // Limpa resultados quando não tiver query
      if (!query) {
        if (isActive) {
          setBooks([]);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await searchBooks({
          q: query,
          type,
          lang,
          genre,
          maxResults: 30,
        });

        if (isActive) {
          setBooks(data.items || []);
        }
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        if (isActive) {
          setError(err.message || "Erro ao buscar livros");
          setBooks([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isActive = false;
    };
  }, [searchParams]);

  //Estado de loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
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

  //Estado de erro
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Erro na busca
            </h2>
            <p className="ext-gray-600 dark:text-slate-400 mb-6">{error}</p>
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

  //Estado de busca sem resultados
  if (books.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
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

  //Resultado com livros
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 w-full px-4 py-8">
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-gray-600 dark:text-slate-400 text-sm">
            {books.length}{" "}
            {books.length === 1 ? "livro encontrado" : "livros encontrados"}
          </p>
        </div>

        {/* Grid de livvros */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <SearchItem
              key={book.id}
              id={book.id}
              image={book.volumeInfo.imageLinks?.thumbnail}
              title={book.volumeInfo.title}
              author={
                book.volumeInfo.authors?.join(",") || "Autor Desconhecido"
              }
              book={book}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Results