
# Comprehensive Codebase Audit Report

## Executive Summary
This report provides a complete audit of the "Don't Cook Don't Clean" modern web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The application is a maid and domestic help service website serving Patna, Bihar.

---

## PART 1: ORIGINAL ARCHITECTURAL AUDIT

## 1. Project Structure Audit

### 1.1 Folder Hierarchy
```
modern-web/
├── public/
│   ├── blog-image/
│   ├── images/
│   │   └── review/
│   ├── images_old/
│   │   └── review/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── fonts/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── About.tsx
│   │   ├── BlogSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LeadForm.tsx
│   │   ├── Process.tsx
│   │   ├── ReviewsCarousel.tsx
│   │   ├── ReviewsHero.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── Services.tsx
│   │   ├── SupportSection.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── WhyUs.tsx
│   └── data/
│       ├── blog/
│       │   └── blogs.ts
│       ├── faqs.ts
│       └── reviews.ts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

### 1.2 App Router Structure
The application uses Next.js App Router with a single home page at `src/app/page.tsx`. The root layout is defined in `src/app/layout.tsx`.

### 1.3 Configuration Files
- **package.json**: Next.js 16.2.9, React 19.2.4, Tailwind CSS, Framer Motion
- **tsconfig.json**: Strict TypeScript configuration with path aliases (@/* mapping to src/)
- **next.config.ts**: Image optimization enabled for AVIF and WebP formats
- **postcss.config.mjs**: Tailwind CSS PostCSS config
- **eslint.config.mjs**: ESLint configuration for code quality

### 1.4 Key Dependencies
```json
{
  "framer-motion": "^12.40.0",
  "next": "16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4"
}
```

## 2. Design System Audit

### 2.1 Typography System

#### Fonts
- **Headings**: Alkatra (variable font via Google Fonts)
- **Body**: Quicksand (variable font via Google Fonts)
- **Local Fonts**: `Parkinsans-Medium.ttf` and `Parkinsans-Regular.ttf` exist in `src/app/fonts/` but are **not used** in the application

#### Typography Classes
| Class | Font Family | Weight | Size (Desktop) | Size (Mobile) | Line Height | Usage |
|-------|-------------|--------|----------------|---------------|-------------|-------|
| `.h1` | Alkatra | 600 | 3rem | 2.5rem | 1.15 | Main page headings |
| `.h2` | Alkatra | 600 | 2.5rem | 2rem | 1.15 | Section headings |
| `.h3` | Alkatra | 600 | 2rem | 1.75rem | 1.2 | Sub-section headings |
| `.h4` | Quicksand | 600 | 1.5rem | - | - | Small headings, labels |
| `.body` | Quicksand | 400 | 1rem | - | 1.7 | Body text |
| `.small-text` | Quicksand | 400 | 0.875rem | - | - | Small text, captions |

#### Button Typography
- Font: Quicksand
- Weight: 600
- Size: 1rem

### 2.2 Color System

| Variable | Hex Value | Usage Locations |
|----------|-----------|-----------------|
| `--primary` | `#3CA200` | Primary buttons, accents, highlights |
| `--secondary` | `#F2D701` | Secondary buttons, star ratings |
| `--text-primary` | `#111111` | Main text content |
| `--text-secondary` | `#64748B` | Secondary text, muted content |
| `--background` | `#F4F6F0` | Page background |
| `--white` | `#FFFFFF` | Cards, components background |
| `--border-color` | `rgba(0,0,0,0.1)` | Border lines |

#### Button States
- Primary: Green background (`#3CA200`), white text
- Secondary: Yellow background (`#F2D701`), dark text
- Outline: White background, green border, green text
- Hover: Scale transform (1.02x)

### 2.3 Layout System

#### Containers
- Max width: `1280px`
- Horizontal padding: `24px`

#### Spacing
- Section vertical padding: `100px` (via `.section` class)
- Card padding: `32px`

#### Border Radius
- Buttons: `24px`
- Cards: `24px`
- Form inputs: `16px`
- Hero video bottom: `32px`
- Footer top: `48px` (desktop: `64px`)

#### Shadow System
- Card shadow: `0 10px 30px rgba(0,0,0,0.08)` (variable: `--shadow-card`)

#### Responsive Breakpoints
Uses Tailwind CSS default breakpoints: `md` (768px), `lg` (1024px)

## 3. Component Inventory

### 3.1 Component List

| Component | File | Type | Purpose | Reusability |
|-----------|------|------|---------|-------------|
| Hero | Hero.tsx | Server (with dynamic client import) | Hero section with video and lead form | Medium |
| LeadForm | LeadForm.tsx | Client | Lead capture form with name, service, shift, email, phone, duration | High |
| Services | Services.tsx | Server | Service offerings display | Medium |
| Process | Process.tsx | Server | Process explanation and plans | Medium |
| About | About.tsx | Client | Company information and accordion | Medium |
| WhyUs | WhyUs.tsx | Client | Benefits section with parallax leaves | Medium |
| ReviewsHero | ReviewsHero.tsx | Server | Reviews introduction with hero image | Low |
| ReviewsCarousel | ReviewsCarousel.tsx | Client | Auto-rotating review cards | High |
| BlogSection | BlogSection.tsx | Client | Blog carousel (currently commented out) | High |
| FaqSection | FaqSection.tsx | Client | FAQ accordion grid | High |
| SupportSection | SupportSection.tsx | Server | Support contact form | Medium |
| Footer | Footer.tsx | Client | Footer with links and CTA | Medium |
| SectionLabel | SectionLabel.tsx | Server | Section label (uppercase, small) | High |
| VideoPlayer | VideoPlayer.tsx | Client | Background video player for hero | Low |

