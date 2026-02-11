/**
 * Melhora a resolução da URL de capa do Google Books
 * E garante que usa HTTPS
 */
export function getHighResBookCover(url, zoom = 3) {
  if (!url) {
    return "/placeholder-book.jpg";
  }

  // Força HTTPS (evita Mixed Content)
  let secureUrl = url.replace(/^http:/, "https:");

  // Se a URL já tem parâmetro zoom, substitui
  if (secureUrl.includes("zoom=")) {
    secureUrl = secureUrl.replace(/zoom=\d+/, `zoom=${zoom}`);
  } else {
    // Se não tem zoom, adiciona
    const separator = secureUrl.includes("?") ? "&" : "?";
    secureUrl = `${secureUrl}${separator}zoom=${zoom}`;
  }

  return secureUrl;
}

/**
 * Tenta pegar a melhor resolução disponível
 * Com fallback robusto para placeholder
 */
export function getBestBookCover(imageLinks) {
  // Se não tem imageLinks, retorna placeholder
  if (!imageLinks || typeof imageLinks !== "object") {
    console.log("⚠️ imageLinks inválido, usando placeholder");
    return "/placeholder-book.jpg";
  }

  // Prioridade: thumbnail > smallThumbnail > medium > large
  if (imageLinks.thumbnail) {
    return getHighResBookCover(imageLinks.thumbnail, 3);
  }

  if (imageLinks.smallThumbnail) {
    return getHighResBookCover(imageLinks.smallThumbnail, 2);
  }

  if (imageLinks.medium) {
    return getHighResBookCover(imageLinks.medium, 4);
  }

  if (imageLinks.large) {
    return getHighResBookCover(imageLinks.large, 5);
  }

  // Se não tem nenhuma imagem, retorna placeholder
  console.log("⚠️ Nenhuma imagem disponível, usando placeholder");
  return "/placeholder-book.jpg";
}
