import CosmicGlobe, { type AnalyticsPin } from "@/components/cosmic-globe";
import GlassHeader from "@/components/glass-header";
import Link from "next/link";

const features = [
  {
    title: "Realtime Metrics Pipeline",
    description: "Thu thập sự kiện trận đấu theo streaming và cập nhật dashboard tức thời.",
  },
  {
    title: "Predictive Insight Engine",
    description: "Phân tích chuỗi draft để dự báo tỉ lệ thắng và đề xuất hành động tối ưu.",
  },
  {
    title: "Analytics Command Center",
    description: "Theo dõi KPI chiến thuật, heatmap và trạng thái đội hình trong một màn hình.",
  },
];

const realtimeSignals = [
  {
    label: "Độ trễ cập nhật",
    value: "84ms",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 12a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 4v4M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Sự kiện trận đấu",
    value: "3261",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M5 12a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Trận đấu diễn ra",
    value: "+9K Trận",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M4 16h4l2-8 3 12 2-6h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const analyticsPinPositions = [
  { id: "active-lobbies", position: "left-[4%] top-[8%]" },
  { id: "draft-events", position: "right-[8%] top-[28%]" },
  { id: "live-alerts", position: "right-[8%] bottom-[14%]" },
] as const;

function createRandomPins(): AnalyticsPin[] {
  return analyticsPinPositions.map((pin) => ({
    id: pin.id,
    position: pin.position,
    label: Math.floor(Math.random() * 900 + 100).toString(),
    trend: `+${(Math.random() * 20 + 1).toFixed(1)}%`,
  }));
}

export default function Home() {
  const analyticsPins = createRandomPins();

  return (
    <main className="relative isolate overflow-hidden px-6 pb-20 pt-2 md:px-12 md:pb-24 md:pt-4">
      <div className="pointer-events-none absolute left-1/2 -top-72 -z-10 h-160 w-208 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32)_0%,rgba(4,8,18,0)_62%)] blur-3xl" />

      <GlassHeader
        className="mb-8"
        title="Cáp Kèo Free Fire"
        subtitle="Ban Pick System"
        logoSrc="/images/CKFF-White.png"
        logoAlt="BanPick Tool"
        actions={[
          { label: "Xem phòng", href: "/rooms", variant: "ghost" },
          { label: "Đăng nhập", href: "/login", variant: "primary" },
        ]}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="space-y-8">
          <p className="inline-flex items-center rounded-full border border-(--color-primary)/50 bg-(--surface-glass) px-4 py-2 text-xs uppercase tracking-[0.28em] text-(--text-muted)">
            FreeFire Broadcast System
          </p>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl leading-tight font-semibold text-(--text-strong) md:text-6xl md:leading-[1.1]">
              Hỗ trợ giải đấu tính năng BanPick cho FreeFire. Broadcast template xịn xò!
            </h1>
            <p className="max-w-2xl text-base leading-8 text-(--text-muted) md:text-xl">
              Biến dữ liệu draft thành insight hành động được ngay, từ cảnh báo sớm đến dự báo đội hình
              để hỗ trợ quyết định nhanh trong từng lượt.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/features"
              className="focus-ring inline-flex h-12 items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) active:translate-y-0"
            >
              Khám phá tính năng
            </Link>
            <Link
              href="/"
              className="focus-ring inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-medium text-(--text-strong) transition-colors duration-200 hover:border-(--color-secondary)/70 hover:bg-(--surface-glass)"
            >
              Đăng kí Admin
            </Link>
          </div>

          <ul className="grid gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-3" aria-label="Realtime status highlights">
            {realtimeSignals.map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-white/10 bg-(--surface-glass) px-4 py-3"
              >
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-(--text-muted)">
                  <span className="text-(--color-primary)">{item.icon}</span>
                  {item.label}
                </p>
                <p className="mt-1 text-base text-(--text-strong)">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full h-full">
          <div className="absolute w-full h-full left-[50%] -translate-x-1/2 flex items-center justify-center">
            <CosmicGlobe analyticsPins={analyticsPins} />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-(--surface-card) p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <h2 className="text-xl font-semibold text-(--text-strong)">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-(--text-muted)">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
