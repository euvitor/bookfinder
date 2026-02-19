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
 * Usa busca (/s?k=ISBN) ao invés de link direto (/dp/ASIN) porque:
 * - Amazon BR não aceita ISBN-13 diretamente no formato /dp/
 * - Cada livro tem um ASIN interno diferente do ISBN
 * - Busca por ISBN redireciona automaticamente para o produto correto
 *
 * Prioriza ISBN-13 (padrão internacional) sobre ISBN-10.
 *
 * @param {Array<{type: string, identifier: string}>} industryIdentifiers - Array de ISBNs do livro
 * @param {string} affiliateId - Tag de afiliado da Amazon (padrão: euvitordev-20)
 * @returns {string|null} URL da Amazon com afiliado, ou null se não houver ISBN
 */
export function getAmazonAffiliateLink(
  industryIdentifiers,
  affiliateId = "euvitordev-20",
) {
  // Validação: verifica se há ISBNs disponíveis
  if (
    !industryIdentifiers ||
    !Array.isArray(industryIdentifiers) ||
    industryIdentifiers.length === 0
  ) {
    console.log("⚠️ Nenhum ISBN encontrado para este livro");
    return null;
  }

  console.log("📚 ISBNs disponíveis:", industryIdentifiers);

  // Procura ISBN-13 primeiro (mais usado), depois ISBN-10
  const isbn13 = industryIdentifiers.find((id) => id.type === "ISBN_13");
  const isbn10 = industryIdentifiers.find((id) => id.type === "ISBN_10");

  const isbnValue = isbn13?.identifier || isbn10?.identifier;

  if (!isbnValue) {
    console.log("⚠️ ISBN não encontrado");
    return null;
  }

  console.log("✅ ISBN encontrado:", isbnValue);

  // Remove hífens do ISBN (Amazon não aceita formatação na busca)
  const cleanIsbn = isbnValue.replace(/-/g, "");

  // Monta URL de busca na Amazon com tag de afiliado
  // Parâmetros:
  // - k: keyword de busca (ISBN limpo)
  // - tag: ID de afiliado
  // - linkCode: código de rastreamento de afiliado (ll2 = text link)
  const amazonUrl = `https://www.amazon.com.br/s?k=${cleanIsbn}&tag=${affiliateId}&linkCode=ll2`;

  console.log("🔗 Link Amazon gerado (busca):", amazonUrl);

  return amazonUrl;
}
