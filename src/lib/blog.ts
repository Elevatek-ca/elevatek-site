import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
type Lang = 'en' | 'fr';

const SITE = 'https://elevatek.ca';

// Drafts are included only in dev — never in production builds, the sitemap, or RSS.
const draftOk = (p: Post) => (import.meta.env.PROD ? !p.data.draft : true);

/** Posts for one locale, newest first. */
export async function getBlogPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => p.data.lang === lang && draftOk(p));
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** All posts (both locales), respecting the draft rule — used to resolve translation pairs. */
export async function getAllBlogPosts(): Promise<Post[]> {
  return getCollection('blog', draftOk);
}

export function postPath(post: Post): string {
  return post.data.lang === 'fr' ? `/fr/blogue/${post.id}` : `/blog/${post.id}`;
}

/** Counterpart in the other language, linked via translationOf in either direction. */
export function findCounterpart(post: Post, all: Post[]): Post | undefined {
  return all.find(
    (p) =>
      p.data.lang !== post.data.lang &&
      (p.data.translationOf === post.id || post.data.translationOf === p.id),
  );
}

/**
 * The single shared alternate-URL resolver — feeds BOTH the language selector and the
 * hreflang tags so they can never disagree. A post without a translation falls the
 * missing locale back to that locale's blog index and suppresses the hreflang pair
 * (self-canonical only).
 */
export function postAlternates(post: Post, counterpart?: Post) {
  const self = postPath(post);
  if (counterpart) {
    const other = postPath(counterpart);
    return {
      en: post.data.lang === 'en' ? self : other,
      fr: post.data.lang === 'fr' ? self : other,
      hreflang: true,
    };
  }
  return {
    en: post.data.lang === 'en' ? self : '/blog',
    fr: post.data.lang === 'fr' ? self : '/fr/blogue',
    hreflang: false,
  };
}

export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(date: Date, lang: Lang): string {
  // pubDate is a date-only value stored as UTC midnight. Format it in UTC so the
  // displayed date always matches what was authored, regardless of build-server timezone.
  return date.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Article (BlogPosting) JSON-LD — Elevatek as author + publisher. */
export function articleJsonLd(post: Post, canonical: string, lang: Lang): string {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.pubDate.toISOString(),
    dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    author: { '@type': 'Organization', name: 'Elevatek', url: `${SITE}/` },
    publisher: {
      '@type': 'Organization',
      name: 'Elevatek',
      logo: { '@type': 'ImageObject', url: `${SITE}/apple-touch-icon.png` },
    },
    image: `${SITE}/og.png`,
    mainEntityOfPage: canonical,
  };
  return `<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}
