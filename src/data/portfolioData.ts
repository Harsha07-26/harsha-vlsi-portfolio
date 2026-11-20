export const PROFILE = {
  fullName: 'Harsha Sri Naga Vardhan Billa',
  shortName: 'Harsha Billa',
  wordmark: 'HARSHA BILLA // VLSI',
  roleStatus: 'OPEN TO FRONT-END ASIC / SoC DESIGN & VERIFICATION ROLES',
  heroHeadline: 'Engineering Low-Power Silicon & Verified RTL.',
  heroSubtitle:
    'Harsha Sri Naga Vardhan Billa — ECE Graduate specializing in Verilog, SystemVerilog, UVM, and FPGA/ASIC architecture.',
  summaryStatement:
    'Electronics and Communication Engineering graduate focused on writing clean RTL, building UVM testbenches, and balancing power, speed, and area against accuracy.',
  email: 'hsnvardhan@gmail.com',
  phone: '+91 7989118626',
  phoneHref: 'tel:+917989118626',
  whatsappHref: 'https://wa.me/917989118626',
  linkedinUrl: 'https://www.linkedin.com/in/harsha-billa',
  linkedinDisplay: 'linkedin.com/in/harsha-billa',
  location: 'Andhra Pradesh, India',
  resumePath: './assets/aistudio/Harsha_Sri_Naga_Vardhan_Billa_Resume_dadc5649.pdf',
  resumeFilename: 'Harsha_Sri_Naga_Vardhan_Billa_Resume.pdf',
};

export interface PatentPathMode {
  id: 'exact_msb' | 'approx_lsb' | 'bias_comp';
  label: string;
  bitRange: string;
  hardwareUnit: string;
  powerImpact: string;
  accuracyImpact: string;
  description: string;
}

export const PATENT_DATA = {
  badge: 'Published Patent',
  applicationNo: '202641032493',
  filedDate: 'Mar 2026',
  journalNo: 'Patent Office Journal No. 13/2026',
  title: 'High-Speed Approximate N-Bit Multiplier with Error Compensation',
  fullTitle:
    'Design of a High-Speed Approximate N-Bit Multiplier Using Error Compensation Technique with Power Optimization',
  tags: ['Verilog RTL', 'Xilinx Vivado', 'Approximate Computing', 'Self-Checking TB'],
  points: [
    'Designed a scalable approximate N-bit multiplier using hybrid partial product generation, with exact MSBs and approximate LSBs built from AND/OR-based half adders to cut logic complexity and power.',
    'Added a bounded bias-compensation scheme to correct truncation error, balancing power and area savings against accuracy while keeping the architecture generic across operand widths for DSP, AI/ML accelerator, and FPGA use.',
    'Verified in Verilog with a self-checking testbench against an exact reference multiplier over random input vectors; Xilinx Vivado reported a 70% power reduction at 5% mean relative error (MRE).',
  ],
  metrics: {
    powerReduction: '70%',
    mre: '5%',
    exactPowerRel: 100,
    approxPowerRel: 30,
  },
  pathModes: [
    {
      id: 'exact_msb',
      label: 'Exact MSB Path',
      bitRange: 'Bits [2N-1 : N]',
      hardwareUnit: 'Full Adders & Exact Partial Products',
      powerImpact: 'Preserves critical numerical magnitude',
      accuracyImpact: '0% MSB truncation error',
      description:
        'Upper significant partial products are accumulated through exact compressors so dominant weight columns retain deterministic precision across DSP and MAC workloads.',
    },
    {
      id: 'approx_lsb',
      label: 'Approx LSB Path',
      bitRange: 'Bits [N-1 : 0]',
      hardwareUnit: 'AND/OR-Based Approximate Half Adders',
      powerImpact: '-70% dynamic switching & gate capacitance',
      accuracyImpact: 'Bounded low-order bit approximation',
      description:
        'Lower-order partial products replace XOR-heavy full adders with lightweight AND/OR cells, collapsing carry chains and cutting switching power across Vivado synthesis.',
    },
    {
      id: 'bias_comp',
      label: 'Bias Compensation',
      bitRange: 'Correction Stage',
      hardwareUnit: 'Bounded Error-Recovery Logic',
      powerImpact: 'Minimal constant overhead',
      accuracyImpact: '5% Mean Relative Error (MRE)',
      description:
        'Injects a bounded statistical bias term derived from LSB truncation probability, pulling the output distribution back toward the exact reference multiplier without carry-ripple penalty.',
    },
  ] as PatentPathMode[],
};

