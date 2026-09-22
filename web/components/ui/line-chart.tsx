"use client";

import { useMemo, useState } from "react";
import { formatUsd, formatCompactNumber } from "@/lib/format";

interface Point {
  date: string;
  value: number;
}

type Format = "usd" | "usd-compact" | "compact-number";

const formatters: Record<Format, (v: number) => string> = {
  usd: (v) => formatUsd(v),
  "usd-compact": (v) => formatUsd(v, { compact: true }),
  "compact-number": (v) => formatCompactNumber(v),
};

/**
 * Single-series line chart with hover crosshair + tooltip, built to the
 * dataviz skill's mark spec: 2px line, rounded data-ends, hairline grid,
 * recessive axis, one hue per chart (no dual-axis).
 *
 * `format` is a named preset (not a callback) because this is a Client
 * Component — function props can't cross the Server->Client boundary.
 */
export function LineChart({
  data,
  color = "var(--brand)",
  format = "compact-number",
  height = 160,
}: {
  data: Point[];
  color?: string;
  format?: Format;
  height?: number;
}) {
  const formatValue = formatters[format];
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const width = 600;
  const padY = 16;
  const padX = 4;

  const { path, areaPath, points, min, max } = useMemo(() => {
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const stepX = (width - padX * 2) / Math.max(1, data.length - 1);

    const points = data.map((d, i) => {
      const x = padX + i * stepX;
      const y = padY + (1 - (d.value - min) / range) * (height - padY * 2);
      return { x, y, ...d };
    });

    const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const areaPath = `${path} L${points[points.length - 1].x.toFixed(1)},${height} L${points[0].x.toFixed(1)},${height} Z`;

    return { path, areaPath, points, min, max };
  }, [data, height]);

  const hovered = hoverIdx !== null ? points[hoverIdx] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        onMouseLeave={() => setHoverIdx(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relX = ((e.clientX - rect.left) / rect.width) * width;
          const stepX = (width - padX * 2) / Math.max(1, data.length - 1);
          const idx = Math.round((relX - padX) / stepX);
          setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
        }}
      >
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={0}
            x2={width}
            y1={padY + t * (height - padY * 2)}
            y2={padY + t * (height - padY * 2)}
            stroke="var(--grid-line)"
            strokeWidth={1}
          />
        ))}

        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.18} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#area-fill)" stroke="none" />
        <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {hovered && (
          <>
            <line x1={hovered.x} x2={hovered.x} y1={padY} y2={height - padY} stroke="var(--axis)" strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={hovered.x} cy={hovered.y} r={4} fill={color} stroke="var(--surface-1)" strokeWidth={2} />
          </>
        )}
      </svg>

      <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-muted">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>

      {hovered && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-md border border-border-strong bg-surface-3 px-2.5 py-1.5 text-xs shadow-lg"
          style={{ left: `${(hovered.x / width) * 100}%` }}
        >
          <div className="text-ink-muted">{hovered.date}</div>
          <div className="tabular font-medium text-ink-primary">{formatValue(hovered.value)}</div>
        </div>
      )}
    </div>
  );
}
