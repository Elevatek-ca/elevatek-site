import en from './en.json';
import fr from './fr.json';

/**
 * i18n helpers for the bilingual site.
 *
 * English is the default locale and stays unprefixed (/, /contact, …).
 * French lives under /fr/. Strings live in en.json / fr.json; fr.json currently
 * holds English placeholders until translation lands.
 */

export const languages = { en: 'English', fr: 'Français' } as const;
export const defaultLang = 'en';
export type Locale = keyof typeof languages;

const dictionaries: Record<string, unknown> = { en, fr };

function lookup(table: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object') return (node as Record<string, unknown>)[part];
    return undefined;
  }, table);
}

/**
 * Returns a `t(key)` function bound to the given locale. Keys are dotted paths
 * (e.g. 'hero.headline'). Values may be strings, arrays, or objects (returned
 * as-is for components to map over). Missing keys fall back to English, then to
 * the key itself so nothing ever renders blank.
 */
export function useTranslations(locale: string | undefined) {
  const lang = locale && locale in dictionaries ? locale : defaultLang;
  const table = dictionaries[lang];
  return function t(key: string): any {
    const value = lookup(table, key);
    if (value !== undefined) return value;
    const fallback = lookup(en, key);
    return fallback !== undefined ? fallback : key;
  };
}

/**
 * Prefixes an absolute site path with the locale when it isn't the default.
 * localizePath('/contact', 'fr') -> '/fr/contact'; localizePath('/', 'fr') -> '/fr/'.
 * Anchors and same-page hashes should be handled by the caller, not here.
 */
export function localizePath(path: string, locale: string | undefined): string {
  if (!locale || locale === defaultLang) return path;
  if (path === '/') return `/${locale}/`;
  return `/${locale}${path}`;
}
