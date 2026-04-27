import Link from "next/link";

const features = [
  {
    icon: "◈",
    bg: "bg-neon-soft",
    iconColor: "text-neon-secondary",
    title: "Multiple AI styles",
    desc: "Choose from Real istic, Anime, Cyberpunk, Oil Painting, Watercolor, and Sketch — each tuned for that aesthetic.",
  },
  {
    icon: "⟡",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    iconColor: "text-emerald-700 dark:text-emerald-400",
    title: "AI prompt enhancer",
    desc: "Write a rough idea and let Claude expand it into a detailed, high-quality diffusion prompt automatically.",
  },
  {
    icon: "▦",
    bg: "bg-amber-50 dark:bg-amber-950",
    iconColor: "text-amber-700 dark:text-amber-400",
    title: "Personal gallery",
    desc: "Every image you generate is saved to your gallery. Download, share publicly, or delete anytime.",
  },
  {
    icon: "⬡",
    bg: "bg-rose-50 dark:bg-rose-950",
    iconColor: "text-rose-700 dark:text-rose-400",
    title: "Rate limiting",
    desc: "5 free generations per day. Redis-powered counter keeps it fair and cost-controlled.",
  },
  {
    icon: "◎",
    bg: "bg-blue-50 dark:bg-blue-950",
    iconColor: "text-blue-700 dark:text-blue-400",
    title: "Secure auth",
    desc: "Sign in with Google or GitHub via next-auth. Your generations are private by default.",
  },
  {
    icon: "⬢",
    bg: "bg-green-50 dark:bg-green-950",
    iconColor: "text-green-700 dark:text-green-400",
    title: "Community feed",
    desc: "Make any image public and discover what others are creating. Like and bookmark your favorites.",
  },
];

const stats = [
  { value: "10+", label: "AI models" },
  { value: "6", label: "Style presets" },
  { value: "Free", label: "To get started" },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-57px)]">
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-neon-soft border border-neon-border rounded-full px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-primary" />
          <span className="text-xs font-medium text-neon-secondary">
            Powered by Stable Diffusion
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-gray-100 leading-tight mb-4 max-w-3xl">
          Generate stunning images{" "}
          <span className="text-neon-primary">with AI precision</span>
        </h1>

        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md">
          Type a prompt. Pick a style. Watch your imagination render in seconds
          — powered by Stable Diffusion.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/generate"
            className="px-7 py-3 rounded-lg bg-neon-secondary text-neon-soft text-sm font-medium no-underline hover:opacity-90 transition-opacity"
          >
            Start generating
          </Link>
          <Link
            href="/gallery"
            className="px-7 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm no-underline hover:border-neon-border transition-colors"
          >
            View gallery
          </Link>
        </div>
      </section>

      <section className="flex justify-center gap-16 px-6 pb-16 flex-wrap">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-medium text-neon-primary">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-16" />

      <section className="px-8 pb-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 text-center mb-10">
          Everything you need to create
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 hover:border-neon-border dark:hover:border-neon-muted transition-colors duration-200"
            >
              <div
                className={`w-9 h-9 rounded-lg ${feat.bg} flex items-center justify-center text-base ${feat.iconColor} mb-3`}
              >
                {feat.icon}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
                {feat.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {feat.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center px-6 py-16 border-t border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-3">
          Ready to create?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          No credit card needed. 5 free generations every day.
        </p>
        <Link
          href="/generate"
          className="px-8 py-3 rounded-lg bg-neon-secondary text-neon-soft text-sm font-medium no-underline hover:opacity-90 transition-opacity"
        >
          Generate your first image
        </Link>
      </section>
    </div>
  );
}
