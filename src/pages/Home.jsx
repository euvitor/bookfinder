import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="grow flex flex-col justify-center items-center">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-4xl">BookFinder</h1>
          <p>
            Encontre <span className="text-blue-500">QUALQUER</span> livro
          </p>
          <SearchBar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
