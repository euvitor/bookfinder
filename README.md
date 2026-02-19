<div align="center">

# 📚 BookFinder

### Encontre qualquer livro com facilidade

Uma aplicação web moderna para buscar livros usando a API do Google Books, com filtros avançados, dark mode e interface responsiva.

[🚀 Ver Demo](#) • [📖 Documentação](#-instalação) • [🐛 Reportar Bug](../../issues)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ Features

- 🔍 **Busca Avançada**: Pesquise por título, autor ou ISBN
- 🎨 **Dark Mode**: Tema escuro/claro com persistência
- 🌐 **Filtros Inteligentes**: Idioma e gênero personalizáveis
- ♾️ **Paginação Load More**: Carregue mais livros sob demanda
- 📱 **Responsivo**: Interface adaptada para mobile, tablet e desktop
- 🚀 **Performance**: Otimização de requisições e cache de dados
- 🔗 **Compartilhamento**: Web Share API com fallback para área de transferência
- 🛒 **Links de Compra**: Integração com Amazon (afiliado)

---

## 🖼️ Screenshots

<details>
  <summary>Ver capturas de tela</summary>

  ### Página Inicial
  ![Home](./docs/images/home.png)

  ### Resultados de Busca
  ![Results](./docs/images/results.png)

  ### Detalhes do Livro
  ![Details](./docs/images/details.png)
</details>

---

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Estilização utilitária
- **Google Books API** - Fonte de dados

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- API Key do Google Books ([obter aqui](https://developers.google.com/books/docs/v1/using#APIKey))

### Passo a passo

```bash
# Clone o repositório
git clone [https://github.com/euvitor/bookfinder.git](https://github.com/euvitor/bookfinder.git)

# Entre na pasta
cd bookfinder

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Edite .env e adicione sua API Key

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_GOOGLE_BOOKS_API_KEY=sua_api_key_aqui
```

> ⚠️ **Importante:** Nunca commite o arquivo `.env` com suas credenciais!

### 📁 Estrutura do Projeto

```text
bookfinder/
├── src/
│   ├── api/
│   │   └── books.js              # Chamadas à API do Google Books
│   ├── assets/
│   │   └── fonts/                # Fontes adicionais
│   ├── components/
│   │   ├── CustomCombobox.jsx    # Select customizado
│   │   ├── Footer.jsx            # Rodapé
│   │   ├── Header.jsx            # Cabeçalho com navegação
│   │   ├── SearchBar.jsx         # Barra de busca com filtros
│   │   ├── SearchItem.jsx        # Card de livro na lista
│   │   └── ThemeToggle.jsx       # Toggle dark/light mode
│   ├── pages/
│   │   ├── Home.jsx              # Página inicial
│   │   ├── Results.jsx           # Lista de resultados
│   │   └── Details.jsx           # Detalhes do livro
│   ├── utils/
│   │   ├── imageHelpers.js       # Otimização de imagens
│   │   └── shareHelpers.js       # Compartilhamento
│   ├── App.jsx                   # Rotas principais
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globais
├── public/                       # Assets estáticos
├── .env.example                  # Template de variáveis
└── README.md                     # Este arquivo
```

---

## 🚀 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Gera build de produção
npm run preview   # Testa build localmente
npm run lint      # Verifica código com ESLint
```

---

## 🎯 Funcionalidades Técnicas

### Otimizações Implementadas
- ✅ **State Passing**: Dados passados via `location.state` para evitar requisições duplicadas
- ✅ **Lazy Loading**: Imagens carregadas sob demanda
- ✅ **Error Handling**: Tratamento robusto de erros de rede
- ✅ **Fallbacks**: Placeholder para livros sem capa
- ✅ **Load More Pattern**: Paginação eficiente com 20 itens por vez

### Acessibilidade
- ✅ ARIA labels em botões interativos
- ✅ Navegação por teclado
- ✅ Contraste adequado (WCAG AA)
- ✅ Tags semânticas HTML5

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Vitor** - [@euvitor](https://github.com/euvitor)

---

## 🙏 Agradecimentos

- [Google Books API](https://developers.google.com/books) - Fonte de dados
- [Heroicons](https://heroicons.com/) - Ícones SVG
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

<div align="center">

Feito com 🩵 por Vitor

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>