"use client";

import { useState, useEffect } from "react";

const styles = [
  { id: "realistic", label: "Realistic", icon: "◎" },
  { id: "anime", label: "Anime", icon: "◈" },
  { id: "cyberpunk", label: "Cyberpunk", icon: "⬡" },
  { id: "oil-paint", label: "Oil Paint", icon: "▦" },
  { id: "watercolor", label: "Watercolor", icon: "⟡" },
  { id: "sketch", label: "Sketch", icon: "◇" },
];

const DAILY_LIMIT = 5;

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState("realistic");
  const [enhancing, setEnhancing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(DAILY_LIMIT);
  useEffect(() => {
    fetch("/api/remaining")
      .then((res) => res.json())
      .then((data) => setRemaining(data.remaining))
      .catch(() => setRemaining(DAILY_LIMIT));
  }, []);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setEnhancing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPrompt(
      prompt +
        ", highly detailed, cinematic lighting, 8k resolution, sharp focus, professional photography",
    );
    setEnhancing(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style: selected }),
      });

      const data = await res.json();

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (res.status === 429) {
        alert(data.error);
        setRemaining(0);
        return;
      }

      if (!res.ok) {
        alert(data.error || "Generation failed");
        return;
      }

      setImage(data.image);

      if (typeof data.remaining === "number") {
        setRemaining(data.remaining);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-57px)] px-6 py-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-1">
          Generate an image
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Describe what you want to see and pick a style
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neon-soft dark:bg-neon-muted/20 border border-neon-border dark:border-neon-muted">
            <div className="w-2 h-2 rounded-full bg-neon-primary shrink-0" />
            <span className="text-xs text-neon-secondary dark:text-neon-primary flex-1">
              AI enhancer — expand your rough idea into a detailed prompt
            </span>
            <button
              onClick={handleEnhance}
              disabled={enhancing || !prompt.trim()}
              className="text-xs px-3 py-1.5 rounded-lg border border-neon-border dark:border-neon-primary text-neon-secondary dark:text-neon-primary hover:bg-neon-soft dark:hover:bg-neon-muted/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {enhancing ? "Enhancing..." : "Enhance ✦"}
            </button>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
              Your prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city at night with glowing neon signs..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 resize-none outline-none focus:border-neon-border dark:focus:border-neon-primary transition-colors"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400 dark:text-gray-600">
                Be descriptive for better results
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-600">
                {prompt.length} chars
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
              Style preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelected(style.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-150 ${
                    selected === style.id
                      ? "border-neon-primary bg-neon-soft dark:bg-neon-muted/20 text-neon-secondary dark:text-neon-primary"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-neon-border dark:hover:border-neon-muted bg-white dark:bg-gray-900"
                  }`}
                >
                  <span className="text-base">{style.icon}</span>
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Daily generations
              </span>
              <span
                className={`text-xs font-medium ${remaining === 0 ? "text-rose-500" : "text-neon-primary"}`}
              >
                {remaining} / {DAILY_LIMIT} remaining
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${remaining === 0 ? "bg-rose-500" : "bg-neon-primary"}`}
                style={{ width: `${(remaining / DAILY_LIMIT) * 100}%` }}
              />
            </div>
            {remaining === 0 && (
              <p className="text-xs text-rose-500 mt-2">
                Daily limit reached. Come back tomorrow!
              </p>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || remaining === 0}
            className="w-full py-3.5 rounded-xl bg-neon-secondary text-neon-soft text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-neon-soft border-t-transparent rounded-full animate-spin" />
                Generating...
              </span>
            ) : remaining === 0 ? (
              "Limit reached for today"
            ) : (
              "Generate image ✦"
            )}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Output
          </label>
          <div className="aspect-square rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-neon-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Generating your image...
                </span>
              </div>
            ) : image ? (
              <img
                src={image}
                alt={prompt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center px-8">
                <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <span className="text-2xl text-gray-300 dark:text-gray-600">
                    ◈
                  </span>
                </div>
                <span className="text-sm text-gray-400 dark:text-gray-600">
                  Your image will appear here
                </span>
                <span className="text-xs text-gray-300 dark:text-gray-700">
                  Write a prompt and click Generate
                </span>
              </div>
            )}
          </div>

          {image && !loading && (
            <a
              href={image ?? ""}
              download="pixelmind-generation.png"
              className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 text-center hover:border-neon-border dark:hover:border-neon-primary transition-colors no-underline block"
            >
              Download image ↓
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
