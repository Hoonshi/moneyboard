import { AlertTriangle } from 'lucide-react';
import type { ElementType } from 'react';

interface BudgetCardProps {
  Icon: ElementType;
  cat: string;
  used: number;
  total: number;
  color: string;
}

export function BudgetCard({ Icon, cat, used, total, color }: BudgetCardProps) {
  const pct = Math.round((used / total) * 100);
  const isOver = pct > 80;

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
            <Icon size={14} className="text-gray-500" />
          </div>
          <span className="text-xs font-semibold text-gray-700">{cat}</span>
        </div>
        <span className={`text-xs font-bold ${isOver ? 'text-red-500' : 'text-gray-600'}`}>
          {pct}%
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${isOver ? 'bg-red-400' : color}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-gray-400">₩{(used / 10000).toFixed(0)}만 사용</span>
        <span className="text-[10px] text-gray-400">₩{(total / 10000).toFixed(0)}만</span>
      </div>
      {isOver && (
        <div className="flex items-center gap-1 mt-1">
          <AlertTriangle size={10} className="text-red-400" />
          <p className="text-[10px] text-red-400">예산 초과 주의</p>
        </div>
      )}
    </div>
  );
}
