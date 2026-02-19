import { useState, useRef, useEffect } from "react";

/**
 * CustomCombobox - Select estilizado customizado
 *
 * Componente de seleção dropdown com suporte a dark mode e animações.
 * Usado nos filtros de busca (idioma e gênero).
 *
 * @param {string} label - Rótulo do campo (para acessibilidade)
 * @param {string} value - Valor selecionado atualmente
 * @param {function} onChange - Callback chamado ao selecionar opção
 * @param {Array<{value: string, label: string}>} options - Lista de opções disponíveis
 */
function CustomCombobox({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const comboboxRef = useRef(null);

  // Encontra opção atualmente selecionada
  const selectedOption = options.find((opt) => opt.value === value);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={comboboxRef} className="relative flex-1">
      {/* Botão que abre/fecha o dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white/50 dark:bg-slate-700/50 hover:bg-gray-200/60 dark:hover:bg-slate-600/60 rounded-lg text-sm text-gray-700 dark:text-slate-300 border border-white/20 dark:border-slate-600/30 focus:border-blue-400/50 dark:focus:border-blue-500/50 focus:ring-2 focus:ring-blue-200/30 dark:focus:ring-blue-900/30 transition-all duration-200 flex items-center justify-between"
        aria-label={label}
        aria-expanded={isOpen}
      >
        <span className="truncate font-medium">
          {selectedOption?.label || `Selecione ${label.toLowerCase()}`}
        </span>

        {/* Ícone de seta (rotaciona quando aberto) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Lista de opções (dropdown) */}
      {isOpen && (
        <div
          data-combobox-options
          className="absolute top-full left-0 right-0 mt-1 bg-white/95 dark:bg-slate-800/95 border border-white/20 dark:border-slate-700/30 rounded-lg shadow-xl shadow-gray-200/50 dark:shadow-slate-950/50 max-h-60 overflow-auto z-20 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              data-combobox-option
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-all duration-150 ${
                option.value === value
                  ? "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-slate-300 hover:bg-gray-500/10 dark:hover:bg-slate-600/30"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomCombobox;
