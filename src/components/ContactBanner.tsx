import { useEffect, useRef, useState } from 'react';
import {
  Copy,
  Check,
  Phone,
  Linkedin,
  FileDown,
  Send,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactBannerProps {
  onOpenResume: () => void;
}

const RING_COLORS = ['#4285F4', '#A142F4', '#EA4335', '#8AB4F8'];

export function ContactBanner({ onOpenResume }: ContactBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Subtle multi-colored/blue-violet orbital particle ring inside the pitch-black CTA banner
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let rafId = 0;
    let tick = 0;

    const ringNodes = Array.from({ length: 90 }, (_, i) => ({
      angle: (i / 90) * Math.PI * 2,
      radiusRatio: 0.72 + Math.random() * 0.45,
      speed: 0.0012 + Math.random() * 0.0015,
      length: 5 + Math.random() * 7,
      color: RING_COLORS[i % RING_COLORS.length],
      alpha: 0.35 + Math.random() * 0.45,
    }));

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect ? rect.width : 900;
      height = rect ? rect.height : 420;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.78;
      const cy = height * 0.5;
      const rx = Math.min(width * 0.32, 300);
      const ry = Math.min(height * 0.46, 200);

      for (let i = 0; i < ringNodes.length; i++) {
        const n = ringNodes[i];
        if (!prefersReducedMotion) {
          n.angle += n.speed;
        }
        const wobble = Math.sin(tick * 0.02 + i) * 4;
        const x = cx + Math.cos(n.angle) * (rx * n.radiusRatio + wobble);
        const y = cy + Math.sin(n.angle) * (ry * n.radiusRatio + wobble);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(n.angle + Math.PI / 2);
        ctx.globalAlpha = n.alpha;
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-n.length * 0.5, 0);
        ctx.lineTo(n.length * 0.5, 0);
        ctx.stroke();
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = PROFILE.email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please include at least 10 characters in your message.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '6dbe160f-42ce-41cb-ae15-e104286605c3',
          subject: `Portfolio Inquiry from ${name.trim()}`,
          from_name: 'Harsha Billa VLSI Portfolio',
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok && data?.success) {
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-[#0D0E12] text-white border border-[#24262E] p-7 sm:p-12 lg:p-14 shadow-[0_24px_64px_rgba(18,19,23,0.14)]">
          {/* Multi-colored / blue-violet orbital particle ring canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full opacity-90"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left White Headline + Inverse Pills */}
            <div className="lg:col-span-6">
              <div className="font-mono text-xs text-[#8AB4F8]">Contact &amp; Availability</div>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-[-0.03em] text-white leading-[1.12] text-balance">
                Ready to build &amp; verify next-gen silicon.
              </h2>
              <p className="mt-4 text-sm sm:text-base font-normal text-white/75 leading-[1.6] max-w-lg">
                Available for Front-End ASIC/SoC Design, RTL Engineering, and UVM Functional
                Verification roles.
              </p>

              {/* Inverse Pill CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-white/90 text-[#121317] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Copy Email ({PROFILE.email})</span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <Linkedin className="w-4 h-4 text-[#8AB4F8] shrink-0" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PROFILE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <Phone className="w-4 h-4 text-[#8AB4F8] shrink-0" aria-hidden="true" />
                  <span>Call / WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <FileDown className="w-4 h-4 text-[#8AB4F8] shrink-0" aria-hidden="true" />
                  <span>Resume PDF</span>
                </button>
              </div>

              <div className="mt-6 lg:hidden">
                <button
                  type="button"
                  onClick={() => setDrawerOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#8AB4F8] hover:text-white transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{drawerOpen ? 'Hide Message Form' : 'Send a Direct Message'}</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div
              className={`lg:col-span-6 rounded-2xl border border-white/15 bg-[#14161D]/90 backdrop-blur-md p-5 sm:p-6 ${
                drawerOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-white/70 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (submitStatus !== 'idle') setSubmitStatus('idle');
                    }}
                    placeholder="Recruiter or Hiring Manager Name"
                    className="w-full rounded-xl border border-white/15 bg-[#0D0E12]/90 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#8AB4F8] focus:ring-1 focus:ring-[#8AB4F8]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-white/70 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (submitStatus !== 'idle') setSubmitStatus('idle');
                    }}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-white/15 bg-[#0D0E12]/90 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#8AB4F8] focus:ring-1 focus:ring-[#8AB4F8]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-white/70 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (submitStatus !== 'idle') setSubmitStatus('idle');
                    }}
                    placeholder="Share role details, RTL/UVM team info, or interview schedule..."
                    className="w-full rounded-xl border border-white/15 bg-[#0D0E12]/90 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#8AB4F8] focus:ring-1 focus:ring-[#8AB4F8] resize-y"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed text-[#121317] text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-2.5 text-xs text-emerald-200 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      Message sent directly to Harsha! I will get back to you soon.
                    </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border border-rose-400/40 bg-rose-500/15 px-3.5 py-2.5 text-xs text-rose-200 leading-relaxed"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        Unable to send right now. Please copy{' '}
                        <span className="font-mono text-white">{PROFILE.email}</span> to email
                        directly.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#121317] font-medium whitespace-nowrap shrink-0 cursor-pointer hover:bg-white/90 transition-colors"
                    >
                      <Copy className="w-3 h-3" aria-hidden="true" />
                      <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Copy Toast Notification */}
          {copied && (
            <div
              role="status"
              aria-live="polite"
              className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E2E8F0] bg-[#121317] text-white text-xs font-mono shadow-xl"
            >
              <Check className="w-4 h-4 text-[#8AB4F8]" aria-hidden="true" />
              <span>Copied {PROFILE.email} to clipboard</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