export interface SpiModeConfig {
  mode: 0 | 1 | 2 | 3;
  cpol: 0 | 1;
  cpha: 0 | 1;
  idleLevel: 'LOW' | 'HIGH';
  sampleEdge: 'Rising' | 'Falling';
  shiftEdge: 'Falling' | 'Rising';
  summary: string;
}

export const SPI_PROJECT = {
  date: 'Oct 2026',
  category: 'RTL Design & UVM Verification',
  title: 'APB-Based SPI Master RTL & UVM Verification',
  tags: ['Verilog', 'SystemVerilog', 'UVM', 'APB3/4', 'Functional Coverage'],
  points: [
    'Designed an APB-based SPI master in Verilog with an APB slave FSM, memory-mapped register map, programmable baud-rate generator, and shift register supporting all four CPOL/CPHA modes, LSB/MSB-first transfers, status flags, and interrupts.',
    'Built a complete UVM testbench with independent APB and SPI agents, constrained-random sequences covering all 8 mode/bit-order combinations, and a reference scoreboard checking both MOSI and MISO paths.',
    'Closed functional coverage across APB control signals, address/data register ranges, and SPI protocol timing states.',
  ],
  modes: [
    {
      mode: 0,
      cpol: 0,
      cpha: 0,
      idleLevel: 'LOW',
      sampleEdge: 'Rising',
      shiftEdge: 'Falling',
      summary: 'Clock idles low; data sampled on first (rising) clock edge and shifted on falling edge.',
    },
    {
      mode: 1,
      cpol: 0,
      cpha: 1,
      idleLevel: 'LOW',
      sampleEdge: 'Falling',
      shiftEdge: 'Rising',
      summary: 'Clock idles low; data shifted on first (rising) edge and sampled on second (falling) edge.',
    },
    {
      mode: 2,
      cpol: 1,
      cpha: 0,
      idleLevel: 'HIGH',
      sampleEdge: 'Falling',
      shiftEdge: 'Rising',
      summary: 'Clock idles high; data sampled on first (falling) clock edge and shifted on rising edge.',
    },
    {
      mode: 3,
      cpol: 1,
      cpha: 1,
      idleLevel: 'HIGH',
      sampleEdge: 'Rising',
      shiftEdge: 'Falling',
      summary: 'Clock idles high; data shifted on first (falling) edge and sampled on second (rising) edge.',
    },
  ] as SpiModeConfig[],
};

export interface SigmoidStage {
  id: 'plan' | 'taylor' | 'ecfa';
  step: string;
  name: string;
  shortName: string;
  operation: string;
  hardwareBlocks: string;
  role: string;
  equation: string;
}

export const SIGMOID_PROJECT = {
  date: 'Jan 2026',
  category: 'FPGA & ASIC Architecture',
  title: 'FPGA & ASIC Approximate Sigmoid Activation Function',
  tags: ['Verilog', 'PLAN', 'Taylor Series', 'ECFA', 'Shift-Only Datapath'],
  points: [
    'Designed a non-iterative approximate sigmoid in Verilog using three pipelined stages: a 4-segment Piecewise Linear Approximation (PLAN) stage, a Taylor-series exponential stage, and an Error Correction Function Approximation (ECFA) stage.',
    'Eliminated area-heavy multipliers and dividers by substituting barrel-shift operations and a compact LUT, leveraging range reduction and sigmoid odd-symmetry: σ(-x) = 1 - σ(x).',
    'The single-pass ECFA block refines the approximation in one shot, achieving accuracy comparable to Newton-Raphson without multi-cycle iterative hardware.',
  ],
  stages: [
    {
      id: 'plan',
      step: 'Stage 01',
      name: '4-Segment PLAN & Range Reduction',
      shortName: '4-Segment PLAN',
      operation: 'Input Folding + Piecewise Slope/Intercept',
      hardwareBlocks: 'Sign-bit mux · 4-entry segment decoder · Shift-add ALU',
      role: 'Maps negative inputs via σ(-x) = 1 - σ(x) symmetry and partitions |x| into 4 linear intervals using pure bit-shifts instead of hardware multipliers.',
      equation: 'y₀(|x|) ≈ aᵢ·|x| + bᵢ  (aᵢ ∈ 2⁻ᵏ)',
    },
    {
      id: 'taylor',
      step: 'Stage 02',
      name: 'Taylor-Series Exponential Stage',
      shortName: 'Taylor Exp',
      operation: 'Truncated Power-Series Evaluation',
      hardwareBlocks: 'Compact LUT · Barrel Shifters · Fixed-Point Adders',
      role: 'Evaluates localized e⁻|ˣ| curvature near transition knees with a small lookup table and shift-only arithmetic, removing division hardware completely.',
      equation: 'e⁻ᵘ ≈ 1 - u + (u² >> 1)',
    },
    {
      id: 'ecfa',
      step: 'Stage 03',
      name: 'Error Correction Function Approximation (ECFA)',
      shortName: 'ECFA Refine',
      operation: 'Single-Pass Residual Compensation',
      hardwareBlocks: 'Residual Offset LUT · Final Symmetry Subtractor (1 - σ)',
      role: 'Applies a deterministic residual correction term in one combinational/pipelined pass—matching Newton-Raphson precision with zero iterative loops.',
      equation: 'σ(x) = y_est + Δ_ECFA(|x|)',
    },
  ] as SigmoidStage[],
};

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'hdl',
    title: 'HDL & Design Languages',
    subtitle: 'Synthesizable RTL & Testbench Coding',
    items: ['Verilog', 'SystemVerilog'],
  },
  {
    id: 'verification',
    title: 'Verification & Methodology',
    subtitle: 'Coverage Closure & Sign-Off Checks',
    items: [
      'UVM',
      'RTL Functional Verification',
      'Testbench Development',
      'Lint',
      'CDC',
      'Synthesis',
      'Power Optimization',
    ],
  },
  {
    id: 'domain',
    title: 'Core Domain Knowledge',
    subtitle: 'Silicon & Architecture Foundations',
    items: [
      'Digital Logic Design',
      'Computer Architecture',
      'CMOS/VLSI Design',
      'Low-Power & Approximate Computing',
    ],
  },
  {
    id: 'eda',
    title: 'EDA & Design Tools',
    subtitle: 'Simulation, Implementation & Layout',
    items: ['Xilinx Vivado', 'Cadence Virtuoso', 'QuestaSim', 'ModelSim', 'MATLAB'],
  },
  {
    id: 'programming',
    title: 'Programming & Scripting',
    subtitle: 'Verification Automation & Modeling',
    items: ['C', 'Python'],
  },
];

