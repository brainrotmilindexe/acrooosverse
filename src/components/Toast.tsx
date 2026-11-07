import { Check, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'success' }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#0c0018]/95 border border-[#00f0ff]/50 shadow-[0_0_25px_rgba(0,240,255,0.3)] rounded-xl text-sm text-[#f4f1eb] backdrop-blur-xl animate-fade-in"
    >
      <div className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center shrink-0 text-[#00f0ff]">
        {type === 'success' ? <Check className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
      </div>
      <span className="font-mono text-xs tracking-wide text-[#e8e4dc]">{message}</span>
    </div>
  );
}
