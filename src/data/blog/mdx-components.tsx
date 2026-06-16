import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="h1 text-text-primary mb-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="h2 text-text-primary mb-5" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="h3 text-text-primary mb-4" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="h4 text-text-primary mb-3" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="body text-text-secondary mb-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="body text-text-secondary" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary pl-6 py-2 my-6 italic"
        {...props}
      >
        <p className="body text-text-primary">{children}</p>
      </blockquote>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-text-primary" {...props}>
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-primary underline hover:text-primary/80"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }) => (
      <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg my-8">
        <Image
          src={src || ""}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="100vw"
          {...props}
        />
      </div>
    ),
    ...components,
  };
}