### 3.2 Component Details

#### LeadForm (src/components/LeadForm.tsx)
- **Props**: None
- **State**: `formData` object with all input values
- **Form Fields**: Name, Service Required, Shift Preference, Email, Phone, Engagement Duration
- **Validation**: Basic HTML5 validation (required attributes)
- **Submission**: Logs to console and shows alert

#### ReviewsCarousel (src/components/ReviewsCarousel.tsx)
- **Data Source**: `@/data/reviews`
- **Behavior**: Auto-rotates every 5 seconds, shows 3 cards on desktop, 1-2 on mobile
- **Navigation**: Dot indicators

#### BlogSection (src/components/BlogSection.tsx)
- **Status**: Commented out in page.tsx
- **Data Source**: `@/data/blog/blogs`
- **Behavior**: Manual navigation carousel, shows 1-2 cards

## 4. Content Audit

### 4.1 Page Sections &amp; Content
1. **Hero**: 
   - Heading: "Hire Trusted Maids in Patna for Cooking, Cleaning &amp; Household Care"
   - Subheading: Explains services available

2. **About**:
   - Heading: "Bringing Reliable Domestic Help to Every Home"
   - Accordion: Verified &amp; Experienced Maids, ID-Verified Domestic Helpers

3. **Services**:
   - Heading: "Household Services for Every Family"
   - Cards: Maid Services, Child &amp; Elder Care, Specialized Assistance, Satisfaction Guarantee

4. **Process**:
   - Heading: "What to Expect From Don't Cook Don't Clean"
   - Plans: Part-Time Maid, Full-Time Maid, Live-In Maid
   - Steps: 3-step process

5. **Why Us**:
   - Heading: "The Don't Cook Don't Clean Difference"
   - Benefits: Background &amp; ID Verification, Replacement Support, Friendly and Reliable Helpers, Flexible Service Plans, Dedicated Customer Care, Household-Specific Matching

6. **Reviews**:
   - Heading: "Helping Families Live More Comfortably"
   - 15 customer reviews

7. **Support**:
   - Heading: "Need Help? We're Here to Assist"
   - Support form

8. **FAQ**:
   - Heading: "Frequently Asked Questions"
   - 6 questions and answers

## 5. Blog System Audit

### 5.1 Current Blog Architecture
- **Data Source**: `src/data/blog/blogs.ts` (array of 5 blog posts)
- **Blog Fields**: `id`, `category`, `title`, `slug`, `image`, `publishedAt`
- **Images**: 2 images exist in `public/blog-image/`, 3 images reference non-existent files in `public/images/`
- **Display**: BlogSection component exists but is commented out in page.tsx

### 5.2 Blog Post Inventory
| ID | Title | Category | Image Status |
|----|-------|----------|--------------|
| 1 | 7 Simple Habits That Keep Your Home Cleaner Every Day | Cleaning Tips | ✅ Exists |
| 2 | How to Choose the Right Maid for Your Family's Needs | Domestic Help | ✅ Exists |
| 3 | A Weekly House Cleaning Checklist for Busy Families | Home Care | ❌ Missing |
| 4 | 5 Ways Professional Domestic Help Can Save You Time | Household Tips | ❌ Missing |
| 5 | Balancing Work and Home Life with Reliable Household Support | Family Lifestyle | ❌ Missing |

### 5.3 MDX Migration Recommendations
1. **Files to Add**:
   - `src/content/config.ts` (Contentlayer config)
   - `src/content/blog/[slug].mdx` files for each blog post
   - `src/app/blog/[slug]/page.tsx` (blog post page)
   - `src/app/blog/page.tsx` (blog index page)

2. **Files to Change**:
   - `BlogSection.tsx`: Link to individual blog post pages
   - `page.tsx`: Uncomment BlogSection
   - `layout.tsx`: Add blog section to metadata
   - `sitemap.xml`: Add blog URLs

3. **Recommended Folder Structure**:
   ```
   src/
   ├── content/
   │   ├── blog/
   │   │   ├── 7-simple-habits.mdx
   │   │   └── ... (other blog posts)
   │   └── config.ts
   └── app/
       └── blog/
           ├── page.tsx
           └── [slug]/
               └── page.tsx
   ```

## 6. SEO Audit

### 6.1 Current SEO Implementation
- **Metadata**: Defined in `src/app/layout.tsx`
  - Title: "Trusted Maid &amp; Cook Services in Patna | Don't Cook Don't Clean"
  - Description: Comprehensive service description
  - Keywords: 10 relevant keywords
  - Canonical URL: `https://dontcookdontclean.in/`
  - Open Graph: Title, description, image
  - Twitter Card: Summary large image

