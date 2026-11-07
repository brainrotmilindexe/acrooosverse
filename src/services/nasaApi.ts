import { NasaImageItem, ApodData } from '../types';
import { FALLBACK_APOD } from '../data/curatedData';

interface NasaApiResponse {
  collection?: {
    items?: Array<{
      href?: string;
      data?: Array<{
        nasa_id: string;
        title: string;
        description?: string;
        date_created: string;
        center?: string;
        photographer?: string;
        keywords?: string[];
      }>;
      links?: Array<{
        href: string;
        rel?: string;
        render?: string;
      }>;
    }>;
    metadata?: {
      total_hits?: number;
    };
  };
}

export async function searchNasaImages(
  query: string,
  page: number = 1,
  pageSize: number = 12
): Promise<{ items: NasaImageItem[]; totalHits: number }> {
  const cleanQuery = query.trim() || 'cosmos';
  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
    cleanQuery
  )}&media_type=image&page_size=${pageSize}&page=${page}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NASA API returned status ${response.status}`);
    }

    const json: NasaApiResponse = await response.json();
    const rawItems = json.collection?.items || [];
    const totalHits = json.collection?.metadata?.total_hits || rawItems.length;

    const items: NasaImageItem[] = rawItems
      .filter((item) => item.data && item.data.length > 0)
      .map((item) => {
        const d = item.data![0];
        const previewLink =
          item.links?.find((l) => l.rel === 'preview')?.href ||
          item.links?.[0]?.href ||
          '';

        // Secure HTTPS conversion if needed
        const securePreview = previewLink.replace(/^http:\/\//i, 'https://');
        const origUrl = `https://images-assets.nasa.gov/image/${d.nasa_id}/${d.nasa_id}~orig.jpg`;
        const sourceUrl = `https://images.nasa.gov/details/${d.nasa_id}`;

        return {
          nasa_id: d.nasa_id,
          title: d.title || 'Untitled Space Observation',
          description: d.description || 'No detailed astronomical note cataloged for this record.',
          date_created: d.date_created,
          center: d.center || 'NASA',
          photographer: d.photographer,
          keywords: d.keywords || [],
          previewUrl: securePreview,
          originalUrl: origUrl,
          sourceUrl: sourceUrl,
        };
      })
      .filter((item) => !!item.previewUrl);

    return { items, totalHits };
  } catch (error) {
    console.warn('NASA Image Library API request failed or timed out:', error);
    throw error;
  }
}

export async function fetchApod(): Promise<ApodData> {
  const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return FALLBACK_APOD;
    }

    const data = await response.json();
    if (!data.url || data.media_type !== 'image') {
      return FALLBACK_APOD;
    }

    return {
      title: data.title || FALLBACK_APOD.title,
      date: data.date || FALLBACK_APOD.date,
      explanation: data.explanation || FALLBACK_APOD.explanation,
      url: data.url.replace(/^http:\/\//i, 'https://'),
      hdurl: data.hdurl ? data.hdurl.replace(/^http:\/\//i, 'https://') : undefined,
      copyright: data.copyright || 'NASA Public Domain',
      media_type: data.media_type,
    };
  } catch {
    // Graceful fallback to rich curated APOD
    return FALLBACK_APOD;
  }
}
