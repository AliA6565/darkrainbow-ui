const PAGE_SIZE = 30;

// Fetch Danbooru posts (with optional tag and pagination)
export async function fetchDanbooru(tag, page = 1) {
  const tagParam = tag ? `tags=${encodeURIComponent(tag)}` : '';
  const res = await fetch(
    `https://danbooru.donmai.us/posts.json?${tagParam}&limit=${PAGE_SIZE}&page=${page}`
  );
  return res.ok ? res.json() : [];
}

// Placeholder for non-Danbooru services
export async function fetchPlaceholder(service, tag, page = 1) {
  return Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `${service}-${page}-${i}`,
    url: `https://via.placeholder.com/600x600?text=${service}+${page}-${i+1}`,
    tags: [service, tag],
    score: '—'
  }));
}

// Tag autocomplete for Danbooru
export async function fetchTagSuggestions(service, query) {
  if (service === 'danbooru' && query) {
    const res = await fetch(
      `https://danbooru.donmai.us/tags.json?search[name_matches]=${encodeURIComponent(query)}*&limit=10`
    );
    if (res.ok) {
      const data = await res.json();
      return data.map(t => t.name);
    }
  }
  return [];
}
