"use client";

import { useState, useEffect } from "react";

type Generation = {
  id: string;
  prompt: string;
  style: string;
  createdAt: string;
  imageUrl: string;
};

const filters = [
  { id: "all", label: "All" },
  { id: "realistic", label: "Realistic" },
  { id: "anime", label: "Anime" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "oil-paint", label: "Oil Paint" },
  { id: "watercolor", label: "Watercolor" },
  { id: "sketch", label: "Sketch" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<Generation | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    Promise.all([
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/remaining").then((r) => r.json()),
    ])
      .then(([galleryData, remainingData]) => {
        setGenerations(galleryData.generations ?? []);
        setRemaining(remainingData.remaining ?? 5);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered: Generation[] =
    activeFilter === "all"
      ? generations
      : generations.filter((g) => g.style === activeFilter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins} mins ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  return (
    <div className="min-h-[calc(100vh-57px)] px-6 py-10 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-1">
            Your gallery
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All your generated images in one place
          </p>
        </div>
        <div className="flex gap-6">
          {[
            { label: "Total", value: generations.length },
            { label: "Remaining", value: remaining },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-medium text-neon-primary">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
              activeFilter === f.id
                ? "bg-neon-soft dark:bg-neon-muted/20 border-neon-primary text-neon-secondary dark:text-neon-primary"
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-neon-border dark:hover:border-neon-muted bg-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-neon-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <span className="text-2xl text-gray-300 dark:text-gray-600">◈</span>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            {activeFilter === "all"
              ? "No images yet — go generate some!"
              : "No images in this style yet"}
          </p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((gen: Generation) => (
            <div
              key={gen.id}
              onClick={() => setSelectedImage(gen)}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-neon-border dark:hover:border-neon-primary transition-all duration-200"
            >
              <img
                src={gen.imageUrl}
                alt={gen.prompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                <span className="text-xs text-white font-medium line-clamp-2 leading-relaxed">
                  {gen.prompt}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  {gen.style} · {formatDate(gen.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-gray-950/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden max-w-2xl w-full border border-gray-100 dark:border-gray-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square w-full">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.prompt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-1">
                {selectedImage.prompt}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full bg-neon-soft dark:bg-neon-muted/20 text-neon-secondary dark:text-neon-primary border border-neon-border dark:border-neon-muted">
                  {selectedImage.style}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-600">
                  {formatDate(selectedImage.createdAt)}
                </span>
              </div>
              <div className="flex gap-3">
                <a
                  href={selectedImage.imageUrl}
                  download="pixelmind.png"
                  className="flex-1 py-2.5 rounded-xl bg-neon-secondary text-neon-soft text-sm text-center font-medium no-underline hover:opacity-90 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download ↓
                </a>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:border-neon-border transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