export interface CredentialCard {
  id: string;
  type: 'Education' | 'Certification';
  periodOrIssuer: string;
  title: string;
  institution: string;
  metric?: string;
  detail: string;
}

export const CREDENTIALS: CredentialCard[] = [
  {
    id: 'edu-btech',
    type: 'Education',
    periodOrIssuer: '2022 – 2026',
    title: 'B.Tech in Electronics & Communication Engineering',
    institution: 'Raghu Engineering College, Visakhapatnam',
    metric: 'CGPA: 8.67 / 10',
    detail: 'Core specialization in Digital Logic Design, CMOS VLSI, Computer Architecture, and RTL Verification.',
  },
  {
    id: 'edu-inter',
    type: 'Education',
    periodOrIssuer: '2020 – 2022',
    title: 'Higher Secondary (PCM)',
    institution: 'Vignan Co-operative Jr. College',
    metric: 'GPA: 9.30 / 10',
    detail: 'Physics, Chemistry, and Mathematics foundation supporting semiconductor physics and signal analysis.',
  },
  {
    id: 'edu-ssc',
    type: 'Education',
    periodOrIssuer: '2019 – 2020',
    title: 'Secondary School Certificate',
    institution: 'Sir C.V. Raman Public School',
    metric: 'GPA: 9.62 / 10',
    detail: 'Strong academic merit in mathematics and foundational science.',
  },
  {
    id: 'cert-nptel',
    type: 'Certification',
    periodOrIssuer: 'NPTEL',
    title: 'System Design Through Verilog',
    institution: 'National Programme on Technology Enhanced Learning',
    detail: 'Hardware modeling, FSM synthesis, datapath-controller partitioning, and Verilog testbench design.',
  },
  {
    id: 'cert-internshala',
    type: 'Certification',
    periodOrIssuer: 'Internshala Trainings',
    title: 'VLSI Design Training',
    institution: 'VLSI Design Program',
    detail: 'Hands-on training covering CMOS circuit fundamentals, RTL flow, and digital verification basics.',
  },
  {
    id: 'cert-ieee',
    type: 'Certification',
    periodOrIssuer: 'IEEE',
    title: 'IEEE Xtreme 18.0 Coding Competition',
    institution: 'IEEE Global 24-Hour Programming Challenge',
    detail: 'Competitive algorithmic problem-solving under timed constraints using C and Python.',
  },
  {
    id: 'cert-matlab',
    type: 'Certification',
    periodOrIssuer: 'MathWorks',
    title: 'MATLAB Online Course',
    institution: 'MathWorks Training',
    detail: 'Numerical modeling, fixed-point error analysis, and signal processing algorithm verification.',
  },
];
