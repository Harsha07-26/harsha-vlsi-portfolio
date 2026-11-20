import { FileDown, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

const WORDMARK_LETTERS = 'HARSHA BILLA'.split('');

export function Footer({ onOpenResume }: FooterProps) {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white pt-14 pb-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer Contact & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E2E8F0]">
          <div className="md:col-span-5 space-y-3">
            <div className="text-sm font-medium tracking-[-0.015em] text-[#121317]">
              {PROFILE.fullName}
            </div>
            <p className="text-sm font-normal text-[#5F6368] max-w-sm leading-[1.6]">
              Front-End ASIC/SoC Design &amp; Functional Verification Engineer. Verilog,
              SystemVerilog, UVM, and low-power FPGA/ASIC architecture.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5F6368] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-xs text-[#2563EB] mb-3">Navigation</div>
            <ul className="space-y-2 text-sm text-[#5F6368]">
              <li>
                <a href="#patent" className="hover:text-[#121317] transition-colors">
                  Published Patent
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#121317] transition-colors">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#121317] transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#121317] transition-colors">
                  Education &amp; Certifications
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-xs text-[#2563EB] mb-3">Contact &amp; Links</div>
            <ul className="space-y-2.5 text-sm text-[#5F6368]">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#121317] transition-colors font-mono text-xs sm:text-sm"
                >
                  <Mail className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                  <span>{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-[#121317] transition-colors font-mono text-xs sm:text-sm tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                  <span>{PROFILE.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#121317] transition-colors font-mono text-xs sm:text-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                  <span>{PROFILE.linkedinDisplay}</span>
                </a>
              </li>
              <li className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-xs font-medium text-[#121317] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span>View Resume</span>
                </button>
                <a
                  href={PROFILE.resumePath}
                  download={PROFILE.resumeFilename}
                  className="text-xs font-mono text-[#2563EB] hover:text-[#121317] underline underline-offset-4 transition-colors"
                >
                  Download PDF
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Full-Width Black Wordmark */}
        <div className="py-10 sm:py-14 select-none" aria-label="HARSHA BILLA">
          <div className="w-full flex items-center justify-between font-medium tracking-[-0.04em] leading-none text-[clamp(2.5rem,11vw,9.2rem)] text-[#121317] border-b border-[#E2E8F0] pb-6">
            {WORDMARK_LETTERS.map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-transform duration-200 hover:-translate-y-3 hover:text-[#2563EB] ${
                  char === ' ' ? 'w-[0.35em]' : ''
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6368]">
          <span>
            &copy; {new Date().getFullYear()} {PROFILE.fullName}. {PROFILE.location}.
          </span>
          <span className="font-mono text-[11px] text-[#5F6368]">
            Indian Patent App. No. 202641032493
          </span>
        </div>
      </div>
    </footer>
  );
}
