import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { useState, useMemo } from "react";

function CustomCombobox({ label, value, onChange, options }) {
  const [query, setQuery] = useState("");
  const selected = options.find((opt) => opt.value === value) || options[0];
  const filteredOptions = useMemo(() => {
    if (query === "") return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, options]);

  return (
    <Combobox
      value={selected}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      onClose={() => setQuery("")}
    >
      <div className="relative w-full">
        <div className="relative flex items-center">
          <ComboboxInput
            aria-label={label}
            displayValue={(option) => option?.label || ""}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full cursor-pointer rounded-sm bg-white border-2 border-gray-200 py-2 pl-3 pr-10 text-left text-sm text-slate-800 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 transition"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom start"
          transition
          data-combobox-options="true"
          className="absolute z-10 mt-1 max-h-60 w-(--input-width) overflow-auto rounded-sm bg-white p-1 text-sm shadow-lg ring-2 ring-gray-200 ring-opacity-5 focus:outline-none empty:invisible transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
        >
          {filteredOptions.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2 px-3 text-gray-500">
              Nenhum resultado
            </div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.value}
                value={option}
                data-combobox-option="true"
                className="relative rounded-sm cursor-pointer select-none py-2 px-3 data-focus:bg-blue-100 data-focus:text-slate-800 data-selected:font-medium text-gray-700 transition"
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                  >
                    {option.label}
                  </span>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

export default CustomCombobox;
