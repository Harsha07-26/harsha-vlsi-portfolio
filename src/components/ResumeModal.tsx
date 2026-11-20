import { useEffect, useMemo } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const STANDALONE_RESUME_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Harsha Sri Naga Vardhan Billa — Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Google+Sans+Code:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Google Sans Flex", system-ui, sans-serif;
      color: #121317;
      background: #F8F9FA;
      padding: 28px 16px;
      line-height: 1.48;
      font-size: 13.5px;
    }
    .toolbar {
      max-width: 820px;
      margin: 0 auto 14px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .btn {
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 9999px;
      border: 1px solid #121317;
      background: #121317;
      color: #fff;
      cursor: pointer;
    }
    .sheet {
      max-width: 820px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 36px 42px;
    }
    .header { text-align: center; border-bottom: 1.5px solid #121317; padding-bottom: 12px; margin-bottom: 14px; }
    .header h1 { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; text-transform: uppercase; }
    .header .contact { margin-top: 5px; font-size: 12px; color: #3C4043; }
    .header a { color: #2563EB; text-decoration: none; }
    .section { margin-top: 13px; }
    .section-title {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #121317;
      border-bottom: 1px solid #DADCE0;
      padding-bottom: 3px;
      margin-bottom: 7px;
    }
    p, li { color: #202124; font-size: 12.5px; }
    ul { padding-left: 18px; margin-top: 4px; }
    li { margin-bottom: 3px; }
    .item-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-top: 6px; }
    .item-title { font-weight: 600; font-size: 13px; color: #121317; }
    .item-meta { font-family: "Google Sans Code", monospace; font-size: 11.5px; color: #5F6368; white-space: nowrap; }
    .item-sub { font-size: 12px; color: #5F6368; margin-top: 1px; }
    .skill-row { margin-bottom: 4px; font-size: 12.5px; }
    .skill-row strong { color: #121317; font-weight: 600; }
    .cert-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 20px; font-size: 12.5px; }
    @media print {
      @page { size: A4 portrait; margin: 10mm; }
      body { background: #fff; padding: 0; }
      .toolbar { display: none !important; }
      .sheet { border: none; border-radius: 0; padding: 0; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button class="btn" onclick="window.print()">Print / Save PDF</button>
  </div>
  <main class="sheet">
    <div class="header">
      <h1>Harsha Sri Naga Vardhan Billa</h1>
      <div class="contact">
        Mobile No: +91 7989118626 &nbsp;|&nbsp;
        <a href="https://www.linkedin.com/in/harsha-billa" target="_blank" rel="noopener noreferrer">LinkedIn</a> &nbsp;|&nbsp;
        Email: <a href="mailto:hsnvardhan@gmail.com">hsnvardhan@gmail.com</a> &nbsp;|&nbsp;
        Andhra Pradesh, India
      </div>
    </div>

    <div class="section">
      <div class="section-title">Professional Summary</div>
      <p>
        Electronics and Communication Engineering graduate with project experience in RTL design and functional verification using Verilog, SystemVerilog, and UVM, plus FPGA implementation on Xilinx Vivado. Filed an Indian patent (Application No. 202641032493) on a power-efficient approximate N-bit multiplier architecture, which involved balancing power, speed, and area against accuracy. Strong grounding in digital logic design, computer architecture, and CMOS VLSI, with working knowledge of lint, CDC checks, and synthesis. Looking for a fresher role in front-end ASIC/SoC design or verification, where I can write clean RTL, build testbenches, and catch bugs early.
      </p>
    </div>

    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skill-row"><strong>HDL / Design Languages:</strong> Verilog, SystemVerilog.</div>
      <div class="skill-row"><strong>Verification &amp; Methodology:</strong> Lint, CDC, Synthesis, RTL functional verification, Power Optimization, testbench development, UVM.</div>
      <div class="skill-row"><strong>Core Domain Knowledge:</strong> Digital Logic Design, Computer Architecture, CMOS/VLSI Design, Low-Power &amp; Approximate Computing.</div>
      <div class="skill-row"><strong>EDA &amp; Design Tools:</strong> Xilinx Vivado, Cadence Virtuoso, QuestaSim, ModelSim, MATLAB.</div>
      <div class="skill-row"><strong>Programming &amp; Scripting:</strong> C, Python.</div>
    </div>

    <div class="section">
      <div class="section-title">Patent</div>
      <div class="item-head">
        <div class="item-title">Design of a High-Speed Approximate N-Bit Multiplier Using Error Compensation Technique with Power Optimization</div>
      </div>
      <div class="item-sub">Indian Patent Application No. 202641032493 | Filed Mar 2026 | Published, Patent Office Journal No. 13/2026</div>
      <ul>
        <li>Designed a scalable approximate N-bit multiplier using hybrid partial product generation, with exact MSBs and approximate LSBs built from AND/OR-based half adders, to cut logic complexity and power.</li>
        <li>Added a bounded bias-compensation scheme to correct truncation error, balancing power and area savings against accuracy, and kept the architecture generic across operand widths for DSP, AI/ML accelerator, and FPGA use.</li>
        <li>Verified in Verilog with a self-checking testbench against an exact reference multiplier over random input vectors; Vivado reported a 70% power reduction at 5% mean relative error.</li>
      </ul>
    </div>

    <div class="section">
      <div class="section-title">Projects</div>
      <div class="item-head">
        <div class="item-title">APB Based SPI Master Protocol</div>
        <div class="item-meta">Oct 2026</div>
      </div>
      <ul>
        <li>Designed an APB-based SPI master in Verilog with an APB slave FSM, register map, baud-rate generator, and shift register supporting all four CPOL/CPHA modes, LSB/MSB-first transfers, status flags, and interrupts.</li>
        <li>Built a UVM testbench with APB and SPI agents, sequences covering all 8 mode/bit-order combinations, and a scoreboard checking the MOSI and MISO paths, with functional coverage on APB signals, address/data ranges, and SPI signals.</li>
      </ul>

      <div class="item-head">
        <div class="item-title">FPGA AND ASIC Implementation of Approximate Sigmoid Activation Function using Piecewise Linear Approximation Technique</div>
        <div class="item-meta">Jan 2026</div>
      </div>
      <ul>
        <li>Designed a non-iterative approximate sigmoid in Verilog with three stages: a 4-segment piecewise linear (PLAN) stage, a Taylor-series exponential stage, and an Error Correction Function Approximation (ECFA) stage.</li>
        <li>Replaced multipliers and dividers with shift-based operations and a small LUT, using range reduction and sigmoid symmetry, &sigma;(&minus;x) = 1 &minus; &sigma;(x). The ECFA block refines the estimate in a single pass, giving accuracy comparable to Newton-Raphson without iterative hardware.</li>
      </ul>
    </div>

    <div class="section">
      <div class="section-title">Education Qualification</div>
      <div class="item-head">
        <div class="item-title">B.Tech in Electronics &amp; Communication Engineering</div>
        <div class="item-meta">2022 – 2026</div>
      </div>
      <div class="item-sub">Raghu Engineering College, Visakhapatnam | CGPA: 8.67/10</div>

      <div class="item-head">
        <div class="item-title">Higher Secondary (Physics, Chemistry, Mathematics)</div>
        <div class="item-meta">2020 – 2022</div>
      </div>
      <div class="item-sub">Vignan Co-operative Jr. College | GPA: 9.30/10</div>

      <div class="item-head">
        <div class="item-title">Secondary School Certificate</div>
        <div class="item-meta">2019 – 2020</div>
      </div>
      <div class="item-sub">Sir C.V. Raman Public School | GPA: 9.62/10</div>
    </div>

    <div class="section">
      <div class="section-title">Certifications</div>
      <div class="cert-grid">
        <div>&bull; System Design Through Verilog – NPTEL</div>
        <div>&bull; VLSI Design Training – Internshala</div>
        <div>&bull; IEEE Xtreme 18.0 Coding Competition</div>
        <div>&bull; MATLAB Online Course</div>
      </div>
    </div>
  </main>
</body>
</html>`;

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const standaloneBlobUrl = useMemo(() => {
    if (!open || typeof window === 'undefined') return '#';
    const blob = new Blob([STANDALONE_RESUME_HTML], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, [open]);

  useEffect(() => {
    return () => {
      if (standaloneBlobUrl && standaloneBlobUrl !== '#') {
        URL.revokeObjectURL(standaloneBlobUrl);
      }
    };
  }, [standaloneBlobUrl]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume Preview"
      className="print-resume-portal fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#121317]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="print-resume-dialog w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden"
      >
        {/* Modal Header (hidden during print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#E2E8F0] bg-white">
          <div>
            <h2 className="text-base sm:text-lg font-medium tracking-[-0.02em] text-[#121317]">
              {PROFILE.fullName} — Resume
            </h2>
            <p className="font-mono text-xs text-[#5F6368]">
              VLSI Design &amp; Verification · Single-Page Resume Sheet
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={standaloneBlobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-xs font-medium text-[#121317] transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Open Tab</span>
            </a>

            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121317] hover:bg-[#2B2D33] text-xs font-medium text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#DADCE0] bg-white text-[#5F6368] hover:text-[#121317] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Formatted Single-Page HTML Resume Sheet */}
        <div className="print-resume-scroll flex-1 overflow-y-auto bg-[#F8F9FA] p-4 sm:p-6">
          <article className="print-resume-sheet mx-auto max-w-[780px] rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-9 text-[#121317] shadow-sm text-[13px] leading-[1.48]">
            {/* Resume Header */}
            <header className="text-center border-b-2 border-[#121317] pb-3 mb-4">
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-[#121317] uppercase">
                Harsha Sri Naga Vardhan Billa
              </h1>
              <p className="mt-1 text-xs text-[#5F6368]">
                Mobile No: <span className="font-mono text-[#121317]">+91 7989118626</span>
                <span className="mx-2 text-[#DADCE0]">|</span>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563EB] hover:underline"
                >
                  LinkedIn
                </a>
                <span className="mx-2 text-[#DADCE0]">|</span>
                Email:{' '}
                <a href={`mailto:${PROFILE.email}`} className="text-[#2563EB] hover:underline">
                  {PROFILE.email}
                </a>
                <span className="mx-2 text-[#DADCE0]">|</span>
                {PROFILE.location}
              </p>
            </header>

            {/* Professional Summary */}
            <section className="mb-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#121317] border-b border-[#DADCE0] pb-1 mb-2">
                Professional Summary
              </h3>
              <p className="text-[12.5px] text-[#3C4043] leading-[1.52]">
                Electronics and Communication Engineering graduate with project experience in RTL
                design and functional verification using Verilog, SystemVerilog, and UVM, plus FPGA
                implementation on Xilinx Vivado. Filed an Indian patent (Application No.{' '}
                <span className="font-mono">202641032493</span>) on a power-efficient approximate
                N-bit multiplier architecture, which involved balancing power, speed, and area
                against accuracy. Strong grounding in digital logic design, computer architecture,
                and CMOS VLSI, with working knowledge of lint, CDC checks, and synthesis. Looking
                for a fresher role in front-end ASIC/SoC design or verification, where I can write
                clean RTL, build testbenches, and catch bugs early.
              </p>
            </section>

            {/* Technical Skills */}
            <section className="mb-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#121317] border-b border-[#DADCE0] pb-1 mb-2">
                Technical Skills
              </h3>
              <div className="space-y-1 text-[12.5px] text-[#3C4043]">
                <p>
                  <strong className="font-semibold text-[#121317]">HDL / Design Languages:</strong>{' '}
                  Verilog, SystemVerilog.
                </p>
                <p>
                  <strong className="font-semibold text-[#121317]">
                    Verification &amp; Methodology:
                  </strong>{' '}
                  Lint, CDC, Synthesis, RTL functional verification, Power Optimization, testbench
                  development, UVM.
                </p>
                <p>
                  <strong className="font-semibold text-[#121317]">Core Domain Knowledge:</strong>{' '}
                  Digital Logic Design, Computer Architecture, CMOS/VLSI Design, Low-Power &amp;
                  Approximate Computing.
                </p>
                <p>
                  <strong className="font-semibold text-[#121317]">EDA &amp; Design Tools:</strong>{' '}
                  Xilinx Vivado, Cadence Virtuoso, QuestaSim, ModelSim, MATLAB.
                </p>
                <p>
                  <strong className="font-semibold text-[#121317]">Programming &amp; Scripting:</strong>{' '}
                  C, Python.
                </p>
              </div>
            </section>

            {/* Patent */}
            <section className="mb-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#121317] border-b border-[#DADCE0] pb-1 mb-2">
                Patent
              </h3>
              <div className="font-semibold text-[13px] text-[#121317]">
                Design of a High-Speed Approximate N-Bit Multiplier Using Error Compensation
                Technique with Power Optimization
              </div>
              <div className="text-[11.5px] font-mono text-[#5F6368] mt-0.5">
                Indian Patent Application No. 202641032493 | Filed Mar 2026 | Published, Patent
                Office Journal No. 13/2026
              </div>
              <ul className="mt-1.5 list-disc pl-5 space-y-1 text-[12.5px] text-[#3C4043]">
                <li>
                  Designed a scalable approximate N-bit multiplier using hybrid partial product
                  generation, with exact MSBs and approximate LSBs built from AND/OR-based half
                  adders, to cut logic complexity and power.
                </li>
                <li>
                  Added a bounded bias-compensation scheme to correct truncation error, balancing
                  power and area savings against accuracy, and kept the architecture generic across
                  operand widths for DSP, AI/ML accelerator, and FPGA use.
                </li>
                <li>
                  Verified in Verilog with a self-checking testbench against an exact reference
                  multiplier over random input vectors; Vivado reported a 70% power reduction at 5%
                  mean relative error.
                </li>
              </ul>
            </section>

            {/* Projects */}
            <section className="mb-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#121317] border-b border-[#DADCE0] pb-1 mb-2">
                Projects
              </h3>

              <div className="mb-2.5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold text-[13px] text-[#121317]">
                    APB Based SPI Master Protocol
                  </span>
                  <span className="font-mono text-[11.5px] text-[#5F6368] shrink-0">Oct 2026</span>
                </div>
                <ul className="mt-1 list-disc pl-5 space-y-1 text-[12.5px] text-[#3C4043]">
                  <li>
                    Designed an APB-based SPI master in Verilog with an APB slave FSM, register
                    map, baud-rate generator, and shift register supporting all four CPOL/CPHA
                    modes, LSB/MSB-first transfers, status flags, and interrupts.
                  </li>
                  <li>
                    Built a UVM testbench with APB and SPI agents, sequences covering all 8
                    mode/bit-order combinations, and a scoreboard checking the MOSI and MISO paths,
                    with functional coverage on APB signals, address/data ranges, and SPI signals.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold text-[13px] text-[#121317]">
                    FPGA AND ASIC Implementation of Approximate Sigmoid Activation Function using
                    Piecewise Linear Approximation Technique
                  </span>
                  <span className="font-mono text-[11.5px] text-[#5F6368] shrink-0">Jan 2026</span>
                </div>
                <ul className="mt-1 list-disc pl-5 space-y-1 text-[12.5px] text-[#3C4043]">
                  <li>
                    Designed a non-iterative approximate sigmoid in Verilog with three stages: a
                    4-segment piecewise linear (PLAN) stage, a Taylor-series exponential stage, and
                    an Error Correction Function Approximation (ECFA) stage.
                  </li>
                  <li>
                    Replaced multipliers and dividers with shift-based operations and a small LUT,
                    using range reduction and sigmoid symmetry, &sigma;(&minus;x) = 1 &minus;
                    &sigma;(x). The ECFA block refines the estimate in a single pass, giving accuracy
                    comparable to Newton-Raphson without iterative hardware.
                  </li>
                </ul>
              </div>
            </section>

            {/* Education Qualification */}
            <section className="mb-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#121317] border-b border-[#DADCE0] pb-1 mb-2">
                Education Qualification
              </h3>
              <div className="space-y-1.5 text-[12.5px]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#121317]">
                      B.Tech in Electronics &amp; Communication Engineering
                    </span>
                    <span className="text-[#5F6368]">
                      {' '}
                      — Raghu Engineering College, Visakhapatnam
                    </span>
                  </div>
                  <span className="font-mono text-[11.5px] text-[#5F6368]">
                    2022 – 2026 | CGPA: 8.67/10
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#121317]">
                      Higher Secondary (Physics, Chemistry, Mathematics)
                    </span>
                    <span className="text-[#5F6368]"> — Vignan Co-operative Jr. College</span>
                  </div>
                  <span className="font-mono text-[11.5px] text-[#5F6368]">
                    2020 – 2022 | GPA: 9.30/10
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#121317]">
                      Secondary School Certificate
                    </span>
                    <span className="text-[#5F6368]"> — Sir C.V. Raman Public School</span>
                  </div>
                  <span className="font-mono text-[11.5px] text-[#5F6368]">
                    2019 – 2020 | GPA: 9.62/10
                  </span>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#121317] border-b border-[#DADCE0] pb-1 mb-2">
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[12.5px] text-[#3C4043]">
                <div>• System Design Through Verilog – NPTEL</div>
                <div>• VLSI Design Training – Internshala</div>
                <div>• IEEE Xtreme 18.0 Coding Competition</div>
                <div>• MATLAB Online Course</div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
