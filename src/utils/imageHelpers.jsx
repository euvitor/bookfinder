/**
 * getHighResBookCover - Melhora resolução de capas do Google Books
 *
 * Força HTTPS e ajusta parâmetro zoom da URL para obter imagens em alta resolução.
 *
 * @param {string} url - URL original da capa
 * @param {number} zoom - Nível de zoom (1-5, padrão: 3)
 * @returns {string} URL otimizada ou placeholder
 */
export function getHighResBookCover(url, zoom = 3) {
  if (!url) {
    return "/placeholder-book.jpg";
  }

  // Força HTTPS para evitar Mixed Content warnings
  let secureUrl = url.replace(/^http:/, "https:");

  // Ajusta ou adiciona parâmetro zoom na URL
  if (secureUrl.includes("zoom=")) {
    // Substitui zoom existente
    secureUrl = secureUrl.replace(/zoom=\d+/, `zoom=${zoom}`);
  } else {
    // Adiciona zoom (detecta se precisa ? ou &)
    const separator = secureUrl.includes("?") ? "&" : "?";
    secureUrl = `${secureUrl}${separator}zoom=${zoom}`;
  }

  return secureUrl;
}

/**
 * getBestBookCover - Seleciona melhor resolução de capa disponível
 *
 * Tenta múltiplas resoluções com fallback robusto para placeholder.
 *
 * Ordem de prioridade (melhor qualidade/disponibilidade):
 * 1. thumbnail (zoom=3) - mais comum e boa qualidade
 * 2. smallThumbnail (zoom=2) - fallback menor
 * 3. medium (zoom=4) - menos comum
 * 4. large (zoom=5) - raro
 * 5. placeholder - se nenhuma disponível
 *
 * @param {Object} imageLinks - Objeto volumeInfo.imageLinks da API do Google Books
 * @returns {string} URL da melhor capa disponível
 */
export function getBestBookCover(imageLinks) {
  // Validação: verifica se imageLinks existe e é objeto
  if (!imageLinks || typeof imageLinks !== "object") {
    console.log("⚠️ imageLinks inválido, usando placeholder");
    return "/placeholder-book.jpg";
  }

  // Tenta thumbnail primeiro (melhor custo-benefício)
  if (imageLinks.thumbnail) {
    return getHighResBookCover(imageLinks.thumbnail, 3);
  }

  // Fallback 1: smallThumbnail
  if (imageLinks.smallThumbnail) {
    return getHighResBookCover(imageLinks.smallThumbnail, 2);
  }

  // Fallback 2: medium (menos comum)
  if (imageLinks.medium) {
    return getHighResBookCover(imageLinks.medium, 4);
  }

  // Fallback 3: large (raro)
  if (imageLinks.large) {
    return getHighResBookCover(imageLinks.large, 5);
  }

  // Último recurso: placeholder
  console.log("⚠️ Nenhuma imagem disponível, usando placeholder");
  return "/placeholder-book.jpg";
}
