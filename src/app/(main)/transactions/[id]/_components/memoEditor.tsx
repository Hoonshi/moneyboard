'use client';

import { useState } from 'react';

interface MemoEditorProps {
  initialMemo?: string;
}

export function MemoEditor({ initialMemo = '' }: MemoEditorProps) {
  const [editing, setEditing] = useState(false);
  const [memo, setMemo] = useState(initialMemo);

  if (editing) {
    return (
      <div className="mt-2">
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={4}
          className="w-full text-xs text-gray-700 border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setEditing(false)}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            저장
          </button>
          <button
            onClick={() => setEditing(false)}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
        {memo || <span className="text-gray-300">메모 없음</span>}
      </p>
      <div className="mt-3 pt-2 border-t border-gray-100">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-blue-500 cursor-pointer hover:text-blue-700"
        >
          메모 수정 →
        </button>
      </div>
    </div>
  );
}
