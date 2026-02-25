const segments = [
  { pct: 35, offset: 0, color: "#f97316" },
  { pct: 28, offset: 35, color: "#3b82f6" },
  { pct: 15, offset: 63, color: "#22c55e" },
  { pct: 12, offset: 78, color: "#a855f7" },
  { pct: 10, offset: 90, color: "#6b7280" },
];

const legend = [
  { label: "식비", pct: "35%", color: "bg-orange-400" },
  { label: "주거", pct: "28%", color: "bg-blue-400" },
  { label: "교통", pct: "15%", color: "bg-green-400" },
  { label: "여가", pct: "12%", color: "bg-purple-400" },
  { label: "기타", pct: "10%", color: "bg-gray-400" },
];

export function CategoryBreakdown() {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-bold text-gray-800 mb-3">카테고리별 지출</p>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
            {segments.map((s, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={s.color}
                strokeWidth="18"
                strokeDasharray={`${s.pct * 2.51} ${251.2 - s.pct * 2.51}`}
                strokeDashoffset={`${-s.offset * 2.51}`}
              />
            ))}
          </svg>
        </div>
        <div className="flex-1 space-y-1.5">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[11px] text-gray-600 flex-1">
                {l.label}
              </span>
              <span className="text-[11px] font-medium text-gray-800">
                {l.pct}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
