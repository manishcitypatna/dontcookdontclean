import { LOCALITY_OPTIONS } from "@/data/localities";

function slugify(name: string): string {
  return name
    .replace(/\([^)]*\)/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const NAMED_LOCALITIES = LOCALITY_OPTIONS.filter((name) => name !== "Other");

export const LOCALITY_TO_SLUG: Record<string, string> = Object.fromEntries(
  NAMED_LOCALITIES.map((name) => [name, slugify(name)])
);

export const SLUG_TO_LOCALITY: Record<string, string> = Object.fromEntries(
  Object.entries(LOCALITY_TO_SLUG).map(([name, slug]) => [slug, name])
);

export function localityToSlug(name: string): string {
  return LOCALITY_TO_SLUG[name] ?? slugify(name);
}

export function slugToLocality(slug: string): string | undefined {
  return SLUG_TO_LOCALITY[slug];
}
