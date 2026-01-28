import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="grow flex flex-col justify-center items-center">
        <div className="w-full max-w-xl text-center text-slate-800">
          <h1 className="text-5xl font-bold">BookFinder</h1>
          <p className="text-xl">
            ENCONTRE <span className="font-semibold text-blue-500">QUALQUER</span> LIVRO
          </p>
          <SearchBar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
