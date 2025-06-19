import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Feed from './components/Feed';
import {
  fetchDanbooru,
  fetchPlaceholder,
  fetchTagSuggestions
} from './services/booruApi';

const PAGE_SIZE = 30;

export default function App() {
  const [site, setSite]         = useState('danbooru');
  const [tag, setTag]           = useState('');
  const [posts, setPosts]       = useState([]);
  const [page, setPage]         = useState(1);
  const [hasMore, setHasMore]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [recs, setRecs]         = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Load recommendations on site-change
  useEffect(() => {
    (async () => {
      const data = site === 'danbooru'
        ? await fetchDanbooru('', 1)
        : await fetchPlaceholder(site, '', 1);
      setRecs(data.slice(0, PAGE_SIZE));
      setPosts([]);
      setPage(1);
      setHasMore(false);
    })();
  }, [site]);

  // Infinite scroll handler
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore && !loading
      ) {
        loadPosts(page + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [page, hasMore, loading]);

  // Load posts (with pagination)
  const loadPosts = async (pg = 1) => {
    setLoading(true);
    const data = site === 'danbooru'
      ? await fetchDanbooru(tag, pg)
      : await fetchPlaceholder(site, tag, pg);

    setPosts(prev => (pg === 1 ? data : [...prev, ...data]));
    setHasMore(data.length === PAGE_SIZE);
    setPage(pg);
    setLoading(false);
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="relative min-h-screen bg-black text-gray-100">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute w-72 h-72 -top-24 -left-24 bg-purple-900/80 rounded-full filter blur-3xl animate-pulse1" />
      <div className="absolute w-80 h-80 -bottom-24 -right-24 bg-indigo-900/80 rounded-full filter blur-3xl animate-pulse2" />

      {/* UI */}
      <Header />
      <SearchBar
        site={site}
        tag={tag}
        setSite={setSite}
        setTag={setTag}
        onSearch={() => loadPosts(1)}
        loadSuggestions={(q) => fetchTagSuggestions(site, q)}
      />

      {/* Content: recommendations or search results */}
      {!posts.length && !loading ? (
        <Feed posts={recs} onImageClick={setSelectedImage} />
      ) : (
        <Feed posts={posts} onImageClick={setSelectedImage} />
      )}

      {/* Loading indicator */}
      {loading && (
        <p className="mt-4 text-center z-10">Loading…</p>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-auto"
          onClick={closeModal}
        >
          <img
            src={selectedImage}
            alt="Full Size"
            className="max-w-none max-h-none"
          />
        </div>
      )}
    </div>
  );
}
