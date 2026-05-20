"use client";

import { useEffect, useRef, useState } from "react";

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --orange: #F97316;
  --orange-light: #FB923C;
  --orange-glow: rgba(249,115,22,0.3);
  --dark: #080808;
  --dark-2: #0f0f0f;
  --white: #fff;
  --white-70: rgba(255,255,255,0.7);
  --white-40: rgba(255,255,255,0.4);
  --white-08: rgba(255,255,255,0.08);
  --white-05: rgba(255,255,255,0.05);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Barlow', sans-serif;
  background: var(--dark);
  color: var(--white);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* NAV */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 22px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%);
}

.logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 30px;
  letter-spacing: 3px;
}
.logo span { color: var(--orange); }

.nav-btn {
  background: var(--orange);
  color: var(--white);
  border: none;
  padding: 11px 26px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s, transform 0.15s;
}
.nav-btn:hover { background: var(--orange-light); transform: translateY(-1px); }

/* HERO */
.hero {
  position: relative;
  height: 100vh;
  min-height: 720px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #080808;
}

#stars-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.horizon-glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 45%;
  background: radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.18) 0%, transparent 65%);
  z-index: 1;
  pointer-events: none;
}

.video-bg {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  z-index: 0;
  filter: brightness(0.15) saturate(0.6);
}

.hero-fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 30%;
  background: linear-gradient(to top, var(--dark), transparent);
  z-index: 2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 24px;
  max-width: 880px;
}

/* SCARCITY BADGE */
.scarcity-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(249,115,22,0.1);
  border: 1px solid rgba(249,115,22,0.4);
  border-radius: 100px;
  padding: 9px 22px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--white);
  margin-bottom: 28px;
  backdrop-filter: blur(8px);
  animation: fadeUp 0.6s ease both;
}

.scarcity-dot {
  width: 7px; height: 7px;
  background: var(--orange);
  border-radius: 50%;
  animation: blink 1.6s infinite;
  box-shadow: 0 0 8px var(--orange);
}

.scarcity-count { color: var(--orange); font-weight: 700; }
.scarcity-divider { color: var(--white-40); font-size: 11px; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(60px, 10vw, 118px);
  line-height: 0.9;
  letter-spacing: 1px;
  animation: fadeUp 0.6s 0.08s ease both;
}

h1 .orange { color: var(--orange); }

.hero-p {
  font-size: clamp(16px, 1.8vw, 19px);
  font-weight: 300;
  color: var(--white-70);
  max-width: 560px;
  margin: 22px auto 18px;
  line-height: 1.65;
  animation: fadeUp 0.6s 0.16s ease both;
}

.hero-p strong { color: var(--white); font-weight: 600; }

.hero-tagline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(18px, 2vw, 22px);
  letter-spacing: 2px;
  color: var(--orange-light);
  margin-bottom: 36px;
  animation: fadeUp 0.6s 0.2s ease both;
}

.hero-form {
  display: flex;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;
  animation: fadeUp 0.6s 0.24s ease both;
}

.hero-input {
  flex: 1;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.16);
  border-radius: 7px;
  padding: 15px 20px;
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  color: var(--white);
  outline: none;
  backdrop-filter: blur(10px);
  transition: border-color 0.2s;
}

.hero-input::placeholder { color: rgba(255,255,255,0.32); }
.hero-input:focus { border-color: var(--orange); }

.hero-btn {
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: 7px;
  padding: 15px 28px;
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 24px rgba(249,115,22,0.4);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}

