/**
 * Footer - Rodapé da aplicação
 *
 * Exibe créditos e link para GitHub do desenvolvedor.
 */
function Footer() {
  return (
    <footer className="text-center p-2 text-gray-500">
      <p>
        Desenvolvido com 🩵 por{" "}
        <a
          href="https://github.com/euvitor"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          @euvitor
        </a>
      </p>
    </footer>
  );
}

export default Footer;
