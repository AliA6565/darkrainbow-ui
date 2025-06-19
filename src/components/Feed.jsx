import React from 'react';
import PostCard from './PostCard';

export default function Feed({ posts, onImageClick }) {
  if (!posts.length) {
    return <p className="mt-10 text-center">No results yet.</p>;
  }
  return (
    <div className="z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full max-w-6xl mx-auto">
      {posts.map(p => (
        <PostCard
          key={p.id}
          post={p}
          onClick={() => onImageClick(p.large_file_url || p.url)}
        />
      ))}
    </div>
  );
}
