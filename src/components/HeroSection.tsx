import { useEffect, useState } from 'react';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function HeroSection() {
  const fullText = PROFILE.heroHeadline;
  const [typedLength, setTypedLength] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return fullText.length;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedLength(fullText.length);
      return;
    }

    if (typedLength >= fullText.length) return;
    const timeout = window.setTimeout(() => {
      setTypedLength((prev) => Math.min(prev + 1, fullText.length));
    }, 34);
    return () => window.clearTimeout(timeout);
  }, [typedLength, fullText]);

  return (
    <section
      id="top"
      className="relative bg-transparent pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Small logo mark + Full Name */}
        <div className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#121317] mb-6">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#121317] text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-3.5 h-3.5">
              <rect x="7" y="7" width="10" height="10" rx="1.5" />
              <path d="M9.5 3v4M14.5 3v4M9.5 17v4M14.5 17v4M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4" />
            </svg>
          </span>
          <span>{PROFILE.fullName}</span>
        </div>

        {/* Typed Display Headline */}
        <h1
          aria-label={fullText}
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-[-0.03em] text-[#121317] leading-[1.08] max-w-4xl text-balance min-h-[2.2em]"
        >
          <span>{fullText.slice(0, typedLength)}</span>
          <span
            aria-hidden="true"
            className="inline-block w-[3px] h-[0.88em] align-middle ml-1.5 bg-[#4285F4] animate-pulse"
          />
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl font-normal text-[#5F6368] max-w-2xl leading-[1.6]">
          ECE Graduate specializing in Verilog, SystemVerilog, UVM functional verification, and
          low-power FPGA/ASIC architecture.
        </p>

        {/* Centered Pill CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#patent"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/85 backdrop-blur-[8px] border border-[#DADCE0] hover:bg-[#F8F9FA] hover:border-[#121317]/30 text-[#121317] text-sm sm:text-base font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
          >
            <FileCheck2 className="w-4 h-4 text-[#4285F4]" aria-hidden="true" />
            <span>View Patent</span>
          </a>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121317] hover:bg-[#2B2D33] text-white text-sm sm:text-base font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
          >
            <span>Selected Works</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
