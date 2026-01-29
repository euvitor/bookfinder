import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import SearchItem from "../components/SearchItem";
import { searchBooks } from "../api/books";

function Results() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      setLoading(true);

      const query = searchParams.get("q");
      const type = searchParams.get("type") || "title";
      const lang = searchParams.get("lang");
      const genre = searchParams.get("genre");

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
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        if (isActive) {
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
  console.log(loading);
  console.log(books);

  return (
    <>
      <Header />
      <div className="w-full flex flex-wrap gap-10 p-10 justify-center">
        {books.map((book) => {
          return (
            <SearchItem
              key={book.id}
              id={book.id}
              image={book.volumeInfo.imageLinks?.thumbnail}
              title={book.volumeInfo.title}
              author={
                book.volumeInfo.authors?.join(",") || "Autor Desconheciddo"
              }
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Results;
