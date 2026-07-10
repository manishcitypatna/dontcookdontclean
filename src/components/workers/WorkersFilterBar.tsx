"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LOCALITY_OPTIONS } from "@/data/localities";

const SERVICE_OPTIONS = ["Cooking", "Cleaning", "Baby & Child Care", "Elder Care"];
const SHIFT_OPTIONS = ["Full-Time", "Part-Time", "Live-In", "Daily"];
const SORT_OPTIONS = [
  { value: "", label: "Sort By" },
  { value: "experience_desc", label: "Experience: High to Low" },
  { value: "experience_asc", label: "Experience: Low to High" },
  { value: "age_asc", label: "Age: Low to High" },
  { value: "age_desc", label: "Age: High to Low" },
  { value: "salary_asc", label: "Salary: Low to High" },
  { value: "salary_desc", label: "Salary: High to Low" },
];

const controlClass =
  "h-12 w-full rounded-2xl border border-primary/30 bg-white text-base md:text-sm font-medium text-primary transition-colors hover:border-primary/60 focus:outline-none focus:border-primary";

function ThemeSelect({
  value,
  onChange,
  ariaLabel,
  className = "",
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={`${controlClass} appearance-none pl-4 pr-9 cursor-pointer`}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function WorkersFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const hasFilters = ["locality", "service", "workType", "sort"].some((key) =>
    searchParams.get(key)
  );

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center gap-3">
        <ThemeSelect
          value={searchParams.get("locality") ?? ""}
          onChange={(value) => updateParam("locality", value)}
          ariaLabel="Filter by locality"
          className="md:w-48"
        >
          <option value="">All Localities</option>
          {LOCALITY_OPTIONS.filter((option) => option !== "Other").map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ThemeSelect>

        <ThemeSelect
          value={searchParams.get("service") ?? ""}
          onChange={(value) => updateParam("service", value)}
          ariaLabel="Filter by service"
          className="md:w-44"
        >
          <option value="">All Services</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ThemeSelect>

        <ThemeSelect
          value={searchParams.get("workType") ?? ""}
          onChange={(value) => updateParam("workType", value)}
          ariaLabel="Filter by shift"
          className="md:w-40"
        >
          <option value="">All Shifts</option>
          {SHIFT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ThemeSelect>

        <ThemeSelect
          value={searchParams.get("sort") ?? ""}
          onChange={(value) => updateParam("sort", value)}
          ariaLabel="Sort helpers"
          className="col-span-2 md:w-56 md:ml-auto"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ThemeSelect>

        {hasFilters && (
          <button
            type="button"
            onClick={() => router.push(pathname, { scroll: false })}
            className="col-span-2 md:col-span-1 small-text text-primary font-semibold underline text-center md:text-left"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
