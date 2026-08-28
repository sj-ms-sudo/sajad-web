"use client";

export default function OrbitIndicator({
  total,
  index,
  active = true,
  beatSignal = 0,
}: {
  total: number;
  index: number;
  active?: boolean;
  beatSignal?: number;
}) {
  const cx = 80;
  const cy = 80;
  const r = 56;
  const step = 360 / total;
  const groupRotation = -step * index;

  return (
    <div className="flex flex-col items-center gap-3" aria-hidden="true">
      <div className="relative w-32 h-32 md:w-36 md:h-36">
        <svg viewBox="0 0 160 160" className="w-full h-full">
          <circle
            cx={cx}
            cy={cy}
            r={r + 14}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth={1}
            strokeDasharray="2 6"
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: active ? "orbit-spin 18s linear infinite" : "none",
            }}
          />

          <g
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: `rotate(${groupRotation}deg)`,
              transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {Array.from({ length: total }).map((_, i) => {
              const angle = ((-90 + step * i) * Math.PI) / 180;
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              const isActive = i === index;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={isActive ? 5.5 : 3}
                  fill={isActive ? "var(--accent)" : "var(--fg-faint)"}
                  style={{
                    transition: "r 0.4s ease, fill 0.4s ease",
                    filter: isActive ? "drop-shadow(0 0 6px var(--accent))" : "none",
                  }}
                />
              );
            })}
          </g>

          {/* fixed ring marking where the active dot always lands */}
          <circle cx={cx} cy={cy - r} r={9} fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.5} />

          {/* remounts on every beatSignal tick, restarting the pulse */}
          <circle key={beatSignal} cx={cx} cy={cy} r={5} fill="var(--accent)" className="orbit-pulse" />
        </svg>
      </div>
      <div className="dev-label" style={{ opacity: 0.75 }}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}