.hero-btn:hover {
  background: var(--orange-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 36px rgba(249,115,22,0.5);
}

.hero-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.hero-note {
  margin-top: 14px;
  font-size: 12px;
  color: var(--white-40);
  letter-spacing: 0.2px;
  animation: fadeUp 0.6s 0.32s ease both;
}

.success-box {
  background: rgba(249,115,22,0.1);
  border: 1px solid rgba(249,115,22,0.4);
  border-radius: 8px;
  padding: 18px 28px;
  max-width: 480px;
  margin: 0 auto;
  font-size: 16px;
}
.success-box strong { color: var(--orange); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* STAT BAR */
.stat-bar {
  background: var(--dark-2);
  border-top: 1px solid var(--white-05);
  border-bottom: 1px solid var(--white-05);
  padding: 44px 52px;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.stat-item {
  text-align: center;
  padding: 0 72px;
  flex: 1;
  max-width: 320px;
}

.stat-item + .stat-item { border-left: 1px solid var(--white-05); }

.stat-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 62px;
  line-height: 1;
  color: var(--orange);
  letter-spacing: 1px;
}

.stat-unit { font-size: 0.42em; vertical-align: middle; letter-spacing: 0; }

.stat-lbl {
  font-size: 13px;
  font-weight: 400;
  color: var(--white-40);
  margin-top: 10px;
  line-height: 1.55;
}

/* FOOTER */
footer {
  padding: 28px 52px;
  border-top: 1px solid var(--white-05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; }
.footer-logo span { color: var(--orange); }
.footer-copy { font-size: 13px; color: var(--white-40); }

/* RESPONSIVE */
@media (max-width: 768px) {
  nav { padding: 16px 20px; }
  .hero-form { flex-direction: column; }
  .stat-bar { flex-direction: column; padding: 40px 24px; }
  .stat-item { padding: 28px 0; max-width: 100%; }
  .stat-item + .stat-item { border-left: none; border-top: 1px solid var(--white-05); }
  footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px; }
  .scarcity-badge { font-size: 12px; padding: 8px 16px; gap: 8px; }
  .scarcity-divider { display: none; }
}
`;

type Star = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
};

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          r: Math.random() * 1.2 + 0.2,
          alpha: Math.random() * 0.6 + 0.1,
          speed: Math.random() * 0.008 + 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawStars(t: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(drawStars);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(drawStars);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xdajaqeq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "roofready-beta" }),
      });
    } catch (err) {
      console.error("Formspree error:", err);
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <>
      <title>RoofReady — Send Your Proposal Before You Leave the Driveway</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav>
        <div className="logo">
          Roof<span>Ready</span>
        </div>
        <a href="#form" className="nav-btn">
          Join Beta — Free
        </a>
      </nav>

      <section className="hero">
        <canvas id="stars-canvas" ref={canvasRef}></canvas>
        <div className="horizon-glow"></div>

        <video className="video-bg" autoPlay muted loop playsInline>
          <source src="/roofing.mp4" type="video/mp4" />
        </video>

        <div className="hero-fade"></div>

        <div className="hero-content">
          <div className="scarcity-badge">
            Join 1,374 other roofers in the beta · Limited slots · Releases 5.23
          </div>

          <h1>
            Send Your Proposal
            <br />
            <span className="orange">
              Before You Leave
              <br />
              The Driveway.
            </span>
          </h1>

          <p className="hero-p">
            Describe the job on your phone. In under a minute your customer has your professionally branded proposal in their inbox — before your competitor makes it back to their truck.
          </p>

          <div className="hero-tagline">
            The best thing to happen to roofers since the nail gun.
          </div>

          {submitted ? (
            <div className="success-box" role="status">
              <strong>You&apos;re in.</strong> Check your email — we&apos;ll reach out when beta opens. Spots are first-come, first-served.
            </div>
          ) : (
            <>
              <form className="hero-form" id="form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="hero-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="hero-btn" disabled={submitting}>
                  {submitting ? "Saving..." : "Claim Your Beta Spot"}
                </button>
              </form>
              <p className="hero-note">
                Free for beta testers &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; No commitment
              </p>
            </>
          )}
        </div>
      </section>

      <div className="stat-bar">
        <div className="stat-item">
          <div className="stat-num">40%</div>
          <div className="stat-lbl">
            of roofing jobs go to the
            <br />
            first contractor to respond
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-num">
            60<span className="stat-unit">s</span>
          </div>
          <div className="stat-lbl">
            to generate a professional
            <br />
            proposal with RoofReady
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-num">
            2+<span className="stat-unit"> hrs</span>
          </div>
          <div className="stat-lbl">
            the average roofer spends
            <br />
            writing proposals manually. Per job.
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-logo">
          Roof<span>Ready</span>
        </div>
        <div className="footer-copy">
          © 2026 RoofReady &nbsp;·&nbsp; Built for roofers who want to win more jobs
        </div>
      </footer>
    </>
  );
}
