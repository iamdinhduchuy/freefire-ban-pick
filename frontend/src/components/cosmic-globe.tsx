"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export type AnalyticsPin = {
  id: string;
  label: string;
  trend: string;
  position: string;
};

type CosmicGlobeProps = {
  analyticsPins: AnalyticsPin[];
};

export default function CosmicGlobe({ analyticsPins }: CosmicGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    let phi = 0;
    let frameId = 0;

    canvas.width = 600 * 2;
    canvas.height = 600 * 2;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.2,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5.4,
      baseColor: [0.8, 0.88, 0.98],
      markerColor: [0.2, 0.48, 0.95],
      glowColor: [0.52, 0.72, 0.98],
    });

    const animate = () => {
      phi += 0.002;

      globe.update({
        phi,
      });

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-150 overflow-hidden">
      <div className="pointer-events-none absolute inset-10 z-0 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.3)_0%,rgba(59,130,246,0.08)_42%,rgba(2,6,23,0)_72%)] blur-2xl" />

      {analyticsPins.map((pin) => (
        <div
          key={pin.id}
          className={`pointer-events-none absolute z-20 ${pin.position} rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2 shadow-[0_8px_30px_rgba(2,6,23,0.6)] backdrop-blur`}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.95)]" />
            Live
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xl font-semibold leading-none text-slate-100">{pin.label}</span>
            <span className="text-xs font-medium text-emerald-300">{pin.trend}</span>
          </div>
        </div>
      ))}

      <canvas
        ref={canvasRef}
        className="relative z-10 h-auto w-full rounded-full border border-blue-200/25 bg-transparent shadow-[0_0_42px_rgba(96,165,250,0.28)]"
        aria-label="Interactive globe"
      />
    </div>
  );
}
