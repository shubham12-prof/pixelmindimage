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

const stylePills = [
  "Cyberpunk",
  "Realistic",
  "Anime",
  "Oil Painting",
  "Watercolor",
  "Sketch",
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-57px)]">
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-neon-soft border border-neon-border rounded-full px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-primary" />
          <span className="text-xs font-medium text-neon-secondary">
            Powered by FLUX.1-schnell
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-gray-100 leading-tight mb-4 max-w-3xl">
          Generate stunning images{" "}
          <span className="text-neon-primary">with AI precision</span>
        </h1>

        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md">
          Type a prompt. Pick a style. Watch your imagination render in seconds
          — powered by FLUX.1-schnell.
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
      <div className="w-full max-w-3xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center mb-3">
          <div className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-[#e8e6f0]/60 font-light">
            A cyberpunk city at night with neon lights...
          </div>

          <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-[0_0_16px_rgba(124,58,237,0.3)]">
            Generate ✦
          </button>
        </div>

        <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
          {stylePills.map((pill, i) => (
            <span
              key={pill}
              className={`text-[11px] px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                i === 0
                  ? "bg-violet-500/20 border-violet-400/40 text-violet-300"
                  : "bg-violet-500/[0.07] border-violet-500/20 text-violet-400/70"
              }`}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
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

      <section className="relative z-10 mx-6 mb-16 rounded-2xl bg-violet-500/8 border border-violet-500/20 px-8 py-14 text-center overflow-hidden">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-100 h-75 rounded-full bg-violet-600/12 blur-[80px]" />
        <h2 className="relative text-[24px] font-black text-[#f0eeff] tracking-[-0.8px] mb-2">
          Ready to create?
        </h2>
        <p className="relative text-sm text-[#e8e6f0]/40 font-light mb-7">
          No credit card needed. 5 free generations every day.
        </p>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-medium no-underline shadow-[0_0_28px_rgba(124,58,237,0.35)] hover:shadow-[0_0_40px_rgba(124,58,237,0.55)] hover:-translate-y-0.5 transition-all duration-200"
        >
          Generate your first image
          <span className="opacity-80">→</span>
        </Link>
      </section>
    </div>
  );
}
