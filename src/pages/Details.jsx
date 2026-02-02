import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
              "Muitas requisições. Tente novamente em alguns minutos.",
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
  }, [id]);

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

  if (error || !book || !book.volumeInfo) {
    return (
      <>
        <Header />
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao carregar livro
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {error || "Livro não encontrado"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Voltar à busca
          </button>
        </div>
      </>
    );
  }

  const { volumeInfo } = book;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* coluna capa */}
          <div>
            <img
              src={
                volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.thumbnail ||'/placeholder-book.jpg'
              }
              alt={volumeInfo.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* coluna info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{volumeInfo.title}</h1>

            {volumeInfo.subtitle && (
              <h2 className="text-xl text-gray-600 mb-4">
                {volumeInfo.subtitle}
              </h2>
            )}

            <div className="space-y-3 mb-6">
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
                <h3 className="text-xl font-bold mb-2">Descrição</h3>
                <div
                  className="text-gray-700 leading-relaxed"
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
