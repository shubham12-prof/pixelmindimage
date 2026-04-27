"use client";

import { useState } from "react";

type Generation = {
  id: string;
  prompt: string;
  style: string;
  createdAt: string;
  imageUrl: string;
};

const mockGenerations: Generation[] = [
  {
    id: "1",
    prompt: "Futuristic city at night with neon lights",
    style: "cyberpunk",
    createdAt: "2 mins ago",
    imageUrl: "https://picsum.photos/seed/101/512/512",
  },
  {
    id: "2",
    prompt: "Anime girl in cherry blossom garden",
    style: "anime",
    createdAt: "1 hour ago",
    imageUrl: "https://picsum.photos/seed/102/512/512",
  },
  {
    id: "3",
    prompt: "Desert sunset oil painting warm tones",
    style: "oil-paint",
    createdAt: "3 hours ago",
    imageUrl: "https://picsum.photos/seed/103/512/512",
  },
  {
    id: "4",
    prompt: "Cyberpunk samurai warrior in rain",
    style: "cyberpunk",
    createdAt: "5 hours ago",
    imageUrl: "https://picsum.photos/seed/104/512/512",
  },
  {
    id: "5",
    prompt: "Ocean storm watercolor dramatic sky",
    style: "watercolor",
    createdAt: "Yesterday",
    imageUrl: "https://picsum.photos/seed/105/512/512",
  },
  {
    id: "6",
    prompt: "Enchanted forest pencil sketch",
    style: "sketch",
    createdAt: "Yesterday",
    imageUrl: "https://picsum.photos/seed/106/512/512",
  },
  {
    id: "7",
    prompt: "Mountain peak at golden hour realistic photo",
    style: "realistic",
    createdAt: "2 days ago",
    imageUrl: "https://picsum.photos/seed/107/512/512",
  },
  {
    id: "8",
    prompt: "Anime space explorer floating in galaxy",
    style: "anime",
    createdAt: "2 days ago",
    imageUrl: "https://picsum.photos/seed/108/512/512",
  },
  {
    id: "9",
    prompt: "Rainy Tokyo street at night neon reflections",
    style: "cyberpunk",
    createdAt: "3 days ago",
    imageUrl: "https://picsum.photos/seed/109/512/512",
  },
  {
    id: "10",
    prompt: "Sunflower field watercolor soft pastel",
    style: "watercolor",
    createdAt: "3 days ago",
    imageUrl: "https://picsum.photos/seed/110/512/512",
  },
  {
    id: "11",
    prompt: "Portrait of a knight realistic detailed armor",
    style: "realistic",
    createdAt: "4 days ago",
    imageUrl: "https://picsum.photos/seed/111/512/512",
  },
  {
    id: "12",
    prompt: "Ancient temple sketch with vines and fog",
    style: "sketch",
    createdAt: "4 days ago",
    imageUrl: "https://picsum.photos/seed/112/512/512",
  },
];

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

  const filtered: Generation[] =
    activeFilter === "all"
      ? mockGenerations
      : mockGenerations.filter((g: Generation) => g.style === activeFilter);

  return (
    <div className="min-h-[calc(100vh-57px)] px-6 py-10 max-w-6xl mx-auto">
      {/* Header */}
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
            { label: "Total", value: mockGenerations.length },
            { label: "Today", value: 2 },
            { label: "Remaining", value: 3 },
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

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <span className="text-2xl text-gray-300 dark:text-gray-600">◈</span>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            No images in this style yet
          </p>
        </div>
      )}

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
                {gen.style} · {gen.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>

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
                  {selectedImage.createdAt}
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
