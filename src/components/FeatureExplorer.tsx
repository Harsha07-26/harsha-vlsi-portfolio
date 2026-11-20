import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PATENT_DATA, SPI_PROJECT, SIGMOID_PROJECT } from '../data/portfolioData';
import { PatentVisualizer } from './PatentVisualizer';
import { SpiWaveformVisualizer } from './SpiWaveformVisualizer';
import { SigmoidPipelineVisualizer } from './SigmoidPipelineVisualizer';

export function FeatureExplorer() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-b border-[#E2E8F0] bg-transparent py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-24 sm:space-y-28">
        {/* Item 1: Published Patent */}
        <article id="patent" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#2563EB]">
                <span>01</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span>{PATENT_DATA.badge}</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span className="text-[#5F6368]">{PATENT_DATA.filedDate}</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span className="text-[#5F6368] tabular-nums">
                  App. No. {PATENT_DATA.applicationNo}
                </span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-[#121317] leading-tight text-balance">
                {PATENT_DATA.title}
              </h2>

              <p className="mt-2 font-mono text-xs text-[#5F6368]">
                Published in {PATENT_DATA.journalNo}
              </p>

              <ul className="mt-6 space-y-3.5 text-sm sm:text-base font-normal text-[#5F6368] leading-[1.6]">
                {PATENT_DATA.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#5F6368]">
                  {PATENT_DATA.tags.join(' · ')}
                </span>
                <button
                  type="button"
                  onClick={() => toggleDetails('patent')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#121317] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  <span>{expandedId === 'patent' ? 'Hide specification' : 'Explore details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {expandedId === 'patent' && (
                <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-4 text-xs sm:text-sm text-[#5F6368] leading-[1.6]">
                  <strong className="text-[#121317] font-medium">Official Title:</strong>{' '}
                  {PATENT_DATA.fullTitle}. Generic parameterized Verilog RTL tested over random
                  operand vectors against an exact reference multiplier.
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <PatentVisualizer />
            </div>
          </div>
        </article>

        {/* Selected Works Section Anchor */}
        <div id="projects" className="scroll-mt-24 space-y-24 sm:space-y-28">
          {/* Item 2: APB Based SPI Master Protocol */}
          <article id="spi-project" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <SpiWaveformVisualizer />
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#2563EB]">
                <span>02</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span>{SPI_PROJECT.category}</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span className="text-[#5F6368]">{SPI_PROJECT.date}</span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-[#121317] leading-tight text-balance">
                {SPI_PROJECT.title}
              </h2>

              <ul className="mt-6 space-y-3.5 text-sm sm:text-base font-normal text-[#5F6368] leading-[1.6]">
                {SPI_PROJECT.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#5F6368]">
                  {SPI_PROJECT.tags.join(' · ')}
                </span>
                <button
                  type="button"
                  onClick={() => toggleDetails('spi')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#121317] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  <span>{expandedId === 'spi' ? 'Hide specification' : 'Explore details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {expandedId === 'spi' && (
                <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-4 text-xs sm:text-sm text-[#5F6368] leading-[1.6]">
                  <strong className="text-[#121317] font-medium">UVM Verification Architecture:</strong>{' '}
                  APB agent drives control/baud/TX registers while SPI slave agent captures serial
                  frames; reference scoreboard verifies full-duplex MOSI and MISO integrity across all
                  8 CPOL/CPHA and bit-order combinations.
                </div>
              )}
            </div>
          </article>

          {/* Item 3: Approximate Sigmoid Activation Function */}
          <article id="sigmoid-project" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#2563EB]">
                <span>03</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span>{SIGMOID_PROJECT.category}</span>
                <span aria-hidden="true" className="text-[#DADCE0]">·</span>
                <span className="text-[#5F6368]">{SIGMOID_PROJECT.date}</span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-[#121317] leading-tight text-balance">
                {SIGMOID_PROJECT.title}
              </h2>

              <ul className="mt-6 space-y-3.5 text-sm sm:text-base font-normal text-[#5F6368] leading-[1.6]">
                {SIGMOID_PROJECT.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#5F6368]">
                  {SIGMOID_PROJECT.tags.join(' · ')}
                </span>
                <button
                  type="button"
                  onClick={() => toggleDetails('sigmoid')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#121317] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  <span>{expandedId === 'sigmoid' ? 'Hide specification' : 'Explore details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {expandedId === 'sigmoid' && (
                <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-4 text-xs sm:text-sm text-[#5F6368] leading-[1.6]">
                  <strong className="text-[#121317] font-medium">Multiplier-Free Datapath:</strong>{' '}
                  Combines 4-segment Piecewise Linear Approximation, truncated Taylor exponential, and
                  single-pass ECFA refinement to match Newton-Raphson accuracy without iterative logic.
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <SigmoidPipelineVisualizer />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
