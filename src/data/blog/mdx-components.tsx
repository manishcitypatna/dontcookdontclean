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
      <div className="relative mb-5 mt-10 first:mt-0">
        <h2 className="h2 text-text-primary" {...props}>
          {children}
        </h2>
        <div className="mt-2 h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
      </div>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="h3 text-text-primary mb-4 mt-8" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="h4 text-text-primary mb-3 mt-6" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="body text-text-secondary mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <div className="bg-white rounded-2xl border border-border p-6 my-6 shadow-sm">
        <ul className="space-y-3" {...props}>
          {children}
        </ul>
      </div>
    ),
    ol: ({ children, ...props }) => (
      <div className="bg-white rounded-2xl border border-border p-6 my-6 shadow-sm">
        <ol className="space-y-3" {...props}>
          {children}
        </ol>
      </div>
    ),
    li: ({ children, ...props }) => (
      <li className="body text-text-secondary flex items-start gap-3" {...props}>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
          •
        </span>
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary pl-6 py-6 my-8 bg-gradient-to-r from-primary/5 to-transparent rounded-r-2xl"
        {...props}
      >
        <p className="body text-text-primary font-medium">{children}</p>
      </blockquote>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-primary" {...props}>
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-primary underline hover:text-primary/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }) => (
      <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg my-8 border border-border">
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
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto rounded-2xl border border-border my-8 shadow-sm bg-white">
        <table className="w-full" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gradient-to-r from-primary/10 to-secondary/10" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody {...props}>{children}</tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="border-b border-border last:border-b-0 hover:bg-background/50 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th className="px-6 py-4 text-left text-text-primary font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-6 py-4 text-text-secondary" {...props}>
        {children}
      </td>
    ),
    hr: ({ ...props }) => (
      <hr className="border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent my-10" {...props} />
    ),
    ...components,
  };
}
