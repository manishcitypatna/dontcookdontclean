# Blog System Guide

This guide explains how the blog system works, how to manage articles, and how to add new content.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Blog Data Source](#blog-data-source)
3. [Landing Page Blog Section](#landing-page-blog-section)
4. [Blog Page (/blog)](#blog-page-blog)
5. [Individual Article Page](#individual-article-page)
6. [Adding New Articles](#adding-new-articles)
7. [MDX Format Guide](#mdx-format-guide)
8. [Image Placement](#image-placement)
9. [Pagination Status](#pagination-status)
10. [Customizing Article Design](#customizing-article-design)

---

## Project Structure

Here's the key file structure for the blog system:

```
modern-web/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/       # Individual article page
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx      # Blog listing page
│   │   └── page.tsx          # Landing page (uses BlogSection)
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── ArticleAuthor.tsx
│   │   │   ├── ArticleCTA.tsx
│   │   │   └── RelatedArticles.tsx
│   │   └── landing/
│   │       └── BlogSection.tsx
│   └── data/
│       └── blog/
│           ├── articles/         # MDX files for each article
│           │   ├── daily-clean-home-habits.mdx
│           │   ├── how-to-hire-the-right-maid.mdx
│           │   └── weekly-house-cleaning-checklist.mdx
│           ├── types.ts          # TypeScript interfaces
│           ├── blogUtils.ts      # Core blog utility functions
│           └── mdx-components.tsx # MDX component overrides
└── public/
    └── blog-image/               # Article images
```

---

## Blog Data Source

All blog articles are stored as **MDX files** in `/src/data/blog/articles/`. This is the single source of truth for all blog content.

### Key Files:
- **`/src/data/blog/types.ts`**: Defines the TypeScript interfaces for blog articles
- **`/src/data/blog/blogUtils.ts`**: Contains all utility functions to fetch and process blog data

### Utility Functions (`blogUtils.ts`):
| Function | Description |
|----------|-------------|
| `getAllBlogs()` | Reads all MDX files, parses frontmatter, sorts by date (newest first) |
| `getBlogBySlug(slug)` | Fetches a single article by its slug |
| `getFeaturedBlogs()` | Returns all articles where `featured: true` |
| `getLatestBlogs(limit)` | Returns the most recent `n` articles |
| `getRelatedBlogs(slug, limit)` | Returns articles from the same category (or latest if none) |

---

## Landing Page Blog Section

**File**: `/src/app/page.tsx` and `/src/components/landing/BlogSection.tsx`

### How it works:
1. In `app/page.tsx`, it calls `getLatestBlogs(5)` to get the 5 most recent articles
2. These are passed to the `BlogSection` component
3. `BlogSection` displays them in a carousel (2 cards on desktop, 1 on mobile)

### How to customize:
- **Change number of articles**: Edit `getLatestBlogs(5)` in `app/page.tsx` to any number
- **Control which articles appear**: Articles are sorted by `publishedAt` (newest first). To exclude an article, don't add it to the `articles/` folder, or modify the `getLatestBlogs()` function.

---

## Blog Page (/blog)

**File**: `/src/app/blog/page.tsx`

### Sections:
1. **Hero Section**: Static banner with lead form
2. **Featured Articles**: Displays articles marked as `featured: true` (up to 3)
3. **All Articles**: Displays all articles sorted by date (newest first)

### How to manage featured articles:
- In each MDX article's frontmatter, set `featured: true` or `featured: false`
- Example:
  ```mdx
  ---
  title: "My Article"
  featured: true  # This will appear in Featured Articles
  ---
  ```

### How to change number of featured articles:
- Edit `.slice(0, 3)` in `app/blog/page.tsx` line 36:
  ```typescript
  const featuredBlogs = getFeaturedBlogs().slice(0, 3);
  ```

---

## Individual Article Page

**File**: `/src/app/blog/[slug]/page.tsx`

### How it works:
1. The page uses dynamic routing with `[slug]` parameter
2. It reads the corresponding MDX file from `src/data/blog/articles/{slug}.mdx`
3. Compiles and renders the MDX content with custom components
4. Displays:
   - Breadcrumbs
   - Hero with title, description, category, date, reading time, author
   - Featured image
   - Full article content (from MDX)
   - Author section
   - FAQ section (if defined in frontmatter)
   - CTA section
   - Related articles

### Short vs Full Description:
- **Short description**: Comes from the `description` field in the MDX frontmatter (used on landing page and blog cards)
- **Full content**: Comes from the MDX body (used on the article page)

---

## Adding New Articles

Follow these steps to add a new article:

### Step 1: Create MDX File
Create a new file in `/src/data/blog/articles/` with a `.mdx` extension. The filename should match your slug.

Example filename: `my-new-article.mdx`

### Step 2: Write Frontmatter
Start the file with YAML frontmatter:

```mdx
---
title: "Your Article Title"
description: "Short description for cards and meta tags"
slug: "my-new-article"  # Must match filename without .mdx
image: "/blog-image/your-image.png"
category: "Cleaning Tips"  # Or "Domestic Help", "Home Care", etc.
publishedAt: "2026-06-17"  # YYYY-MM-DD format
author: "Don't Cook Don't Clean"
featured: false  # Set to true to show in Featured Articles
faqs:  # Optional FAQ section
  - question: "Question 1?"
    answer: "Answer 1"
  - question: "Question 2?"
    answer: "Answer 2"
---
```

### Step 3: Add Article Content
Write your article content in Markdown/MDX below the frontmatter.

### Step 4: Add Image
Place your article image in `/public/blog-image/` and reference it in the `image` field of the frontmatter.

---

## MDX Format Guide

MDX is like Markdown but supports React components. Here are the available elements:

### Headings
```mdx
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

### Paragraphs
```mdx
Normal paragraph text.
```

### Lists
```mdx
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

### Bold & Links
```mdx
**Bold text**

[Link text](https://example.com)
```

### Blockquotes
```mdx
> This is a blockquote
```

### Images
```mdx
![Alt text](/blog-image/your-image.png)
```

### Customization
All MDX components are styled in `/src/data/blog/mdx-components.tsx`. You can modify the styling there if needed.

---

## Image Placement

### Where to put images:
- **Article featured images**: `/public/blog-image/`
- **Inline images in articles**: Can be in `/public/blog-image/` or any other public folder

### Image best practices:
- Use descriptive filenames
- Optimize images for web (compress file size)
- Recommended dimensions for featured images: 1200x630px
- Supported formats: PNG, JPG, AVIF, WebP

---

## Pagination Status

**Pagination is NOT currently implemented.**

The blog page (`/blog`) displays ALL articles on a single page. If you have many articles, you may want to implement pagination.

---

## Customizing Article Design

### Can you design individual articles?
**Yes!** Since articles are written in MDX, you have full control over the content structure.

### Options:
1. **Use standard Markdown**: Headings, paragraphs, lists, etc. (already styled)
2. **Modify global MDX styles**: Edit `/src/data/blog/mdx-components.tsx` to change how headings, paragraphs, etc., look across all articles
3. **Add custom components**: You can import and use React components directly in MDX files (though this requires code changes)

### Example of styled content:
The existing articles show how to structure content with headings, lists, etc. The styles are automatically applied.

---

## Important Notes

1. **All data from MDX**: All blog content comes from MDX files in `/src/data/blog/articles/`
2. **Slug must match filename**: The `slug` field in frontmatter must exactly match the filename (without `.mdx`)
3. **Date format**: Use `YYYY-MM-DD` for `publishedAt`
4. **Reading time**: Automatically calculated based on word count (200 words per minute)
5. **Static generation**: Article pages are statically generated at build time for performance

---

## Troubleshooting

- **Article not showing up?** Make sure:
  - The MDX file is in `/src/data/blog/articles/`
  - The filename ends with `.mdx`
  - Frontmatter is valid YAML
  - You've restarted the dev server if needed

- **Featured article not appearing?** Check that `featured: true` is set in the frontmatter

- **Image not loading?** Verify the image path is correct and the file exists in `/public/`
