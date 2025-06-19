import React from 'react';

export default function PostCard({ post, onClick }) {
  const url = post.large_file_url || post.file_url || post.url;
  const tags = Array.isArray(post.tags)
    ? post.tags.slice(0, 3).join(', ')
    : '';

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <img
        src={url}
        alt={tags}
        className="w-full h-48 object-cover"
      />
      <div className="p-2 flex justify-between text-xs text-gray-200">
        <span>{tags}…</span>
        <span>❤ {post.score ?? '—'}</span>
      </div>
    </div>
  );
}
