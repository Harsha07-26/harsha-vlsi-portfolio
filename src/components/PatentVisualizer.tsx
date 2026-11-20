import { useState } from 'react';
import { PATENT_DATA, PatentPathMode } from '../data/portfolioData';

export function PatentVisualizer() {
  const [activeModeId, setActiveModeId] = useState<PatentPathMode['id']>('approx_lsb');
  const activeMode =
    PATENT_DATA.pathModes.find((m) => m.id === activeModeId) ?? PATENT_DATA.pathModes[0];

  return (
    <div className="relative h-full">
      {/* Subtle blue/indigo ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#4285F4]/12 via-[#A142F4]/8 to-transparent blur-xl"
      />

      <div className="relative h-full flex flex-col justify-between rounded-[24px] border border-[#E2E8F0] bg-[#F8F9FA]/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_8px_30px_rgba(18,19,23,0.04)]">
        {/* Header & Key Vivado Metrics */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
            <span className="font-mono text-xs text-[#5F6368]">
              Xilinx Vivado Synthesis Telemetry
            </span>
            <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
              App. {PATENT_DATA.applicationNo}
            </span>
          </div>

          {/* Hero KPI Pair */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="font-mono text-[11px] text-[#5F6368]">Power Reduction vs Exact</div>
              <div className="mt-1 text-3xl sm:text-4xl font-medium text-[#2563EB] font-mono tabular-nums">
                70%
              </div>
              <div className="mt-1 text-xs text-[#5F6368]">Dynamic + logic switching</div>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="font-mono text-[11px] text-[#5F6368]">Mean Relative Error</div>
              <div className="mt-1 text-3xl sm:text-4xl font-medium text-[#121317] font-mono tabular-nums">
                5%
              </div>
              <div className="mt-1 text-xs text-[#5F6368]">Random vector self-check</div>
            </div>
          </div>

          {/* Comparative Bar Comparison */}
          <div className="mt-5 space-y-2.5">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#5F6368]">Exact N-Bit Multiplier (Baseline)</span>
                <span className="text-[#5F6368] tabular-nums">100%</span>
              </div>
              <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div className="h-full w-full rounded-full bg-[#9AA0A6]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#121317] font-medium">Hybrid Approximate N-Bit (Patent)</span>
                <span className="text-[#2563EB] font-medium tabular-nums">30% Power (-70%)</span>
              </div>
              <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-[#2563EB] to-[#4285F4]" />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Path Mode Selector */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
          <div className="font-mono text-[11px] text-[#5F6368] mb-2.5">
            Inspect Multiplier Datapath Partition
          </div>

          <div
            role="tablist"
            aria-label="Multiplier architecture partition"
            className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F1F3F4] border border-[#E2E8F0]"
          >
            {PATENT_DATA.pathModes.map((mode) => {
              const selected = mode.id === activeModeId;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveModeId(mode.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                    selected
                      ? 'bg-[#121317] text-white shadow-sm'
                      : 'text-[#5F6368] hover:text-[#121317]'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Bit-Slice Architecture SVG */}
          <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4">
            <svg
              viewBox="0 0 460 110"
              className="w-full h-auto"
              role="img"
              aria-label={`Hybrid multiplier architecture highlighting ${activeMode.label}`}
            >
              {/* Exact MSB Block */}
              <rect
                x="10"
                y="16"
                width="145"
                height="68"
                rx="10"
                fill={activeModeId === 'exact_msb' ? '#EFF6FF' : '#F8F9FA'}
                stroke={activeModeId === 'exact_msb' ? '#2563EB' : '#DADCE0'}
                strokeWidth={activeModeId === 'exact_msb' ? '2' : '1.2'}
              />
              <text x="82" y="42" textAnchor="middle" fill="#121317" fontSize="11" fontWeight="600">
                Exact MSB Columns
              </text>
              <text x="82" y="59" textAnchor="middle" fill="#5F6368" fontSize="9.5" fontFamily="monospace">
                Bits [2N-1 : N]
              </text>
              <text x="82" y="73" textAnchor="middle" fill="#2563EB" fontSize="9" fontFamily="monospace">
                Full Adders
              </text>

              {/* Approx LSB Block */}
              <rect
                x="170"
                y="16"
                width="145"
                height="68"
                rx="10"
                fill={activeModeId === 'approx_lsb' ? '#EFF6FF' : '#F8F9FA'}
                stroke={activeModeId === 'approx_lsb' ? '#2563EB' : '#DADCE0'}
                strokeWidth={activeModeId === 'approx_lsb' ? '2' : '1.2'}
              />
              <text x="242" y="42" textAnchor="middle" fill="#121317" fontSize="11" fontWeight="600">
                Approx LSB Columns
              </text>
              <text x="242" y="59" textAnchor="middle" fill="#5F6368" fontSize="9.5" fontFamily="monospace">
                Bits [N-1 : 0]
              </text>
              <text x="242" y="73" textAnchor="middle" fill="#2563EB" fontSize="9" fontFamily="monospace">
                AND/OR Half Adders
              </text>

              {/* Bias Compensation Block */}
              <rect
                x="330"
                y="16"
                width="120"
                height="68"
                rx="10"
                fill={activeModeId === 'bias_comp' ? '#EFF6FF' : '#F8F9FA'}
                stroke={activeModeId === 'bias_comp' ? '#2563EB' : '#DADCE0'}
                strokeWidth={activeModeId === 'bias_comp' ? '2' : '1.2'}
              />
              <text x="390" y="42" textAnchor="middle" fill="#121317" fontSize="11" fontWeight="600">
                Bias Comp.
              </text>
              <text x="390" y="59" textAnchor="middle" fill="#5F6368" fontSize="9.5" fontFamily="monospace">
                Truncation Fix
              </text>
              <text x="390" y="73" textAnchor="middle" fill="#2563EB" fontSize="9" fontFamily="monospace">
                5% MRE Bound
              </text>

              {/* Connecting Bus Arrows */}
              <path d="M155 50 L170 50" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M315 50 L330 50" stroke="#2563EB" strokeWidth="1.5" />
              <text x="230" y="102" textAnchor="middle" fill="#5F6368" fontSize="9.5" fontFamily="monospace">
                Generic Parameterized N-Bit Product Output P[2N-1:0]
              </text>
            </svg>

            <div className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#2563EB] font-medium">{activeMode.bitRange}</span>
                <span className="text-[#5F6368]">{activeMode.hardwareUnit}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5F6368] leading-[1.6]">
                {activeMode.description}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] font-mono text-[#121317]">
                <span>Power: {activeMode.powerImpact}</span>
                <span className="text-[#DADCE0]">|</span>
                <span>Accuracy: {activeMode.accuracyImpact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
