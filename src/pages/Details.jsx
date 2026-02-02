import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getBestBookCover } from "../utils/imageHelpers";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (location.state?.book) {
      console.log("✅ Usando dados da lista (sem chamar API)");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    console.log("⚠️ Dados não encontrados, chamando API...");

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`,
        );

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              "Limite de requisições atingido. Tente acessar via página de busca.",
            );
          }
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.volumeInfo) {
          throw new Error("Livro não encontrado");
        }

        setBook(data);
      } catch (err) {
        console.error("Erro:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, location.state]);

  // Estado de loading
  if (loading) {
    return (
      <>
        <Header />
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          Carregando detalhes do livro...
        </div>
        <Footer />
      </>
    );
  }

  // Estado de erro
  if (error || !book || !book.volumeInfo) {
    return (
      <>
        <Header />
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao carregar livro
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            {error || "Livro não encontrado"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Voltar à busca
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const { volumeInfo } = book;

  console.log("🔍 volumeInfo.imageLinks:", volumeInfo.imageLinks);
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={getBestBookCover(volumeInfo.imageLinks)}
              alt={volumeInfo.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-slate-50">
              {volumeInfo.title}
            </h1>

            {volumeInfo.subtitle && (
              <h2 className="text-xl text-gray-600 dark:text-slate-400 mb-4">
                {volumeInfo.subtitle}
              </h2>
            )}

            <div className="space-y-3 mb-6 dark:text-slate-200">
              <p>
                <strong>Autor(es):</strong>{" "}
                {volumeInfo.authors?.join(", ") || "Desconhecido"}
              </p>
              <p>
                <strong>Páginas:</strong> {volumeInfo.pageCount || "N/A"}
              </p>
              {volumeInfo.categories && (
                <p>
                  <strong>Categorias:</strong>{" "}
                  {volumeInfo.categories.join(", ")}
                </p>
              )}
              {volumeInfo.averageRating && (
                <p>
                  <strong>Avaliação:</strong> {volumeInfo.averageRating} ⭐ (
                  {volumeInfo.ratingsCount} avaliações)
                </p>
              )}
            </div>

            {volumeInfo.description && (
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-slate-50">
                  Descrição
                </h3>
                <div
                  className="text-gray-700 dark:text-slate-300 leading-relaxed prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                />
              </div>
            )}

            {volumeInfo.previewLink && (
              <a
                href={volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Visualizar no Google Books
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;
