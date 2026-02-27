"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

interface SettingsModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SettingsModalContext = createContext<SettingsModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

function useSettingsModal() {
  const context = useContext(SettingsModalContext);

  return context;
}

//최상위 요소 => 게시판임
function Root({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <SettingsModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SettingsModalContext.Provider>
  );
}

//모달 열기 버튼
function Trigger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useSettingsModal();
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}

//오버레이
function Portal({ children, title }: { children: ReactNode; title: string }) {
  const { isOpen, close } = useSettingsModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-gray-800">{title}</h3>
          <button
            onClick={close}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

function Footer({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 mt-6">{children}</div>;
}

//취소버튼
function Close({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { close } = useSettingsModal();
  return (
    <button onClick={close} className={className}>
      {children}
    </button>
  );
}

export const SettingsModal = {
  Root,
  Trigger,
  Portal,
  Field,
  Footer,
  Close,
  useSettingsModal,
};
