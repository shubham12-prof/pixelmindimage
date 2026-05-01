# PixelMind — AI Image Generation Studio

Generate images from text prompts using HuggingFace FLUX.1-schnell model.

🔗 [Live Demo](https://pixelmindimage.vercel.app/) &nbsp;|&nbsp; 📦 [GitHub](https://github.com/shubham12-prof/pixelmindimage)

---

## About

PixelMind lets users generate AI images from text prompts across 6 style presets — Photorealistic, Anime, Oil Painting, Sketch, Cyberpunk, and Watercolor. Each user gets 5 generations per day, controlled via Redis rate limiting.

---

## Tech Stack

- **Frontend** — Next.js 15, TypeScript, Tailwind CSS
- **Auth** — next-auth
- **AI Model** — HuggingFace FLUX.1-schnell
- **Database** — Supabase (PostgreSQL) + Prisma ORM
- **Rate Limiting** — Upstash Redis
- **Media Storage** — Cloudinary
- **DevOps** — Docker, Kubernetes, GitHub Actions

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/shubham12-prof/pixelmindimage.git
cd pixelmindimage
npm install
```

### 2. Set up `.env.local`

```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
HUGGINGFACE_API_KEY=
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Run migrations and start

```bash
npx prisma migrate dev
npm run dev
```

---

## Run with Docker

```bash
docker build -t pixelmind .
docker run -p 3000:3000 --env-file .env.local pixelmind
```

---

## Author

**Shubham Semwal** — [Portfolio](https://shubham12-prof.github.io/portfolio) · [LinkedIn](https://www.linkedin.com/in/shubham-semwal-224540172/) · [GitHub](https://github.com/shubham12-prof)
