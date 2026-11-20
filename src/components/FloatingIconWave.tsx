const WAVE_ICONS = [
  {
    label: 'CPU Die',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9.5 3v4M14.5 3v4M9.5 17v4M14.5 17v4M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4" />
      </svg>
    ),
  },
  {
    label: 'Clock Waveform',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M2 16h3V8h4v8h4V8h4v8h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'RTL Code Braces',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M8 5c-1.5 0-2 .8-2 2.2v2.6c0 1.2-.8 2.2-2 2.2 1.2 0 2 1 2 2.2v2.6C6 18.2 6.5 19 8 19M16 5c1.5 0 2 .8 2 2.2v2.6c0 1.2.8 2.2 2 2.2-1.2 0-2 1-2 2.2v2.6c0 1.4-.5 2.2-2 2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Terminal Shell',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M5 7l5 5-5 5M12 17h7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Logic Gate',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M3 8h4M3 16h4M17 12h4" strokeLinecap="round" />
        <path d="M7 5h4a7 7 0 0 1 0 14H7V5z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'UVM Check',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Clock Pulse',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Synthesis Layers',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" strokeLinejoin="round" />
        <path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Circuit Node',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="18" cy="7" r="2.2" />
        <circle cx="18" cy="17" r="2.2" />
        <path d="M8.2 11.2L15.8 7.8M8.2 12.8l7.6 3.4" />
      </svg>
    ),
  },
  {
    label: 'Memory Block',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M4 10h16M4 14h16M10 5v14M14 5v14" />
      </svg>
    ),
  },
  {
    label: 'Multiplexer',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M8 4l8 3.5v9L8 20V4z" strokeLinejoin="round" />
        <path d="M4 8h4M4 16h4M16 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Adder Tree',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <circle cx="12" cy="12" r="7.5" />
        <path d="M12 8.5v7M8.5 12h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Power Curve',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M4 19V5M4 19h16" strokeLinecap="round" />
        <path d="M7 15l4-5 3.5 3L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'FPGA Fabric',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Data Bus',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M4 8h16M4 12h16M4 16h16" strokeLinecap="round" />
        <path d="M16 5l3 3-3 3M8 13l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Silicon Wafer',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M7 7.5h10M5.5 12h13M7 16.5h10M12 4.5v15" strokeOpacity="0.85" />
      </svg>
    ),
  },
  {
    label: 'Timing Strobe',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
        <path d="M4 17l5-10 4 7 3-5 4 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function FloatingIconWave() {
  return (
    <section aria-label="VLSI and EDA hardware capabilities" className="bg-transparent py-10 sm:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between lg:justify-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-8 px-2">
          {WAVE_ICONS.map((item, idx) => {
            // Sine wave vertical offset across 17 circular pills
            const sineOffset = Math.round(Math.sin((idx / (WAVE_ICONS.length - 1)) * Math.PI * 2.4) * 20);
            return (
              <div
                key={item.label}
                style={{ transform: `translateY(${sineOffset}px)` }}
                className="shrink-0"
              >
                <div
                  title={item.label}
                  aria-label={item.label}
                  className="w-14 h-14 rounded-full bg-white border border-[#F1F3F4] text-[#121317] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.15] hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(18,19,23,0.1)]"
                >
                  {item.svg}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
