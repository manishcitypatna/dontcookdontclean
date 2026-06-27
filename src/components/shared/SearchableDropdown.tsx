"use client";
import { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
  name?: string;
}

export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  id,
  name,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={isOpen ? searchTerm : value}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        className="form-input w-full cursor-pointer"
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors"
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-text-secondary">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}
