const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks({ q, type, lang, genre, maxResults = 30 }) {
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

    if (!API_KEY) {
        throw new Error('API key não configurada. Verifique .env')
    }

    let searchQuery = q;

    //query build
    if (type === 'title') {
        searchQuery = `intitle:${q}`
    } else if (type === 'author') {
        searchQuery = `inauthor:${q}`
    } else if (type === 'isbn') {
        searchQuery = `isbn:${q}`
    }

    if (genre) {
        searchQuery += `+subject:${genre}`
    }

    const params = new URLSearchParams({
        q: searchQuery,
        maxResults,
        key: API_KEY,
    })

    if (lang) {
        params.append('langRestrict', lang)
    }

    const res = await fetch(`${BASE_URL}?${params.toString()}`)

    if (!res.ok) {
        throw new Error(`Erro da API Google Books: ${res.status}`)
    }

    return res.json()
}