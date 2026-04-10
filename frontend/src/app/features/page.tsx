import GlassHeader from "@/components/glass-header";
import Link from "next/link";

const featureGroups = [
  {
    heading: "Hệ thống Ban/Pick",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    color: "text-blue-400",
    borderColor: "border-blue-300/25",
    bgColor: "bg-blue-500/10",
    items: [
      {
        title: "Cấm/Chọn nhân vật theo thời gian thực",
        description:
          "Hệ thống xử lý lượt ban/pick liên tục với độ trễ thấp, đảm bảo trải nghiệm công bằng cho cả hai đội.",
      },
      {
        title: "Nhiều thể thức thi đấu",
        description:
          "Hỗ trợ Best of 1, 3, 5, 7 và 11 — đáp ứng mọi quy mô từ vòng loại đến Grand Final.",
      },
      {
        title: "Quản lý phòng linh hoạt",
        description:
          "Tạo phòng với mã tùy chỉnh, đặt mật khẩu, giới hạn người chơi và cấu hình số lượt ban.",
      },
    ],
  },
  {
    heading: "Analytics & Insight",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M4 16h4l2-8 3 12 2-6h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-violet-400",
    borderColor: "border-violet-300/25",
    bgColor: "bg-violet-500/10",
    items: [
      {
        title: "Realtime Metrics Pipeline",
        description:
          "Thu thập sự kiện trận đấu theo streaming và cập nhật dashboard tức thời, không cần refresh trang.",
      },
      {
        title: "Predictive Insight Engine",
        description:
          "Phân tích chuỗi draft để dự báo tỉ lệ thắng và đề xuất hành động tối ưu cho mỗi lượt cấm chọn.",
      },
      {
        title: "Analytics Command Center",
        description:
          "Theo dõi KPI chiến thuật, heatmap nhân vật và trạng thái đội hình trong một màn hình duy nhất.",
      },
    ],
  },
  {
    heading: "Bảo mật & Hạ tầng",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 2l7 4v6c0 4.4-3.1 8.6-7 10-3.9-1.4-7-5.6-7-10V6l7-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-emerald-400",
    borderColor: "border-emerald-300/25",
    bgColor: "bg-emerald-500/10",
    items: [
      {
        title: "Xác thực JWT",
        description:
          "Mọi thao tác quản trị đều được bảo vệ bằng JSON Web Token — phân quyền rõ ràng giữa admin và người dùng.",
      },
      {
        title: "Mật khẩu được hash an toàn",
        description:
          "Sử dụng bcrypt để hash mật khẩu người dùng, đảm bảo không lưu trữ mật khẩu dạng plaintext.",
      },
      {
        title: "REST API chuẩn hoá",
        description:
          "Backend Express 5 với cấu trúc MVC, validation Zod, Morgan logging và phân trang linh hoạt.",
      },
    ],
  },
];

const roadmapItems = [
  { label: "Tích hợp Redis cho Realtime", done: false },
  { label: "Docker hóa toàn bộ hệ thống", done: false },
  { label: "Phân quyền chi tiết (RBAC)", done: false },
  { label: "Reset mật khẩu qua email", done: false },
  { label: "Trang tạo phòng", done: true },
  { label: "Trang đăng nhập Admin", done: true },
  { label: "Giao diện Cosmic / Glassmorphism", done: true },
  { label: "Hệ thống phòng với phân trang", done: true },
];

export default function Features() {
  return (
    <main className="relative isolate overflow-hidden px-6 pb-20 pt-2 md:px-12 md:pb-24 md:pt-4">
      <div className="pointer-events-none absolute left-1/2 -top-72 -z-10 h-160 w-208 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28)_0%,rgba(4,8,18,0)_62%)] blur-3xl" />

      <GlassHeader
        className="mb-8"
        title="Cáp Kèo Free Fire"
        subtitle="Ban Pick System"
        logoSrc="/images/CKFF-White.png"
        logoAlt="BanPick Tool"
        actions={[
          { label: "Trang chủ", href: "/", variant: "ghost" },
          { label: "Xem phòng", href: "/rooms", variant: "primary" },
        ]}
      />

      <section className="mx-auto max-w-7xl">
        <div className="space-y-3 text-center">
          <p className="inline-flex items-center rounded-full border border-(--color-primary)/50 bg-(--surface-glass) px-4 py-2 text-xs uppercase tracking-[0.28em] text-(--text-muted)">
            Tính năng hệ thống
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-semibold text-(--text-strong) md:text-5xl md:leading-[1.1]">
            Tất cả những gì bạn cần cho một giải đấu chuyên nghiệp
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-(--text-muted)">
            Từ ban/pick realtime đến analytics chiến thuật — hệ thống được xây dựng để phục vụ cả
            người tổ chức giải đấu lẫn người xem broadcast.
          </p>
        </div>

        <div className="mt-14 space-y-10">
          {featureGroups.map((group) => (
            <div key={group.heading}>
              <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${group.color} ${group.borderColor} ${group.bgColor}`}>
                {group.icon}
                {group.heading}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {group.items.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-(--surface-card) p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <h2 className="text-base font-semibold text-(--text-strong)">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-(--text-muted)">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(8,14,30,0.9),rgba(17,24,39,0.55))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
          <h2 className="text-2xl font-semibold text-(--text-strong)">Lộ trình phát triển</h2>
          <p className="mt-2 text-sm text-(--text-muted)">Các tính năng đã hoàn thành và sắp ra mắt.</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {roadmapItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    item.done
                      ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-300"
                      : "border-white/15 bg-white/5 text-slate-500"
                  }`}
                  aria-hidden="true"
                >
                  {item.done ? (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                      <circle cx="6" cy="6" r="2" fill="currentColor" />
                    </svg>
                  )}
                </span>
                <span className={item.done ? "text-(--text-strong)" : "text-(--text-muted)"}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Link
            href="/rooms/create"
            className="focus-ring inline-flex h-12 items-center justify-center rounded-full bg-(--color-primary) px-8 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) active:translate-y-0"
          >
            Tạo phòng ngay
          </Link>
          <Link
            href="/rooms"
            className="focus-ring inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-medium text-(--text-strong) transition-colors duration-200 hover:border-(--color-secondary)/70 hover:bg-(--surface-glass)"
          >
            Xem phòng đang hoạt động
          </Link>
        </div>
      </section>
    </main>
  );
}
