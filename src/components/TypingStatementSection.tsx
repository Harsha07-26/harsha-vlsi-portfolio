import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolioData';

export function TypingStatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fullText = PROFILE.summaryStatement;

  const [started, setStarted] = useState(false);
  const [typedLength, setTypedLength] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return fullText.length;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStarted(true);
      setTypedLength(fullText.length);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fullText.length]);

  useEffect(() => {
    if (!started || typedLength >= fullText.length) return;
    const timeout = window.setTimeout(() => {
      setTypedLength((prev) => Math.min(prev + 2, fullText.length));
    }, 18);
    return () => window.clearTimeout(timeout);
  }, [started, typedLength, fullText.length]);

  return (
    <section
      ref={sectionRef}
      className="border-b border-[#E2E8F0] bg-transparent py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p
          aria-label={fullText}
          className="max-w-5xl text-left text-[clamp(1.75rem,3.6vw,3rem)] font-medium tracking-[-0.03em] text-[#121317] leading-[1.2] text-balance min-h-[3.6em]"
        >
          <span>{fullText.slice(0, typedLength)}</span>
          <span
            aria-hidden="true"
            className="inline-block w-[3px] h-[0.88em] align-middle ml-1.5 bg-[#4285F4] animate-pulse"
          />
        </p>
      </div>
    </section>
  );
}