- **Structured Data**: Two JSON-LD scripts
  1. LocalBusiness with service details, ratings, contact info
  2. FAQPage with 6 FAQ items

- **Robots.txt**: Allows all crawlers, links to sitemap
- **Sitemap.xml**: Only includes homepage, lastmod 2026-06-13

### 6.2 Missing SEO Elements
1. No dynamic sitemap generation
2. No individual blog post SEO
3. No Open Graph images for all sections
4. No alt text audit (some images have alt text, some don't)

## 7. Form System Audit

### 7.1 Forms
1. **Lead Form** (LeadForm.tsx)
   - Fields: Name, Service, Shift, Email, Phone, Duration
   - Validation: HTML5 required attributes
   - Submission: Console log + alert
   - Accessibility: Aria attributes, sr-only labels

2. **Support Form** (SupportSection.tsx)
   - Fields: Name, Phone, Email, How can we help?, Message
   - Validation: HTML5 required on name/phone
   - Submission: Not implemented (no handler)
   - Accessibility: Labels present

## 8. Image System Audit

### 8.1 Image Inventory
- **Main Images**: 14 images in `public/images/` (AVIF format)
- **Review Avatars**: 16 images in `public/images/review/` (AVIF format)
- **Blog Images**: 2 images in `public/blog-image/` (PNG format)
- **Old Images**: Legacy JPG/PNG versions exist in `public/images_old/` (not used)
- **Video**: `hero_Video.mp4` in `public/images/`

### 8.2 next/image Usage
- All images use Next.js Image component with proper `width`, `height`, and `sizes` attributes
- Priority loading on logo and hero images
- Object-cover or object-contain as appropriate

### 8.3 Missing/Broken Images
- 3 blog post images are missing (referenced in blogs.ts but not present)

## 9. Style Guide Extraction

### 9.1 Typography Scale
```
h1: 3rem / 1.15 (mobile: 2.5rem)
h2: 2.5rem / 1.15 (mobile: 2rem)
h3: 2rem / 1.2 (mobile: 1.75rem)
h4: 1.5rem
body: 1rem / 1.7
small-text: 0.875rem
```

### 9.2 Color Palette
```
primary: #3CA200
secondary: #F2D701
text-primary: #111111
text-secondary: #64748B
background: #F4F6F0
white: #FFFFFF
border: rgba(0,0,0,0.1)
```

### 9.3 Spacing Scale
```
section-y: 100px
container-padding-x: 24px
card-padding: 32px
gap: 6px-24px
```

### 9.4 Border Radius Scale
```
sm: 16px (form inputs)
md: 24px (buttons, cards)
lg: 32px (hero video bottom)
xl: 48px-64px (footer top)
```

### 9.5 Button Styles
```
Primary:
  bg: #3CA200
  text: white
  height: 52px
  radius: 24px
  hover: scale(1.02)

Secondary:
  bg: #F2D701
  text: #111111
  height: 52px
  radius: 24px
  hover: scale(1.02)

Outline:
  bg: white
  border: 1px solid #3CA200
  text: #3CA200
  height: 52px
  radius: 24px
  hover: scale(1.02)
```

## 10. Action Items

1. **Fix Missing Blog Images**: Add 3 missing blog images
2. **Implement Form Submission**: Connect LeadForm and SupportForm to backend API
3. **Uncomment Blog Section**: Activate BlogSection in page.tsx
4. **MDX Blog Migration**: Implement full MDX blog system with individual post pages
5. **Dynamic Sitemap**: Generate sitemap programmatically including blog posts
6. **SEO Enhancements**: Add OpenGraph images for all sections, improve alt text
7. **Clean Up**: Remove unused Parkinsans fonts and images_old directory
8. **Accessibility**: Complete accessibility audit and improvements

---

## PART 2: DEEP DESIGN SYSTEM + CODE RELATIONSHIP AUDIT

## 11. DESIGN TOKEN EXTRACTION (src/app/globals.css)

### 11.1 CSS Variables
```css
:root {
  /* Base Colors */
  --background: #F4F6F0;
  --foreground: #111111;

  /* Color System */
  --primary: #3CA200;
  --secondary: #F2D701;
  --text-primary: #111111;
  --text-secondary: #64748B;
  --white: #FFFFFF;
  --border-color: rgba(0, 0, 0, 0.1);
  
  /* Shadow System */
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.08);
  
  /* Spacing System */
  --section-spacing-y: 100px;
  --container-max-width: 1280px;
  
  /* Typography System */
  --font-headings: var(--font-alkatra);
  --font-body: var(--font-quicksand);
  --font-sans: var(--font-quicksand);
}
```

### 11.2 Tailwind Theme Variables
```css
@theme {
  /* Colors */
  --color-primary: #3CA200;
  --color-secondary: #F2D701;
  --color-text-primary: #111111;
  --color-text-secondary: #64748B;
  --color-background: #F4F6F0;
  --color-white: #FFFFFF;
  --color-border: rgba(0, 0, 0, 0.1);
  
  /* Fonts */
  --font-alkatra: var(--font-alkatra);
  --font-quicksand: var(--font-quicksand);
}
```

### 11.3 Animation Variables
- `transition: transform 200ms ease;` (button hover)
- `transition: border-color 200ms ease;` (form input focus)

---

## 12. REUSABLE CLASS INVENTORY

### 12.1 Typography Classes

#### `.h1`
```css
.h1 {
  font-family: var(--font-headings);
  font-weight: 600;
  font-size: 3rem;
  line-height: 1.15;
}
@media (max-width: 768px) {
  .h1 { font-size: 2.5rem; }
}
```
**Usage Locations**: Hero.tsx
**Responsive**: Mobile (768px)
**Dependencies**: `--font-headings` (Alkatra)

#### `.h2`
```css
.h2 {
  font-family: var(--font-headings);
  font-weight: 600;
  font-size: 2.5rem;
  line-height: 1.15;
}
@media (max-width: 768px) {
  .h2 { font-size: 2rem; }
}
```
**Usage Locations**: About.tsx, Services.tsx, Process.tsx, WhyUs.tsx, ReviewsHero.tsx, FaqSection.tsx
**Responsive**: Mobile (768px)
**Dependencies**: `--font-headings` (Alkatra)

#### `.h3`
```css
.h3 {
  font-family: var(--font-headings);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.2;
}
@media (max-width: 768px) {
  .h3 { font-size: 1.75rem; }
}
```
**Usage Locations**: Process.tsx, BlogSection.tsx
**Responsive**: Mobile (768px)
**Dependencies**: `--font-headings` (Alkatra)

#### `.h4`
```css
.h4 {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.5rem;
}
```
**Usage Locations**: About.tsx, Services.tsx, ReviewsCarousel.tsx, Footer.tsx
**Responsive**: None
**Dependencies**: `--font-body` (Quicksand)

#### `.body`
```css
.body {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
}
```
**Usage Locations**: Hero.tsx, About.tsx, Services.tsx, Process.tsx, WhyUs.tsx, ReviewsHero.tsx, ReviewsCarousel.tsx, SupportSection.tsx, Footer.tsx
**Responsive**: None
**Dependencies**: `--font-body` (Quicksand)

#### `.small-text`
```css
.small-text {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.875rem;
}
```
**Usage Locations**: ReviewsHero.tsx, ReviewsCarousel.tsx, SupportSection.tsx, Footer.tsx
**Responsive**: None
**Dependencies**: `--font-body` (Quicksand)

### 12.2 Button Classes

#### `.btn-primary`
```css
.btn-primary {
  background-color: var(--primary);
  color: var(--white);
  border-radius: 24px;
  height: 52px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease;
}
.btn-primary:hover { transform: scale(1.02); }
```
**Usage Locations**: Services.tsx, Process.tsx, BlogSection.tsx, Footer.tsx
**Responsive**: None
**Dependencies**: `--primary`, `--white`, `--font-body`
**Animation**: `transform 200ms ease` on hover

#### `.btn-secondary`
```css
.btn-secondary {
  background-color: var(--secondary);
  color: var(--text-primary);
  border-radius: 24px;
  height: 52px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease;
}
.btn-secondary:hover { transform: scale(1.02); }
```
**Usage Locations**: LeadForm.tsx, SupportSection.tsx
**Responsive**: None
**Dependencies**: `--secondary`, `--text-primary`, `--font-body`
**Animation**: `transform 200ms ease` on hover

#### `.btn-outline`
```css
.btn-outline {
  background-color: var(--white);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 24px;
  height: 52px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease;
}
.btn-outline:hover { transform: scale(1.02); }
```
**Usage Locations**: None in current codebase (defined but unused)
**Responsive**: None
**Dependencies**: `--white`, `--primary`, `--font-body`
**Animation**: `transform 200ms ease` on hover

### 12.3 Layout Classes

#### `.card`
```css
.card {
  background-color: var(--white);
  border-radius: 24px;
  box-shadow: var(--shadow-card);
  padding: 32px;
}
```
**Usage Locations**: None directly, but components use similar styling
**Dependencies**: `--white`, `--shadow-card`

#### `.section`
```css
.section {
  padding-top: var(--section-spacing-y);
  padding-bottom: var(--section-spacing-y);
}
```
**Usage Locations**: Services.tsx, Process.tsx, About.tsx, WhyUs.tsx, BlogSection.tsx, FaqSection.tsx, SupportSection.tsx
**Dependencies**: `--section-spacing-y` (100px)

#### `.container`
```css
.container {
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}
```
**Usage Locations**: Hero.tsx, About.tsx, Services.tsx, Process.tsx, WhyUs.tsx, ReviewsHero.tsx, ReviewsCarousel.tsx, BlogSection.tsx, FaqSection.tsx, SupportSection.tsx, Footer.tsx
**Dependencies**: `--container-max-width` (1280px)

### 12.4 Form Classes

#### `.form-input`
```css
.form-input {
  height: 52px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  font-family: var(--font-body);
  padding: 0 16px;
  width: 100%;
  transition: border-color 200ms ease;
}
.form-input:focus {
  outline: none;
  border-color: var(--primary);
}
```
**Usage Locations**: LeadForm.tsx, SupportSection.tsx
**Dependencies**: `--border-color`, `--font-body`, `--primary`
**Animation**: `border-color 200ms ease` on focus

#### `.form-textarea`
```css
.form-textarea {
  border-radius: 16px;
  border: 1px solid var(--border-color);
  font-family: var(--font-body);
  padding: 16px;
  width: 100%;
  transition: border-color 200ms ease;
}
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
}
```
**Usage Locations**: SupportSection.tsx
**Dependencies**: `--border-color`, `--font-body`, `--primary`
**Animation**: `border-color 200ms ease` on focus

### 12.5 Utility Classes

#### `.hide-scrollbar`
```css
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}
```
**Usage Locations**: None in current codebase (defined but unused)

---

## 13. FONT SYSTEM AUDIT (src/app/layout.tsx)

### 13.1 Font Imports
```typescript
import { Alkatra, Quicksand } from "next/font/google";
```

### 13.2 Font Configuration

#### Alkatra (Headings)
```typescript
const alkatra = Alkatra({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alkatra",
  display: "swap",
});
```
- **Usage**: Headings (h1, h2, h3)
- **CSS Variable**: `--font-alkatra`
- **Weights**: 400, 500, 600, 700
- **Subset**: Latin
- **Display**: Swap

#### Quicksand (Body)
```typescript
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});
```
- **Usage**: Body text (body, small-text, h4, buttons, forms)
- **CSS Variable**: `--font-quicksand`
- **Weights**: 300, 400, 500, 600, 700
- **Subset**: Latin
- **Display**: Swap

### 13.3 Font Application in HTML
```typescript
<html
  lang="en"
  className={`${alkatra.variable} ${quicksand.variable} h-full antialiased`}
>
```
- Both fonts applied as CSS variables to `html` tag

### 13.4 Unused Fonts
- **Parkinsans-Medium.ttf** in `src/app/fonts/` - NOT USED
- **Parkinsans-Regular.ttf** in `src/app/fonts/` - NOT USED

### 13.5 Final Rendered Font Hierarchy
```
HTML Document
├── html
│   ├── --font-alkatra (Alkatra: 400, 500, 600, 700)
│   └── --font-quicksand (Quicksand: 300, 400, 500, 600, 700)
└── body
    ├── font-family: var(--font-body), sans-serif (Quicksand)
    ├── h1, h2, h3: var(--font-headings) (Alkatra)
    ├── h4, body, small-text, buttons, forms: var(--font-body) (Quicksand)
```

---

## 14. HOMEPAGE COMPOSITION MAP (src/app/page.tsx)

### 14.1 Render Tree
```
Home Page
├── <main className="flex flex-col min-h-screen">
    ├── Hero
    │   └── [video background]
    │       └── LeadForm (dynamic)
    ├── About
    │   └── SectionLabel
    ├── Services
    │   └── SectionLabel
    ├── Process
    │   └── SectionLabel
    ├── WhyUs
    │   └── SectionLabel
    ├── ReviewsHero
    │   └── SectionLabel
    ├── ReviewsCarousel (dynamic)
    ├── SupportSection (dynamic)
    ├── FaqSection (dynamic)
    ├── [BlogSection] (COMMENTED OUT)
    └── Footer
```

### 14.2 Actual Component Order
1. Hero
2. About
3. Services
4. Process
5. WhyUs
6. ReviewsHero
7. ReviewsCarousel
8. SupportSection
9. FaqSection
10. [BlogSection] - Commented
11. Footer

### 14.3 Dynamic Imports
```typescript
const ReviewsCarousel = dynamic(() => import("@/components/ReviewsCarousel"), { loading: () => null });
const SupportSection = dynamic(() => import("@/components/SupportSection"), { loading: () => null });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { loading: () => null });
```
- Lazy loaded with no loading state

---

## 15. COMPONENT DEPENDENCY GRAPH

### 15.1 Component Imports & Dependencies

#### Hero.tsx
```
Imports:
  - Image from "next/image"
  - dynamic from "next/dynamic"
  - LeadForm from "@/components/LeadForm"
  - VideoPlayer (dynamic)

Data Sources: None

Child Components:
  - VideoPlayer
  - LeadForm
```

#### LeadForm.tsx
```
Imports:
  - useState from "react"

Data Sources: None

Child Components: None
```

#### Services.tsx
```
Imports:
  - SectionLabel from "./SectionLabel"
  - Image from "next/image"

Data Sources: Inline (services array)

Child Components:
  - SectionLabel
```

#### Process.tsx
```
Imports:
  - SectionLabel from "./SectionLabel"
  - Image from "next/image"

Data Sources: Inline (plans array, steps array)

Child Components:
  - SectionLabel
```

#### About.tsx
```
Imports:
  - Image from "next/image"
  - useState from "react"
  - SectionLabel from "./SectionLabel"

Data Sources: Inline (accordionItems array)

Child Components:
  - SectionLabel
```

#### WhyUs.tsx
```
Imports:
  - Image from "next/image"
  - motion, useScroll, useTransform from "framer-motion"
  - SectionLabel from "./SectionLabel"

Data Sources: Inline (benefits array)

Child Components:
  - SectionLabel
```

#### ReviewsHero.tsx
```
Imports:
  - Image from "next/image"
  - SectionLabel from "./SectionLabel"

Data Sources: None

Child Components:
  - SectionLabel
```

#### ReviewsCarousel.tsx
```
Imports:
  - useEffect, useState from "react"
  - Image from "next/image"
  - reviews from "@/data/reviews"

Data Sources:
  - @/data/reviews

Child Components: None
```

#### BlogSection.tsx
```
Imports:
  - useState, useRef, useEffect from "react"
  - Image from "next/image"
  - blogs, BlogPost from "@/data/blog/blogs"
  - SectionLabel from "./SectionLabel"

Data Sources:
  - @/data/blog/blogs

Child Components:
  - SectionLabel
  - BlogCard (internal component)
```

#### FaqSection.tsx
```
Imports:
  - useState from "react"
  - faqs from "@/data/faqs"
  - SectionLabel from "./SectionLabel"

Data Sources:
  - @/data/faqs

Child Components:
  - SectionLabel
  - FaqCard (internal component)
```

#### SupportSection.tsx
```
Imports:
  - SectionLabel from "./SectionLabel"

Data Sources: None

Child Components:
  - SectionLabel
```

#### Footer.tsx
```
Imports:
  - Image from "next/image"
  - Script from "next/script"

Data Sources: None

Child Components: None
```

#### SectionLabel.tsx
```
Imports: None

Data Sources: None

Child Components: None
```

#### VideoPlayer.tsx
```
Imports:
  - useEffect, useRef from "react"

Data Sources: None

Child Components: None
```

### 15.2 Data Files
- **src/data/reviews.ts**: 15 review objects
- **src/data/faqs.ts**: 6 FAQ objects
- **src/data/blog/blogs.ts**: 5 blog post objects

---

## 16. MOTION & ANIMATION AUDIT

### 16.1 Framer Motion Usage
**Only in WhyUs.tsx**

#### Motion Components
```typescript
import { motion, useScroll, useTransform } from "framer-motion";
```

#### Scroll Animations
```typescript
const { scrollY } = useScroll();

const leaf1Y = useTransform(scrollY, [0, 1200], [0, 35]);
const leaf2Y = useTransform(scrollY, [0, 1200], [0, 60]);
```
- **Parallax Effect**: Two leaf images move vertically on scroll
- **Input Range**: [0, 1200] scrollY
- **Output Range Leaf 1**: [0, 35]px
- **Output Range Leaf 2**: [0, 60]px

#### Animated Elements
```typescript
<motion.div style={{ y: leaf1Y }} className="absolute -top-6 left-2 z-20">
  <Image src="/images/growth-close-up-environmental-lush-natural.avif" ... />
</motion.div>

<motion.div style={{ y: leaf2Y }} className="absolute top-12 -left-14 z-20">
  <Image src="/images/growth-close-up-environmental-lush-natural-copy.avif" ... />
</motion.div>
```

### 16.2 CSS Hover Animations
- **Buttons**: `transform: scale(1.02)` with `transition: transform 200ms ease`
- **Form Inputs**: `border-color` transition with `transition: border-color 200ms ease` on focus

### 16.3 Auto-Rotating Carousel
**In ReviewsCarousel.tsx**
```typescript
useEffect(() => {
  if (reviews.length <= 1) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  }, 5000);

  return () => clearInterval(interval);
}, []);
```
- **Interval**: 5000ms (5 seconds)
- **Behavior**: Cycles through reviews automatically

---

## 17. IMAGE STRATEGY AUDIT

### 17.1 Image Inventory by Component

#### Hero.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Logo | `/images/logo.avif` | 160x64 | Yes |
| Hero Poster | `/images/hero_poster.avif` | - | Preloaded in head |
| Hero Video | `/images/hero_Video.mp4` | - | Preloaded in head |

#### About.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| About Image | `/images/who-we-are.avif` | 1024x814 | No |

#### Services.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Maid Service Icon | `/images/maid_service.avif` | 48x48 | No |
| Child Elder Care Icon | `/images/child_elder_care.avif` | 48x48 | No |
| Specialized Assistance Icon | `/images/specialized_assistance.avif` | 48x48 | No |

#### Process.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Requirements Icon | `/images/requirements.avif` | 48x48 | No |
| Matched Icon | `/images/matched.avif` | 48x48 | No |
| Support Icon | `/images/support.avif` | 48x48 | No |

#### WhyUs.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Leaf 1 | `/images/growth-close-up-environmental-lush-natural.avif` | 55x55 | No |
| Leaf 2 | `/images/growth-close-up-environmental-lush-natural-copy.avif` | 95x95 | No |
| Why Us Main | `/images/why_us.avif` | - | No (fill) |

#### ReviewsHero.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Review Hero | `/images/review_heroNabber.avif` | 1024x631 | Yes (eager) |
| Review Avatar Floating | `/images/review/review_female_1.avif` | 34x34 | No |

#### ReviewsCarousel.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Review Avatars (16) | `/images/review/*.avif` | 52x52 | No |

#### BlogSection.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Blog 1 | `/blog-image/7-Simple-Habits-That-Keep-Your-Home-Cleaner-Every-Day.png` | - | No (fill) |
| Blog 2 | `/blog-image/How-to-Choose-the-Right-Maid-for-Your-Family-s-Needs.png` | - | No (fill) |
| Blog 3 | `/images/GettyImages-1456829711.jpg` | - | ❌ MISSING |
| Blog 4 | `/images/GettyImages-532846352-1024x631.jpg` | - | ❌ MISSING |
| Blog 5 | `/images/gettyimages-931846502-2048x2048-2-1024x814.jpg` | - | ❌ MISSING |

#### SupportSection.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Support Banner | `/images/support_banner.avif` | - | No (background) |

#### Footer.tsx
| Image | Path | Dimensions | Priority |
|-------|------|-----------|---------|
| Logo | `/images/logo.avif` | 220x80 | Yes |

### 17.2 Image Format Strategy
- **Main Images**: AVIF (modern, efficient format)
- **Blog Images**: PNG (legacy format, should be converted to AVIF)
- **Review Avatars**: AVIF

### 17.3 next/image Usage Patterns
- **Priority**: Logo, Hero Poster, Review Hero
- **Eager Loading**: Review Hero
- **Fill Container**: Used for hero images and blog cards
- **Object Cover/Contain**: Used appropriately
- **Sizes Attribute**: Used on responsive images

---

## 18. MDX DESIGN REQUIREMENTS

### 18.1 Typography for MDX

Based on existing design system:

```css
/* MDX Heading 1 */
.mdx-h1 {
  font-family: var(--font-headings);
  font-weight: 600;
  font-size: 3rem;
  line-height: 1.15;
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .mdx-h1 { font-size: 2.5rem; }
}

/* MDX Heading 2 */
.mdx-h2 {
  font-family: var(--font-headings);
  font-weight: 600;
  font-size: 2.5rem;
  line-height: 1.15;
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .mdx-h2 { font-size: 2rem; }
}

/* MDX Heading 3 */
.mdx-h3 {
  font-family: var(--font-headings);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.2;
  color: var(--text-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
@media (max-width: 768px) {
  .mdx-h3 { font-size: 1.75rem; }
}

/* MDX Heading 4 */
.mdx-h4 {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

/* MDX Paragraph */
.mdx-p {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

/* MDX Unordered List */
.mdx-ul {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
.mdx-ul li {
  margin-bottom: 0.5rem;
  list-style-type: disc;
}

/* MDX Ordered List */
.mdx-ol {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
.mdx-ol li {
  margin-bottom: 0.5rem;
  list-style-type: decimal;
}

/* MDX Blockquote */
.mdx-blockquote {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-primary);
  border-left: 4px solid var(--primary);
  padding-left: 1.5rem;
  margin: 2rem 0;
  background-color: rgba(60, 162, 0, 0.05);
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
  border-radius: 0 24px 24px 0;
}

/* MDX Strong/Bold */
.mdx-strong {
  font-weight: 600;
  color: var(--text-primary);
}

/* MDX Table */
.mdx-table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 1rem;
}
.mdx-table thead {
  background-color: var(--primary);
  color: var(--white);
}
.mdx-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}
.mdx-table tbody tr {
  border-bottom: 1px solid var(--border-color);
}
.mdx-table tbody tr:nth-child(even) {
  background-color: rgba(60, 162, 0, 0.03);
}
.mdx-table td {
  padding: 1rem;
  color: var(--text-secondary);
}

/* MDX Code (inline) */
.mdx-code {
  font-family: monospace;
  font-size: 0.875rem;
  background-color: var(--white);
  color: var(--primary);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

/* MDX Pre (code block) */
.mdx-pre {
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  box-shadow: var(--shadow-card);
}
.mdx-pre code {
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-primary);
}

/* MDX Image */
.mdx-img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  margin: 2rem 0;
  box-shadow: var(--shadow-card);
}

/* MDX Link */
.mdx-a {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 200ms ease;
}
.mdx-a:hover {
  opacity: 0.8;
}
```

### 18.2 MDX Component Mapping
```typescript
const MDXComponents = {
  h1: (props) => <h1 className="mdx-h1" {...props} />,
  h2: (props) => <h2 className="mdx-h2" {...props} />,
  h3: (props) => <h3 className="mdx-h3" {...props} />,
  h4: (props) => <h4 className="mdx-h4" {...props} />,
  p: (props) => <p className="mdx-p" {...props} />,
  ul: (props) => <ul className="mdx-ul" {...props} />,
  ol: (props) => <ol className="mdx-ol" {...props} />,
  li: (props) => <li {...props} />,
  blockquote: (props) => <blockquote className="mdx-blockquote" {...props} />,
  strong: (props) => <strong className="mdx-strong" {...props} />,
  table: (props) => <table className="mdx-table" {...props} />,
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  code: (props) => {
    const { children, className, ...rest } = props;
    const isCodeBlock = className?.includes('language-');
    return isCodeBlock 
      ? <pre className="mdx-pre"><code {...rest}>{children}</code></pre>
      : <code className="mdx-code" {...rest}>{children}</code>;
  },
  a: (props) => <a className="mdx-a" {...props} />,
  // Custom Image component to use next/image
  img: (props) => {
    // Handle with next/image in actual implementation
    return <img className="mdx-img" {...props} />;
  },
};
```

---

## 19. BLOG SYSTEM IMPACT ANALYSIS

### 19.1 Files to Create
| File | Path | Purpose | Risk |
|------|------|---------|------|
| Content Config | `src/content/config.ts` | Configure Contentlayer or MDX | Low |
| Blog Posts (5) | `src/content/blog/*.mdx` | Actual blog content | Low |
| Blog Index Page | `src/app/blog/page.tsx` | Blog listing page | Low |
| Blog Post Page | `src/app/blog/[slug]/page.tsx` | Individual blog post | Low |
| MDX Styles | `src/app/blog/mdx.css` | MDX component styles | Low |

### 19.2 Files to Modify
| File | Changes Required | Risk |
|------|-----------------|------|
| `src/components/BlogSection.tsx` | Update blog cards to link to individual pages | Low |
| `src/app/page.tsx` | Uncomment BlogSection component | Very Low |
| `src/app/layout.tsx` | Add blog metadata (optional) | Low |
| `public/sitemap.xml` | Add blog post URLs | Low |
| `src/data/blog/blogs.ts` | Update image paths to valid images | Low |

### 19.3 Files to Leave Untouched
- All other components
- All other data files
- `globals.css` (extend with MDX styles in separate file)
- Configuration files
- Public images (except adding missing blog images)

### 19.4 Risk Assessment
- **Overall Risk**: LOW
- **No Breaking Changes**: MDX blog is additive, doesn't modify existing functionality
- **Design Consistency**: MDX styles follow existing design system exactly
- **Gradual Rollout**: Can be implemented and tested incrementally

---

## 20. FINAL IMPLEMENTATION BLUEPRINT (MDX Blog System)

### Step 1: Set Up MDX Infrastructure
1. Install MDX dependencies (if not already present)
2. Create `src/content/config.ts` for MDX configuration
3. Create folder structure: `src/content/blog/`

### Step 2: Create MDX Content Files
1. Convert existing blog data to MDX files:
   - `7-simple-habits-that-keep-your-home-cleaner-every-day.mdx`
   - `how-to-choose-the-right-maid-for-your-familys-needs.mdx`
   - `a-weekly-house-cleaning-checklist-for-busy-families.mdx`
   - `5-ways-professional-domestic-help-can-save-you-time.mdx`
   - `balancing-work-and-home-life-with-reliable-household-support.mdx`
2. Include frontmatter: title, category, slug, publishedAt, image
3. Add actual content to each MDX file

### Step 3: Add/Verify Blog Images
1. Add 3 missing blog images to `public/blog-image/`
2. Convert all blog images to AVIF format for consistency
3. Update image paths in MDX frontmatter

### Step 4: Create Blog Index Page
1. Create `src/app/blog/page.tsx`
2. Use existing design system: `.container`, `.section`, `.h1`, etc.
3. Display all blog posts as cards (reuse BlogCard pattern from BlogSection)
4. Apply responsive grid layout

### Step 5: Create Blog Post Page
1. Create `src/app/blog/[slug]/page.tsx`
2. Use existing design system: `.container`, `.section`, etc.
3. Apply MDX components with exact design tokens
4. Add SEO metadata (title, description, Open Graph)
5. Add structured data (Article schema)

### Step 6: Add MDX Styles
1. Create `src/app/blog/mdx.css` (or add to globals.css)
2. Implement MDX styles EXACTLY as defined in Section 18
3. Import styles in blog layout

### Step 7: Update BlogSection Component
1. Modify `src/components/BlogSection.tsx`
2. Link each blog card to `/blog/[slug]`
3. Keep all existing styling

### Step 8: Activate BlogSection on Homepage
1. Uncomment `{/* <BlogSection /> */}` in `src/app/page.tsx`
2. Verify placement is correct (before Footer)

### Step 9: Update SEO & Sitemap
1. Add blog metadata to root layout (optional)
2. Update `public/sitemap.xml` with all blog post URLs
3. Verify Open Graph and Twitter cards work for blog posts

### Step 10: Test & Verify
1. Test blog index page on all screen sizes
2. Test each blog post page
3. Verify design matches existing website exactly
4. Test responsive behavior
5. Verify links work correctly
6. Run build to ensure no errors

---

*Audit Date: 2026-06-16*  
*Generated by Senior Staff Frontend Engineer &amp; Design System Architect*

