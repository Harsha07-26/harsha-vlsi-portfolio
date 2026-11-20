import { useState, useEffect, useRef } from 'react';
import { Menu, X, FileDown, ChevronDown, ArrowRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HeaderProps {
  onOpenResume: () => void;
}

interface NavDropdownItem {
  id: string;
  label: string;
  href: string;
  items: { title: string; subtitle: string; href: string }[];
}

const NAV_ITEMS: NavDropdownItem[] = [
  {
    id: 'patent',
    label: 'Patent',
    href: '#patent',
    items: [
      {
        title: 'Indian Patent App. No. 202641032493',
        subtitle: 'High-Speed Approximate N-Bit Multiplier · 70% Power Reduction',
        href: '#patent',
      },
      {
        title: 'Patent Office Journal No. 13/2026',
        subtitle: 'Bounded Bias-Compensation & Vivado Telemetry',
        href: '#patent',
      },
    ],
  },
  {
    id: 'works',
    label: 'Selected Works',
    href: '#projects',
    items: [
      {
        title: 'APB-Based SPI Master & UVM Suite',
        subtitle: 'Verilog RTL · All 4 CPOL/CPHA Modes · MOSI/MISO Scoreboard',
        href: '#spi-project',
      },
      {
        title: 'Approximate Sigmoid Activation Function',
        subtitle: '3-Stage PLAN, Taylor Exp & ECFA · Shift-Only Architecture',
        href: '#sigmoid-project',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    href: '#skills',
    items: [
      {
        title: 'HDL & Verification Stack',
        subtitle: 'Verilog, SystemVerilog, UVM, Lint, CDC & Synthesis',
        href: '#skills',
      },
      {
        title: 'EDA & Design Tooling',
        subtitle: 'Xilinx Vivado, Cadence Virtuoso, QuestaSim, ModelSim, MATLAB',
        href: '#skills',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    href: '#education',
    items: [
      {
        title: 'B.Tech in ECE (2022–2026)',
        subtitle: 'Raghu Engineering College · CGPA 8.67 / 10',
        href: '#education',
      },
      {
        title: 'Technical Certifications',
        subtitle: 'NPTEL Verilog · Internshala VLSI · IEEE Xtreme 18.0 · MATLAB',
        href: '#education',
      },
    ],
  },
];

export function Header({ onOpenResume }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
      <div
        ref={navRef}
        className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6"
      >
        {/* Left: VLSI Logo Mark + Bold Wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-base font-medium tracking-[-0.02em] text-[#121317] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded-lg"
        >
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#121317] text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <rect x="7" y="7" width="10" height="10" rx="1.5" />
              <path d="M9.5 3v4M14.5 3v4M9.5 17v4M14.5 17v4M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4" />
            </svg>
          </span>
          <span className="font-semibold">Harsha Billa</span>
        </a>

        {/* Center: Nav Links with Subtle Dropdowns */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isOpen = openDropdown === item.id;
            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="inline-flex items-center">
                  <a
                    href={item.href}
                    onClick={() => setOpenDropdown(null)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-normal text-[#5F6368] hover:text-[#121317] hover:bg-[#F1F3F4]/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                  >
                    <span>{item.label}</span>
                  </a>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${item.label} menu`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.id)}
                    className="-ml-1.5 p-1 rounded-full text-[#5F6368] hover:text-[#121317] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#121317]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="absolute left-0 top-full pt-2 w-80 z-50">
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_14px_36px_rgba(18,19,23,0.08)]">
                      {item.items.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setOpenDropdown(null)}
                          className="group flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 hover:bg-[#F8F9FA] transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-[#121317] group-hover:text-[#2563EB] transition-colors">
                              {sub.title}
                            </div>
                            <div className="mt-0.5 text-xs text-[#5F6368] leading-snug">
                              {sub.subtitle}
                            </div>
                          </div>
                          <ArrowRight
                            className="w-3.5 h-3.5 mt-1 text-[#5F6368] group-hover:text-[#121317] shrink-0 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Secondary Frosted Pill + Primary Jet-Black Pill */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-[#121317] bg-white/85 backdrop-blur-md border border-[#DADCE0] hover:bg-[#F8F9FA] hover:border-[#121317]/30 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
          >
            Contact Me
          </a>
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-[#121317] hover:bg-[#2B2D33] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
          >
            <FileDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#DADCE0] bg-white/85 text-[#121317] hover:bg-[#F8F9FA] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white/95 backdrop-blur-lg px-4 py-5">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3.5 py-3 rounded-xl text-base font-medium text-[#121317] hover:bg-[#F8F9FA] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="px-3.5 py-3 rounded-xl text-base font-medium text-[#121317] hover:bg-[#F8F9FA] transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center px-4 py-3 rounded-full text-sm font-medium text-[#121317] border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] transition-colors"
            >
              Contact Me
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium text-white bg-[#121317] hover:bg-[#2B2D33] transition-colors"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
