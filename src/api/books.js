const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * searchBooks - Busca livros na API do Google Books
 * 
 * @param {string} q - Termo de busca
 * @param {string} type - Tipo de busca: "title", "author" ou "isbn" (padrão: "title")
 * @param {string} lang - Código de idioma (ex: "pt", "en")
 * @param {string} genre - Categoria/gênero do livro (ex: "fiction", "science")
 * @param {number} maxResults - Quantidade de resultados por página (padrão: 20, máximo: 40)
 * @param {number} startIndex - Índice inicial para paginação (padrão: 0)
 * 
 * @returns {Promise<Object>} Objeto com totalItems e array items[] com os livros
 * @throws {Error} Se a requisição falhar
 */
export async function searchBooks({
    q,
    type = "title",
    lang,
    genre,
    maxResults = 20,
    startIndex = 0,
}) {
    let query = q;

    // Constrói query específica conforme tipo de busca
    if (type === "author") {
        query = `inauthor:${q}`;
    } else if (type === "isbn") {
        query = `isbn:${q}`;
    } else {
        query = `intitle:${q}`;
    }

    // Adiciona filtro de gênero se fornecido
    if (genre) {
        query += `+subject:${genre}`;
    }

    // Monta parâmetros da URL
    const params = new URLSearchParams({
        q: query,
        maxResults: maxResults.toString(),
        startIndex: startIndex.toString(),
        key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || "",
    });

    // Adiciona restrição de idioma se fornecido
    if (lang) {
        params.append("langRestrict", lang);
    }

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
    }

    return response.json();
}
