"use client";
import { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
  name?: string;
  allowMultiple?: boolean;
  allowSpecialCharacters?: boolean;
}

export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  id,
  name,
  allowMultiple = true,
  allowSpecialCharacters = true,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [isSelecting, setIsSelecting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync search term with value
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Get last token after comma for filtering (for multiple mode)
  const getLastToken = (text: string) => {
    if (!allowMultiple) return text.trim();
    const tokens = text.split(",");
    return tokens[tokens.length - 1].trim();
  };

  const lastToken = getLastToken(searchTerm);
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(lastToken.toLowerCase())
  );

  // Get existing selected options (for duplicates check in multiple mode)
  const getExistingTokens = (text: string) => {
    if (!allowMultiple) return [];
    return text.split(",").map(t => t.trim()).filter(Boolean);
  };

  const existingTokens = getExistingTokens(value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // When clicking outside, update the value with search term
        if (searchTerm !== value) {
          onChange(searchTerm);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm, value, onChange]);

  const handleSelect = (option: string) => {
    setIsSelecting(true);
    if (!allowMultiple) {
      // Single selection mode
      onChange(option);
      setSearchTerm(option);
      setIsOpen(false);
    } else {
      // Multiple selection mode - check for duplicates
      // Replace last token (search term) with selected option
      const tokens = value.split(",").map(t => t.trim()).filter(Boolean);
      // Add the selected option if not already present
      if (!tokens.includes(option)) {
        tokens.push(option);
      }
      const newValue = tokens.join(", ");
      onChange(newValue);
      setSearchTerm(newValue + ", "); // Keep comma at end to add next option easily
      setIsOpen(true); // Keep dropdown open for adding more
    }
    setTimeout(() => setIsSelecting(false), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(searchTerm);
      setIsOpen(false);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (!allowSpecialCharacters) {
      // Allow only alphanumeric, spaces, and commas (for multiple mode)
      const allowedChars = allowMultiple 
        ? /^[a-zA-Z0-9\s,]*$/ 
        : /^[a-zA-Z0-9\s]*$/;
      if (!allowedChars.test(newValue)) {
        // If invalid character, revert to last valid value
        return;
      }
    }
    setSearchTerm(newValue);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        onChange={handleInputChange}
        onBlur={() => {
          if (!isSelecting && searchTerm !== value) {
            onChange(searchTerm);
          }
        }}
        onKeyDown={handleKeyDown}
        className="form-input w-full"
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions
              .filter(option => !allowMultiple || !existingTokens.includes(option)) // Hide already selected options in multiple mode
              .map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent default to keep focus
                    handleSelect(option);
                  }}
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
