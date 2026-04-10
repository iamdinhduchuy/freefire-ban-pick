"use client";

import GlassHeader from "@/components/glass-header";
import Link from "next/link";
import { useState } from "react";

type BestOf = "BO1" | "BO3" | "BO5" | "BO7" | "BO11";

const bestOfOptions: { value: BestOf; label: string }[] = [
  { value: "BO1", label: "Best of 1" },
  { value: "BO3", label: "Best of 3" },
  { value: "BO5", label: "Best of 5" },
  { value: "BO7", label: "Best of 7" },
  { value: "BO11", label: "Best of 11" },
];

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [bestOf, setBestOf] = useState<BestOf>("BO3");
  const [maxPlayers, setMaxPlayers] = useState("10");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [maxBans, setMaxBans] = useState("2");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdRoom, setCreatedRoom] = useState<{ roomId: string; name: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          roomId,
          name,
          bestOf,
          maxPlayers: Number(maxPlayers),
          teamAName,
          teamBName,
          maxBans: Number(maxBans),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const fieldErrors = data.errors
          ? Object.values(data.errors as Record<string, string[]>)
              .flat()
              .join(", ")
          : null;
        setError(fieldErrors ?? data.message ?? "Tạo phòng thất bại");
        return;
      }

      setCreatedRoom({ roomId: data.data?.roomId ?? roomId, name: data.data?.name ?? name });
    } catch {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative isolate overflow-hidden px-6 pb-20 pt-2 md:px-12 md:pb-24 md:pt-4">
      <div className="pointer-events-none absolute right-[8%] -top-64 -z-10 h-136 w-136 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.24)_0%,rgba(2,6,23,0)_70%)] blur-3xl" />

      <GlassHeader
        className="mb-8"
        title="Cáp Kèo Free Fire"
        subtitle="Ban Pick System"
        logoSrc="/images/CKFF-White.png"
        logoAlt="BanPick Tool"
        actions={[
          { label: "Danh sách phòng", href: "/rooms", variant: "ghost" },
          { label: "Trang chủ", href: "/", variant: "primary" },
        ]}
      />

      <section className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(8,14,30,0.9),rgba(17,24,39,0.55))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
          <p className="inline-flex items-center rounded-full border border-(--color-secondary)/40 bg-(--surface-glass) px-3 py-1 text-xs uppercase tracking-[0.18em] text-(--text-muted)">
            Phòng mới
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-(--text-strong) md:text-4xl">
            Tạo phòng thi đấu
          </h1>
          <p className="mt-2 text-sm leading-7 text-(--text-muted)">
            Điền thông tin bên dưới để khởi tạo một phòng ban/pick mới cho giải đấu của bạn.
          </p>

          {createdRoom ? (
            <div className="mt-6 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-6">
              <p className="text-base font-semibold text-emerald-200">
                Tạo phòng thành công!
              </p>
              <p className="mt-1 text-sm text-emerald-300/80">
                Phòng <strong className="text-emerald-200">{createdRoom.name}</strong> (
                <code className="rounded bg-emerald-900/40 px-1 py-0.5 text-xs">{createdRoom.roomId}</code>
                ) đã được tạo.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/rooms"
                  className="focus-ring inline-flex h-10 items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
                >
                  Xem danh sách phòng
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setCreatedRoom(null);
                    setRoomId("");
                    setName("");
                    setBestOf("BO3");
                    setMaxPlayers("10");
                    setTeamAName("");
                    setTeamBName("");
                    setMaxBans("2");
                    setPassword("");
                  }}
                  className="focus-ring inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-(--text-strong)"
                >
                  Tạo phòng khác
                </button>
              </div>
            </div>
          ) : (
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {error ? (
                <div className="rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="room-id" className="mb-2 block text-sm text-(--text-muted)">
                    Mã phòng <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="room-id"
                    type="text"
                    required
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="VD: RM-2025-01"
                    pattern="[a-zA-Z0-9_-]+"
                    title="Chỉ được chứa chữ cái, số, gạch dưới hoặc gạch ngang"
                    className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                  />
                  <p className="mt-1 text-xs text-slate-500">Chỉ dùng chữ, số, - hoặc _</p>
                </div>

                <div>
                  <label htmlFor="room-name" className="mb-2 block text-sm text-(--text-muted)">
                    Tên phòng <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="room-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: CKFF Week 4 - Grand Final"
                    className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="best-of" className="mb-2 block text-sm text-(--text-muted)">
                    Thể thức <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="best-of"
                    value={bestOf}
                    onChange={(e) => setBestOf(e.target.value as BestOf)}
                    className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong)"
                  >
                    {bestOfOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="max-players" className="mb-2 block text-sm text-(--text-muted)">
                    Số người tối đa <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="max-players"
                    type="number"
                    required
                    min={2}
                    max={100}
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(e.target.value)}
                    className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong)"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 text-sm font-medium text-(--text-strong)">Thông tin 2 đội</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="team-a" className="mb-2 block text-sm text-(--text-muted)">
                      Tên Đội A <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="team-a"
                      type="text"
                      required
                      maxLength={20}
                      value={teamAName}
                      onChange={(e) => setTeamAName(e.target.value)}
                      placeholder="VD: Alpha Hunters"
                      className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="team-b" className="mb-2 block text-sm text-(--text-muted)">
                      Tên Đội B <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="team-b"
                      type="text"
                      required
                      maxLength={20}
                      value={teamBName}
                      onChange={(e) => setTeamBName(e.target.value)}
                      placeholder="VD: Bravo Titans"
                      className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="max-bans" className="mb-2 block text-sm text-(--text-muted)">
                    Số lượt ban tối đa
                  </label>
                  <input
                    id="max-bans"
                    type="number"
                    min={0}
                    max={14}
                    value={maxBans}
                    onChange={(e) => setMaxBans(e.target.value)}
                    className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong)"
                  />
                  <p className="mt-1 text-xs text-slate-500">Tối đa 14 lượt ban</p>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm text-(--text-muted)">
                    Mật khẩu phòng
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Để trống nếu không cần"
                    className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 pt-2">
                <Link
                  href="/rooms"
                  className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-(--text-strong) transition-colors hover:border-blue-300/60 hover:bg-blue-500/10"
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Đang tạo…" : "Tạo phòng"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
