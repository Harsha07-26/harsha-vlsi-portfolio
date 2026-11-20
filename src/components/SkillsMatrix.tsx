import { SKILL_CATEGORIES } from '../data/portfolioData';

export function SkillsMatrix() {
  return (
    <section id="skills" className="scroll-mt-24 border-b border-[#E2E8F0] bg-transparent py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-[#2563EB]">Core Competencies</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#121317] text-balance">
            Technical Skills Matrix
          </h2>
          <p className="mt-3 text-sm sm:text-base font-normal text-[#5F6368] leading-[1.6]">
            End-to-end RTL design, UVM functional verification, and FPGA/ASIC synthesis tooling.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={`rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA]/95 backdrop-blur-sm p-6 transition-all duration-200 hover:border-[#121317]/25 hover:bg-white hover:shadow-[0_10px_28px_rgba(18,19,23,0.05)] ${
                index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-medium tracking-[-0.02em] text-[#121317]">
                  {category.title}
                </h3>
                <span className="font-mono text-xs text-[#2563EB] tabular-nums">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-1 text-xs font-normal text-[#5F6368] leading-[1.6]">
                {category.subtitle}
              </p>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-wrap gap-x-3 gap-y-2.5">
                {category.items.map((skill, idx) => (
                  <span key={skill} className="inline-flex items-center gap-3 text-sm text-[#121317]">
                    <span className="font-mono text-[13px]">{skill}</span>
                    {idx < category.items.length - 1 && (
                      <span aria-hidden="true" className="text-[#DADCE0]">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
