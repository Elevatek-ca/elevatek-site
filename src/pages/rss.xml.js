import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// English blog feed. Drafts are always excluded (never in RSS, even in dev).
export async function GET(context) {
  const posts = (await getCollection('blog', (p) => p.data.lang === 'en' && !p.data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Elevatek — Blog',
    description: 'Field notes on Salesforce, RevOps, and getting the business and tech sides to agree.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-ca</language>`,
  });
}
