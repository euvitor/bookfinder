/**
 * Compartilha livro usando Web Share API nativa
 * Fallback para copiar link se não suportado
 */
export async function shareBook(book) {
  const { volumeInfo } = book;
  const shareData = {
    title: volumeInfo.title,
    text: `Confira "${volumeInfo.title}" de ${volumeInfo.authors?.join(", ") || "autor desconhecido"}`,
    url: window.location.href,
  };

  // Verifica se o navegador suporta Web Share API
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("✅ Compartilhado com sucesso");
      return true;
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Erro ao compartilhar:", err);
      }
      return false;
    }
  } else {
    // Fallback: copia link
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
 * Gera link de afiliado da Amazon baseado no ISBN
 * 
 * @param {Array} industryIdentifiers - Array de ISBNs da API
 * @param {string} affiliateId - Seu ID de afiliado Amazon
 * @returns {string|null} - URL de afiliado ou null
 */
export function getAmazonAffiliateLink(industryIdentifiers, affiliateId = "euvitordev-20") {
  // Validação: verifica se tem array de ISBNs
  if (!industryIdentifiers || !Array.isArray(industryIdentifiers) || industryIdentifiers.length === 0) {
    console.log("⚠️ Nenhum ISBN encontrado para este livro");
    return null;
  }

  console.log("📚 ISBNs disponíveis:", industryIdentifiers);

  // Procura ISBN-13 primeiro (preferido pela Amazon)
  const isbn13 = industryIdentifiers.find((id) => id.type === "ISBN_13");
  
  // Se não tiver ISBN-13, usa ISBN-10
  const isbn10 = industryIdentifiers.find((id) => id.type === "ISBN_10");

  // Pega o identificador (string do ISBN)
  const isbnValue = isbn13?.identifier || isbn10?.identifier;

  if (!isbnValue) {
    console.log("⚠️ ISBN não encontrado nos identifiers");
    return null;
  }

  console.log("✅ ISBN encontrado:", isbnValue);

  // Remove hífens do ISBN (Amazon não aceita com hífens)
  const cleanIsbn = isbnValue.replace(/-/g, "");

  // Monta URL da Amazon Brasil com tag de afiliado
  const amazonUrl = `https://www.amazon.com.br/dp/${cleanIsbn}?tag=${affiliateId}`;
  
  console.log("🔗 Link Amazon gerado:", amazonUrl);
  
  return amazonUrl;
}