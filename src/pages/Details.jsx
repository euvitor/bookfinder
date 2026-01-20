import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`,
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Erro:", error);
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
        <div className="p-10 text-center">Carregando...</div>
        <Footer />
      </>
    );
  }

  if (!book) {
    <>
      <Header />
      <div className="p-10 text-center">Volume não encontrado</div>
      <Footer />
    </>;
  }

  const { volumeInfo } = book;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py8">
        <div className="grid grid-cols-1 gap-8">
          {/* coluna capa */}
          <div>
            <img
              src={
                volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.thumbnail
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
