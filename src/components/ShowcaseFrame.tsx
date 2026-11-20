import { useRef, useState } from 'react';
import { ArrowDown, Play, Cpu, CheckCircle2 } from 'lucide-react';
import { PATENT_DATA, SPI_PROJECT } from '../data/portfolioData';

export function ShowcaseFrame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0, active: false });
  const [activeSuite, setActiveSuite] = useState<'multiplier' | 'uvm'>('multiplier');

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Compute subtle spring-like offset from frame center, clamped so pill never exits frame
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const maxOffsetX = Math.min(180, rect.width * 0.28);
    const maxOffsetY = Math.min(90, rect.height * 0.24);
    setCursorOffset({
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, relX * 0.45)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, relY * 0.45)),
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setCursorOffset({ x: 0, y: 0, active: false });
  };

  return (
    <section className="bg-transparent pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative overflow-hidden rounded-[28px] bg-[#0D0E12] text-white border border-[#24262E] shadow-[0_24px_64px_rgba(18,19,23,0.14)] min-h-[380px] sm:min-h-[440px] p-6 sm:p-10 flex flex-col justify-between"
        >
          {/* Subtle architectural dot & gradient backdrop inside dark showcase */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(#343844_1px,transparent_1px)] [background-size:20px_20px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4285F4]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#A142F4]/15 blur-3xl"
          />

          {/* Top Bar Inside Frame */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-[#8AB4F8]" aria-hidden="true" />
              <span className="font-mono text-xs text-white/80">
                Silicon Architecture &amp; UVM Verification Live Overview
              </span>
            </div>

            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveSuite('multiplier')}
                className={`px-3 py-1 rounded-full font-mono text-[11px] transition-colors cursor-pointer ${
                  activeSuite === 'multiplier'
                    ? 'bg-white text-[#121317] font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Approx N-Bit Multiplier
              </button>
              <button
                type="button"
                onClick={() => setActiveSuite('uvm')}
                className={`px-3 py-1 rounded-full font-mono text-[11px] transition-colors cursor-pointer ${
                  activeSuite === 'uvm'
                    ? 'bg-white text-[#121317] font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                UVM SPI Suite
              </button>
            </div>
          </div>

          {/* Center Architectural Preview Content */}
          <div className="relative z-10 my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {activeSuite === 'multiplier' ? (
              <>
                <div className="md:col-span-7 space-y-3">
                  <div className="font-mono text-xs text-[#8AB4F8]">
                    Indian Patent {PATENT_DATA.applicationNo} · {PATENT_DATA.filedDate}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.025em] text-white leading-tight">
                    Hybrid Partial-Product Multiplier with Bounded Bias Compensation
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                    Partitions exact MSB compressors with AND/OR approximate LSB half adders and
                    error-recovery logic—synthesized and verified in Xilinx Vivado.
                  </p>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-mono text-[11px] text-white/60">Dynamic Power</div>
                    <div className="mt-1 font-mono text-3xl font-medium text-[#8AB4F8] tabular-nums">
                      -70%
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-white/60">vs Exact Baseline</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-mono text-[11px] text-white/60">Mean Relative Error</div>
                    <div className="mt-1 font-mono text-3xl font-medium text-white tabular-nums">
                      5%
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-white/60">Random TB Vectors</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-7 space-y-3">
                  <div className="font-mono text-xs text-[#8AB4F8]">
                    {SPI_PROJECT.category} · {SPI_PROJECT.date}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.025em] text-white leading-tight">
                    APB3/4 Slave Interface Driving Full-Duplex SPI Master Verification
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                    Independent APB and SPI UVM agents execute constrained-random sequences across
                    all 4 CPOL/CPHA clock modes and MSB/LSB bit orders.
                  </p>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-mono text-[11px] text-white/60">Mode Combinations</div>
                    <div className="mt-1 font-mono text-3xl font-medium text-[#8AB4F8] tabular-nums">
                      8 / 8
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-white/60">CPOL/CPHA × Order</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-mono text-[11px] text-white/60">Scoreboard Check</div>
                    <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-lg font-medium text-white">
                      <CheckCircle2 className="w-5 h-5 text-[#8AB4F8]" aria-hidden="true" />
                      <span>MOSI / MISO</span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-white/60">Coverage Closed</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Floating Frosted-White Pill Tracking Cursor */}
          <div className="relative z-20 flex items-center justify-center py-2">
            <a
              href={activeSuite === 'multiplier' ? '#patent' : '#spi-project'}
              style={{
                transform: `translate3d(${cursorOffset.x}px, ${cursorOffset.y}px, 0)`,
                transition: cursorOffset.active
                  ? 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#121317] text-sm font-medium shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            >
              <Play className="w-3.5 h-3.5 fill-[#121317] text-[#121317]" aria-hidden="true" />
              <span>Inspect Architecture</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#5F6368]" aria-hidden="true" />
            </a>
          </div>

          {/* Bottom Spec Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
            <span>Verilog · SystemVerilog · UVM · Xilinx Vivado</span>
            <span>Interactive Vivado, SPI Waveform &amp; Pipeline Explorers Below</span>
          </div>
        </div>
      </div>
    </section>
  );
}
