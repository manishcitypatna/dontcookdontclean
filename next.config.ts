import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default withMDX(nextConfig);
