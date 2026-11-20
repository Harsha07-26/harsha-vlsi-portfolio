import { ArrowRight, X } from 'lucide-react';
import { PATENT_DATA } from '../data/portfolioData';

interface AnnouncementBarProps {
  visible: boolean;
  onDismiss: () => void;
}

export function AnnouncementBar({ visible, onDismiss }: AnnouncementBarProps) {
  if (!visible) return null;

  return (
    <div className="relative z-30 px-4 pt-4">
      <div className="mx-auto max-w-4xl rounded-2xl sm:rounded-full bg-[#121317] text-white px-4 py-2 sm:py-2 flex items-center justify-between gap-3 shadow-[0_10px_28px_rgba(18,19,23,0.12)]">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] min-w-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/15 text-white font-medium whitespace-nowrap shrink-0">
            Published
          </span>
          <span className="text-white/85 truncate">
            <span className="font-mono text-white">Indian Patent App. No. {PATENT_DATA.applicationNo}</span>
            <span className="hidden md:inline"> — High-Speed Approximate N-Bit Multiplier</span>
          </span>
          <a
            href="#patent"
            className="inline-flex items-center gap-1 text-[#8AB4F8] hover:text-white font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded"
          >
            <span>Inspect patent</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss patent announcement"
          className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
