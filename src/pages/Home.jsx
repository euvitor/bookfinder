import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div>
      <div className="w-sm m-auto text-center mt-60">
        <h1 className="text-5xl font-bold">BookFinder</h1>
        <h2 className="text-xl font-semibold">ENCONTRE <span className="text-blue-500">QUALQUER</span> LIVRO</h2>
      </div>
      <SearchBar/>
    </div>
  );
}

export default Home;
