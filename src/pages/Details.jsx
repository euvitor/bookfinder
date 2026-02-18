import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getBestBookCover } from "../utils/imageHelpers";
import { shareBook, getAmazonAffiliateLink } from "../utils/shareHelpers";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Se já tem dados da lista, usa e não chama API
    if (location.state?.book) {
      console.log("✅ Usando dados da lista (sem chamar API)");
      return;
    }

    // Previne dupla execução (StrictMode)
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

  //Handler para compartilhar
  const handleShare = () => {
    shareBook(book);
  };

  //Estado de loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-slate-400">
              Carregando detalhes do livro...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  //Estado de erro
  if (error || !book || !book.volumeInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Erro ao carregar livro
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              {error || "Livro não encontrado"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Voltar à busca
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { volumeInfo } = book;

  //Gera link de afiliado Amazon
  const amazonLink = getAmazonAffiliateLink(
    volumeInfo.industryIdentifiers,
    "euvitordev-20",
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl max-h-200">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          {/* Coluna da esquerda - CAPA */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={getBestBookCover(volumeInfo.imageLinks)}
              alt={volumeInfo.title}
              className="w-full max-w-100 rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%23e5e7eb' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%239ca3af'%3ESem capa%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Coluna da direita - INFO */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            {/* Título e Autor */}
            <div className="mb-4">
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-slate-50 mb-2">
                {volumeInfo.title}
              </h1>
              {volumeInfo.subtitle && (
                <h2 className="text-lg text-gray-600 dark:text-slate-400 mb-3">
                  {volumeInfo.subtitle}
                </h2>
              )}

              <p className="text-lg text-gray-700 dark:text-slate-300">
                {volumeInfo.authors?.join(",") || "Autor Desconhecido"}
              </p>
            </div>
            {/* Botões - Compartilhar e Comprar */}
            <div className="flex gap-3 mb-6">
              {/* Compartilhar */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border-2 dark:text-slate-500 dark:hover:text-slate-50 border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                aria-label="Compartilhar livro"
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
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </button>

              {/* Comprar na Amazon (se tiver ISBN) */}
              {amazonLink && (
                <a
                  href={amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border-2 dark:text-slate-500 dark:hover:text-slate-50 border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  aria-label="Comprar na Amazon"
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Gênero e Páginas*/}
            <div className="flex flex-wrap gap-2 mb-6">
              {volumeInfo.categories?.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm rounded-full"
                >
                  {category}
                </span>
              ))}

              {volumeInfo.pageCount && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm rounded-full">
                  {volumeInfo.pageCount} páginas
                </span>
              )}
            </div>

            {/* Descrição */}
            {volumeInfo.description && (
              <div className="max-h-100 overflow-y-auto pr-2">
                <div
                  className="text-gray-700 dark:text-slate-300 leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                />
              </div>
            )}

            {/* Aviso de Afiliado */}
            {amazonLink && (
              <p className="text-xs text-gray-500 dark:text-slate-500 mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
                * Links de compra podem gerar comissão para manutenção do site
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Details;
