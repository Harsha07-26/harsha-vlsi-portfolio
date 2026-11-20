import { useState } from 'react';
import { SPI_PROJECT } from '../data/portfolioData';

export function SpiWaveformVisualizer() {
  const [selectedMode, setSelectedMode] = useState<0 | 1 | 2 | 3>(0);
  const [bitOrder, setBitOrder] = useState<'MSB' | 'LSB'>('MSB');

  const modeCfg =
    SPI_PROJECT.modes.find((m) => m.mode === selectedMode) ?? SPI_PROJECT.modes[0];

  const bitLabels =
    bitOrder === 'MSB' ? ['D7', 'D6', 'D5', 'D4'] : ['D0', 'D1', 'D2', 'D3'];
  const mosiPattern = [1, 0, 1, 1];
  const misoPattern = [0, 1, 1, 0];

  const startX = 76;
  const bitWidth = 84;
  const endX = startX + bitWidth * 4;

  const sclkHighY = 66;
  const sclkLowY = 92;
  const idleY = modeCfg.cpol === 0 ? sclkLowY : sclkHighY;
  const activeFirstY = modeCfg.cpol === 0 ? sclkHighY : sclkLowY;

  const sclkPoints: string[] = [];
  sclkPoints.push(`54,${idleY}`);
  sclkPoints.push(`${startX},${idleY}`);

  for (let i = 0; i < 4; i++) {
    const x0 = startX + i * bitWidth;
    const xMid = x0 + bitWidth / 2;
    const xEnd = x0 + bitWidth;
    sclkPoints.push(`${x0},${activeFirstY}`);
    sclkPoints.push(`${xMid},${activeFirstY}`);
    sclkPoints.push(`${xMid},${idleY}`);
    sclkPoints.push(`${xEnd},${idleY}`);
  }
  sclkPoints.push(`${endX + 16},${idleY}`);

  const sampleXs = [0, 1, 2, 3].map((i) =>
    modeCfg.cpha === 0 ? startX + i * bitWidth : startX + i * bitWidth + bitWidth / 2
  );

  const buildDataWave = (bits: number[], yHigh: number, yLow: number) => {
    const shiftOffset = modeCfg.cpha === 0 ? -10 : 0;
    const pts: string[] = [];
    const firstX = startX + shiftOffset;
    pts.push(`54,${yLow}`);
    pts.push(`${firstX},${yLow}`);
    for (let i = 0; i < bits.length; i++) {
      const bx0 = startX + i * bitWidth + shiftOffset;
      const bx1 = startX + (i + 1) * bitWidth + shiftOffset;
      const y = bits[i] === 1 ? yHigh : yLow;
      pts.push(`${bx0},${y}`);
      pts.push(`${bx1},${y}`);
    }
    pts.push(`${endX + 16},${yLow}`);
    return pts.join(' ');
  };

  return (
    <div className="relative h-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#4285F4]/12 via-[#A142F4]/8 to-transparent blur-xl"
      />

      <div className="relative h-full flex flex-col justify-between rounded-[24px] border border-[#E2E8F0] bg-[#F8F9FA]/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_8px_30px_rgba(18,19,23,0.04)]">
        <div>
          {/* Header & UVM Coverage */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
            <span className="font-mono text-xs text-[#5F6368]">
              Interactive SPI Timing &amp; UVM Inspector
            </span>
            <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
              UVM Coverage: 8/8 Modes Verified
            </span>
          </div>

          {/* Interactive Mode & Bit-Order Controls */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Select SPI clock mode"
              className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#F1F3F4] border border-[#E2E8F0]"
            >
              {SPI_PROJECT.modes.map((m) => {
                const active = m.mode === selectedMode;
                return (
                  <button
                    key={m.mode}
                    type="button"
                    onClick={() => setSelectedMode(m.mode)}
                    className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                      active
                        ? 'bg-[#121317] text-white shadow-sm'
                        : 'text-[#5F6368] hover:text-[#121317]'
                    }`}
                  >
                    Mode {m.mode}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="Select bit transmission order"
              className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F1F3F4] border border-[#E2E8F0] shrink-0"
            >
              {(['MSB', 'LSB'] as const).map((order) => (
                <button
                  key={order}
                  type="button"
                  onClick={() => setBitOrder(order)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                    bitOrder === order
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'text-[#5F6368] hover:text-[#121317]'
                  }`}
                >
                  {order}-First
                </button>
              ))}
            </div>
          </div>

          {/* Parameter Strip */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#5F6368]">
            <span>
              CPOL: <strong className="text-[#121317]">{modeCfg.cpol}</strong> ({modeCfg.idleLevel})
            </span>
            <span aria-hidden="true">·</span>
            <span>
              CPHA: <strong className="text-[#121317]">{modeCfg.cpha}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Sample: <strong className="text-[#2563EB]">{modeCfg.sampleEdge}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Shift: <strong className="text-[#121317]">{modeCfg.shiftEdge}</strong>
            </span>
          </div>

          {/* Dynamic Digital Timing SVG */}
          <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-3 sm:p-4 overflow-x-auto">
            <svg
              viewBox="0 0 440 218"
              className="w-full min-w-[360px] h-auto"
              role="img"
              aria-label={`SPI Mode ${modeCfg.mode} digital timing waveform, ${bitOrder} first`}
            >
              {/* Vertical sampling dashed strobe lines */}
              {sampleXs.map((sx, idx) => (
                <g key={idx}>
                  <line
                    x1={sx}
                    y1="16"
                    x2={sx}
                    y2="200"
                    stroke="#4285F4"
                    strokeOpacity="0.38"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={sx}
                    y="14"
                    textAnchor="middle"
                    fill="#2563EB"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {bitLabels[idx]}
                  </text>
                </g>
              ))}

              {/* Signal labels */}
              <text x="8" y="42" fill="#5F6368" fontSize="10" fontFamily="monospace">
                CS_N
              </text>
              <text x="8" y="83" fill="#2563EB" fontSize="10" fontWeight="600" fontFamily="monospace">
                SCLK
              </text>
              <text x="8" y="132" fill="#121317" fontSize="10" fontWeight="600" fontFamily="monospace">
                MOSI
              </text>
              <text x="8" y="182" fill="#A142F4" fontSize="10" fontWeight="600" fontFamily="monospace">
                MISO
              </text>

              {/* CS_N active-low envelope */}
              <polyline
                fill="none"
                stroke="#9AA0A6"
                strokeWidth="1.8"
                points={`54,26 62,26 64,46 ${endX + 4},46 ${endX + 6},26 428,26`}
              />

              {/* SCLK waveform */}
              <polyline
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinejoin="round"
                points={sclkPoints.join(' ')}
              />

              {/* Sample Edge Markers on SCLK */}
              {sampleXs.map((sx, idx) => (
                <circle
                  key={`dot-${idx}`}
                  cx={sx}
                  cy={(sclkHighY + sclkLowY) / 2}
                  r="3"
                  fill="#121317"
                />
              ))}

              {/* MOSI waveform */}
              <polyline
                fill="none"
                stroke="#121317"
                strokeWidth="2"
                strokeLinejoin="round"
                points={buildDataWave(mosiPattern, 114, 140)}
              />

              {/* MISO waveform */}
              <polyline
                fill="none"
                stroke="#A142F4"
                strokeWidth="1.8"
                strokeLinejoin="round"
                points={buildDataWave(misoPattern, 164, 190)}
              />

              {/* Legend */}
              <text x="54" y="212" fill="#5F6368" fontSize="9" fontFamily="monospace">
                Obsidian nodes mark {modeCfg.sampleEdge.toLowerCase()} sample instants · Scoreboard checks MOSI/MISO
              </text>
            </svg>
          </div>
        </div>

        {/* Mode Summary & UVM Verification Status */}
        <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex flex-col gap-2">
          <p className="text-xs sm:text-sm text-[#5F6368] leading-[1.6]">{modeCfg.summary}</p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#121317] pt-1">
            <span>APB Slave FSM · Baud Gen · Interrupts</span>
            <span className="text-[#2563EB] font-medium">Scoreboard: PASS (MOSI / MISO)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
