"use client";

interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Dialog({ open, onClose, children, title }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
        {title && (
          <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
}
