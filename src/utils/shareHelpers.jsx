/**
 * shareBook - Compartilha livro usando Web Share API ou fallback
 *
 * Tenta usar Web Share API nativa (mobile). Se não disponível,
 * copia link para área de transferência (desktop).
 *
 * @param {Object} book - Objeto completo do livro da API
 * @returns {Promise<boolean>} true se compartilhou/copiou com sucesso
 */
export async function shareBook(book) {
  const { volumeInfo } = book;

  const shareData = {
    title: volumeInfo.title,
    text: `Confira "${volumeInfo.title}" de ${volumeInfo.authors?.join(", ") || "autor desconhecido"}`,
    url: window.location.href,
  };

  // Estratégia 1: Web Share API (nativa em mobile/PWA)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("✅ Compartilhado com sucesso");
      return true;
    } catch (err) {
      // AbortError = usuário cancelou, não é erro real
      if (err.name !== "AbortError") {
        console.error("Erro ao compartilhar:", err);
      }
      return false;
    }
  } else {
    // Estratégia 2: Fallback para copiar link (desktop)
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para área de transferência!");
      return true;
    } catch (err) {
      console.error("Erro ao copiar:", err);
      return false;
    }
  }
}

/**
 * getAmazonAffiliateLink - Gera link de busca na Amazon com tag de afiliado
 *
 * Busca por título + autor para maior probabilidade de encontrar o livro.
 * Usa filtro de autor (rh) para refinar resultados mesmo em títulos genéricos.
 *
 * @param {Object} volumeInfo - Objeto volumeInfo completo do livro da API
 * @param {string} affiliateId - Tag de afiliado da Amazon (padrão: euvitordev-20)
 * @returns {string|null} URL da Amazon com afiliado, ou null se não houver título
 */
export function getAmazonAffiliateLink(
  volumeInfo,
  affiliateId = "euvitordev-20",
) {
  // Validação: título é obrigatório para a busca
  if (!volumeInfo?.title) {
    console.log("⚠️ Título não encontrado para este livro");
    return null;
  }

  // Formata título substituindo espaços por + (padrão URL da Amazon)
  const searchQuery = volumeInfo.title.replaceAll(" ", "+");

  // Monta URL base de busca com título
  let amazonUrl = `https://www.amazon.com.br/s?k=${searchQuery}&tag=${affiliateId}&linkCode=ll2`;

  // Adiciona filtro de autor se disponível (refina a busca)
  if (volumeInfo.authors?.length > 0) {
    const bookAuthor = volumeInfo.authors[0].replaceAll(" ", "+");
    amazonUrl += `&rh=p_lbr_books_authors_browse-bin%3A${bookAuthor}`;
    console.log(
      "✅ Buscando por título + autor:",
      volumeInfo.title,
      "+",
      volumeInfo.authors[0],
    );
  } else {
    console.log("✅ Buscando apenas por título:", volumeInfo.title);
  }

  console.log("🔗 Link Amazon gerado:", amazonUrl);

  return amazonUrl;
}
