import { useState } from 'react';
import { SIGMOID_PROJECT, SigmoidStage } from '../data/portfolioData';

export function SigmoidPipelineVisualizer() {
  const [activeStageId, setActiveStageId] = useState<SigmoidStage['id']>('plan');
  const activeStage =
    SIGMOID_PROJECT.stages.find((s) => s.id === activeStageId) ?? SIGMOID_PROJECT.stages[0];

  return (
    <div className="relative h-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#4285F4]/12 via-[#A142F4]/8 to-transparent blur-xl"
      />

      <div className="relative h-full flex flex-col justify-between rounded-[24px] border border-[#E2E8F0] bg-[#F8F9FA]/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_8px_30px_rgba(18,19,23,0.04)]">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
            <span className="font-mono text-xs text-[#5F6368]">
              3-Stage Non-Iterative Pipeline Explorer
            </span>
            <span className="font-mono text-xs font-medium text-[#2563EB]">
              Zero Multipliers · Shift + Small LUT
            </span>
          </div>

          {/* Symmetry & Range Reduction Banner */}
          <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-[#5F6368]">Sigmoid Symmetry Exploitation</span>
            <span className="font-mono text-xs sm:text-sm font-medium text-[#121317]">
              σ(-x) = 1 - σ(x)
            </span>
          </div>

          {/* Interactive Pipeline Stage Buttons + SVG Flow */}
          <div className="mt-4">
            <div className="font-mono text-[11px] text-[#5F6368] mb-2">
              Click a pipeline stage to inspect hardware operation
            </div>

            <div
              role="tablist"
              aria-label="Approximate sigmoid pipeline stages"
              className="grid grid-cols-3 gap-2"
            >
              {SIGMOID_PROJECT.stages.map((stage) => {
                const selected = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`flex flex-col items-start text-left p-3 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                      selected
                        ? 'border-[#121317] bg-[#121317] text-white shadow-sm'
                        : 'border-[#E2E8F0] bg-white text-[#5F6368] hover:border-[#121317]/30 hover:text-[#121317]'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] ${
                        selected ? 'text-[#8AB4F8]' : 'text-[#2563EB]'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span className="mt-0.5 text-xs sm:text-sm font-medium leading-snug">
                      {stage.shortName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Pipeline Schematic SVG */}
            <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <svg
                viewBox="0 0 460 118"
                className="w-full h-auto"
                role="img"
                aria-label={`Pipeline block diagram highlighting ${activeStage.shortName}`}
              >
                {/* Input x */}
                <text x="8" y="54" fill="#5F6368" fontSize="10" fontFamily="monospace">
                  x_in
                </text>
                <path d="M36 50 L54 50" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="54,46 61,50 54,54" fill="#2563EB" />

                {/* Stage 1 */}
                <rect
                  x="62"
                  y="22"
                  width="106"
                  height="56"
                  rx="10"
                  fill={activeStageId === 'plan' ? '#EFF6FF' : '#F8F9FA'}
                  stroke={activeStageId === 'plan' ? '#2563EB' : '#DADCE0'}
                  strokeWidth={activeStageId === 'plan' ? '2' : '1.2'}
                />
                <text x="115" y="45" textAnchor="middle" fill="#121317" fontSize="10.5" fontWeight="600">
                  PLAN (4-Seg)
                </text>
                <text x="115" y="61" textAnchor="middle" fill="#2563EB" fontSize="9" fontFamily="monospace">
                  Shift-Add
                </text>

                <path d="M168 50 L186 50" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="186,46 193,50 186,54" fill="#2563EB" />

                {/* Stage 2 */}
                <rect
                  x="194"
                  y="22"
                  width="106"
                  height="56"
                  rx="10"
                  fill={activeStageId === 'taylor' ? '#EFF6FF' : '#F8F9FA'}
                  stroke={activeStageId === 'taylor' ? '#2563EB' : '#DADCE0'}
                  strokeWidth={activeStageId === 'taylor' ? '2' : '1.2'}
                />
                <text x="247" y="45" textAnchor="middle" fill="#121317" fontSize="10.5" fontWeight="600">
                  Taylor Exp
                </text>
                <text x="247" y="61" textAnchor="middle" fill="#2563EB" fontSize="9" fontFamily="monospace">
                  Compact LUT
                </text>

                <path d="M300 50 L318 50" stroke="#2563EB" strokeWidth="1.5" />
                <polygon points="318,46 325,50 318,54" fill="#2563EB" />

                {/* Stage 3 */}
                <rect
                  x="326"
                  y="22"
                  width="96"
                  height="56"
                  rx="10"
                  fill={activeStageId === 'ecfa' ? '#EFF6FF' : '#F8F9FA'}
                  stroke={activeStageId === 'ecfa' ? '#2563EB' : '#DADCE0'}
                  strokeWidth={activeStageId === 'ecfa' ? '2' : '1.2'}
                />
                <text x="374" y="45" textAnchor="middle" fill="#121317" fontSize="10.5" fontWeight="600">
                  ECFA Block
                </text>
                <text x="374" y="61" textAnchor="middle" fill="#2563EB" fontSize="9" fontFamily="monospace">
                  1-Pass Fix
                </text>

                <path d="M422 50 L438 50" stroke="#2563EB" strokeWidth="1.5" />
                <text x="441" y="54" fill="#121317" fontSize="10" fontWeight="600" fontFamily="monospace">
                  σ
                </text>

                {/* Sign bypass wire */}
                <path
                  d="M46 50 L46 98 L374 98 L374 78"
                  fill="none"
                  stroke="#9AA0A6"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <text x="210" y="111" textAnchor="middle" fill="#5F6368" fontSize="9" fontFamily="monospace">
                  Sign-Bit Symmetry Bypass (1 - σ(|x|) when x &lt; 0)
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Stage Inspection Details */}
        <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium text-[#121317]">{activeStage.name}</span>
            <span className="font-mono text-xs font-medium text-[#2563EB]">{activeStage.equation}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5F6368] leading-[1.6]">{activeStage.role}</p>
          <div className="pt-1 font-mono text-[11px] text-[#5F6368]">
            Blocks: <span className="text-[#121317]">{activeStage.hardwareBlocks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
