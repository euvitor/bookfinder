import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";

function Results() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      setLoading(true);

      const query = searchParams.get("q");
      const type = searchParams.get("type");
      const lang = searchParams.get("lang");
      const genre = searchParams.get("genre");

      let searchQuery = "";
      if (type === "title") {
        searchQuery = `intitle:${query}`;
      } else if (type === "author") {
        searchQuery = `inauthor:${query}`;
      } else if (type === "isbn") {
        searchQuery = `isbn:${query}`;
      }

      if (genre) {
        searchQuery += `+subject:${genre}`;
      }

      let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30`;

      if (lang) {
        apiUrl += `&langRestrict=${lang}`;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (isActive) {
          setBooks(data.items || []);
        }
      } catch (error) {
        console.error(`Erro: ${error}`);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };
    fetchBooks();

    return () => {isActive = false};
  }, [searchParams]);
  console.log(books);

  //   TODO: cards para exibição dos itens da pesquisa

  return (
    <>
      <Header />
      <div>
        <p>a</p>
      </div>
      <Footer />
    </>
  );
}

export default Results;
