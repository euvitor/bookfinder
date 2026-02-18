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
 * Usa busca (/s?k=) em vez de link direto (/dp/) porque a Amazon BR
 * não aceita ISBN-13 diretamente, precisa do ASIN interno
 */
export function getAmazonAffiliateLink(industryIdentifiers, affiliateId = "euvitordev-20") {
  if (!industryIdentifiers || !Array.isArray(industryIdentifiers) || industryIdentifiers.length === 0) {
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

  // Remove hífens (Amazon não aceita com hífens na busca)
  const cleanIsbn = isbnValue.replace(/-/g, "");

  // Monta URL de BUSCA na Amazon (não link direto)
  // A Amazon redireciona automaticamente para o produto correto
  const amazonUrl = `https://www.amazon.com.br/s?k=${cleanIsbn}&tag=${affiliateId}&linkCode=ll2`;
  
  console.log("🔗 Link Amazon gerado (busca):", amazonUrl);
  
  return amazonUrl;
}
