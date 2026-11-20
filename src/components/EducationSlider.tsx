import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CREDENTIALS } from '../data/portfolioData';

export function EducationSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Education' | 'Certification'>('All');

  const filteredItems =
    filter === 'All' ? CREDENTIALS : CREDENTIALS.filter((c) => c.type === filter);

  const updateScrollButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [updateScrollButtons, filter]);

  const handleFilterChange = (nextFilter: 'All' | 'Education' | 'Certification') => {
    setFilter(nextFilter);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(300, Math.floor(el.clientWidth * 0.72));
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section
      id="education"
      className="scroll-mt-24 bg-transparent py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-[#2563EB]">Academic Background</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#121317] text-balance">
              Education &amp; Certifications
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Filter */}
            <div
              role="group"
              aria-label="Filter credentials"
              className="inline-flex items-center p-1 rounded-full bg-[#F1F3F4] border border-[#E2E8F0]"
            >
              {(['All', 'Education', 'Certification'] as const).map((tab) => {
                const active = filter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleFilterChange(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                      active
                        ? 'bg-[#121317] text-white'
                        : 'text-[#5F6368] hover:text-[#121317]'
                    }`}
                  >
                    {tab === 'Certification' ? 'Certifications' : tab}
                  </button>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                aria-label="Previous credential card"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#DADCE0] bg-white text-[#121317] hover:bg-[#F8F9FA] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                aria-label="Next credential card"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#DADCE0] bg-white text-[#121317] hover:bg-[#F8F9FA] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={trackRef}
          onScroll={updateScrollButtons}
          className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
        >
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[340px] lg:w-[360px] flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA]/95 backdrop-blur-sm p-6 hover:border-[#121317]/25 hover:bg-white hover:shadow-[0_10px_28px_rgba(18,19,23,0.05)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-[#2563EB] font-medium">{item.type}</span>
                  <span className="text-[#5F6368] tabular-nums">{item.periodOrIssuer}</span>
                </div>

                <h3 className="mt-3 text-lg font-medium tracking-[-0.02em] text-[#121317] leading-snug">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-sm font-medium text-[#5F6368]">{item.institution}</p>

                <p className="mt-4 text-sm font-normal text-[#5F6368] leading-[1.6]">{item.detail}</p>
              </div>

              {item.metric && (
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] font-mono text-sm font-medium text-[#2563EB] tabular-nums">
                  {item.metric}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
