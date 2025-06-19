import React, { useState, useRef, useEffect } from 'react';

export default function SearchBar({
  site, tag, setSite, setTag, onSearch, loadSuggestions
}) {
  const [suggestions, setSuggestions] = useState([]);
  const ref = useRef();

  // Debounce suggestion fetch
  useEffect(() => {
    const timer = setTimeout(async () => {
      const parts = tag.trim().split(/[, ]+/);
      const last = parts[parts.length - 1] || '';
      setSuggestions(await loadSuggestions(last));
    }, 300);
    return () => clearTimeout(timer);
  }, [tag]);

  // Click outside closes suggestions
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  // Insert suggestion into tag input
  const choose = (s) => {
    const parts = tag.trim().split(/[, ]+/);
    parts[parts.length - 1] = s;
    setTag(parts.join(' ') + ' ');
    setSuggestions([]);
  };

  return (
    <form
      className="relative z-10 flex gap-4 mt-6 justify-center"
      onSubmit={(e) => { e.preventDefault(); onSearch(); }}
      ref={ref}
    >
      <select
        value={site}
        onChange={(e) => setSite(e.target.value)}
        className="bg-gray-900 px-4 py-2 rounded-md"
      >
        <option value="danbooru">Danbooru</option>
        <option value="gelbooru">Gelbooru</option>
        <option value="rule34">Rule34.xxx</option>
        <option value="yandere">Yande.re</option>
      </select>
      <div className="relative">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tags..."
          className="bg-gray-900 px-4 py-2 rounded-md w-64"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-md w-full max-h-48 overflow-auto text-sm">
            {suggestions.map(s => (
              <li
                key={s}
                className="px-3 py-1 hover:bg-gray-700 cursor-pointer"
                onClick={() => choose(s)}
              >{s}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="bg-purple-700 px-6 py-2 rounded-md hover:bg-purple-600"
      >Search</button>
    </form>
  );
}
