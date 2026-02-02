export function getHighResBookCover(url, zoom = 3) {
  if (!url) {
    return "/placeholder-book.jpg";
  }

  let secureUrl = url.replace(/^http:/, "https:");

  if (secureUrl.includes("zoom=")) {
    secureUrl = secureUrl.replace(/zoom=\d+/, `zoom=${zoom}`);
  } else {
    const separator = secureUrl.includes("?") ? "&" : "?";
    secureUrl = `${secureUrl}${separator}zoom=${zoom}`;
  }

  console.log(`✅ URL final (HTTPS + zoom=${zoom}):`, secureUrl);
  return secureUrl;
}


export function getBestBookCover(imageLinks) {
  if (!imageLinks) {
    return "/placeholder-book.jpg";
  }

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

  return "/placeholder-book.jpg";
}
