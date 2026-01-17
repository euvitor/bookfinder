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
          `https://www.googleapis.com/books/v1/volumes/${id}`
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

  return (
    <>
      <Header />
      <div className="p-10 text-center">Livro OK!</div>
      <Footer />
    </>
  );

  //const { volumeInfo } = book;
}

export default Details;
