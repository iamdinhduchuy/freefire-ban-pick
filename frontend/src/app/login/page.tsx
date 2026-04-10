"use client";

import GlassHeader from "@/components/glass-header";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Đăng nhập thất bại");
        return;
      }

      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      setSuccess(true);
    } catch {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden px-6 pb-20 pt-2 md:px-12 md:pb-24 md:pt-4">
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

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(8,14,30,0.9),rgba(17,24,39,0.55))] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="mb-6 text-center">
            <p className="inline-flex items-center rounded-full border border-(--color-secondary)/40 bg-(--surface-glass) px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-(--text-muted)">
              Quản trị viên
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-(--text-strong)">Đăng nhập</h1>
            <p className="mt-2 text-sm text-(--text-muted)">
              Nhập thông tin tài khoản để truy cập hệ thống
            </p>
          </div>

          {success ? (
            <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-5 text-center">
              <p className="text-sm font-medium text-emerald-200">Đăng nhập thành công!</p>
              <p className="mt-1 text-xs text-emerald-300/80">Đang chuyển hướng…</p>
              <Link
                href="/rooms"
                className="focus-ring mt-4 inline-flex h-10 items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
              >
                Vào trang phòng
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error ? (
                <div className="rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-(--text-muted)">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm text-(--text-muted)">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="focus-ring mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Đang đăng nhập…" : "Đăng nhập"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-(--text-muted)">
          Chưa có tài khoản?{" "}
          <Link href="/" className="text-(--color-primary) hover:underline">
            Liên hệ Admin
          </Link>
        </p>
      </div>
    </main>
  );
}
