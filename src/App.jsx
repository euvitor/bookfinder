import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Details from "./pages/Details";

/**
 * App - Componente raiz da aplicação
 *
 * Define as rotas principais do BookFinder:
 * - "/" : Página inicial com busca
 * - "/results" : Lista de livros encontrados (recebe parâmetros via URL)
 * - "/details/:id" : Detalhes de um livro específico
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
