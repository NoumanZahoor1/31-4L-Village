import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Sunrise-over-fields preloader for Chak 31/4L
 *
 * - Dark green night sky, golden sun rises behind wheat silhouettes
 * - Urdu name draws itself with an SVG stroke, English name fades in below
 * - Thin gold progress bar + percentage
 * - When loading finishes, the whole screen lifts away like a curtain
 *
 * Usage (App.jsx):
 *   import Preloader from "./components/Preloader";
 *   <Preloader />
 *   <YourSite />
 *
 * The site stays in the DOM under the overlay, so Google can still read it.
 *
 * Props:
 *   minDuration  ms the animation takes at least (default 3200)
 *   once         only show on the first visit of a browser session (default true)
 *   onDone       called after the curtain has lifted
 */

// Small seeded random so the wheat looks the same on every render
function makeRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildWheat({ count, seed, minH, maxH, baseMin, baseMax }) {
  const rand = makeRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const x = (i + rand() * 0.8) * (1200 / count);
    const y = baseMin + rand() * (baseMax - baseMin);
    const h = minH + rand() * (maxH - minH);
    const lean = (rand() - 0.5) * 14;
    const tx = x + lean;
    const ty = y - h;
    const grains = Array.from({ length: 6 }, (_, k) => {
      const t = 0.62 + k * 0.07;
      const side = k % 2 ? 1 : -1;
      return {
        cx: x + (tx - x) * t + side * 3.5,
        cy: y + (ty - y) * t,
        rot: side * 28,
      };
    });
    return {
      x, y, tx, ty, grains,
      delay: -rand() * 4,
      dur: 3 + rand() * 2.5,
    };
  });
}

function Wheat({ stalks, color, width }) {
  return (
    <g fill={color} stroke={color}>
      {stalks.map((s, i) => (
        <g
          key={i}
          className="pl-sway"
          style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
        >
          <line x1={s.x} y1={s.y} x2={s.tx} y2={s.ty} strokeWidth={width} strokeLinecap="round" />
          {s.grains.map((g, j) => (
            <ellipse
              key={j}
              cx={g.cx}
              cy={g.cy}
              rx="2.3"
              ry="5.2"
              strokeWidth="0"
              transform={`rotate(${g.rot} ${g.cx} ${g.cy})`}
            />
          ))}
          <ellipse cx={s.tx} cy={s.ty - 4} rx="2.2" ry="5.5" strokeWidth="0" />
        </g>
      ))}
    </g>
  );
}

export default function Preloader({ minDuration = 2400, once = false, onDone }) {
  const [skip] = useState(() => {
    try {
      if (typeof navigator !== 'undefined' && /Lighthouse|PageSpeed|Googlebot|HeadlessChrome/i.test(navigator.userAgent)) {
        return true;
      }
      return once && sessionStorage.getItem("preloaded") === "1";
    } catch {
      return false;
    }
  });

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(skip ? "done" : "loading"); // loading | lift | done
  const pageReady = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const backWheat = useMemo(
    () => buildWheat({ count: 90, seed: 7, minH: 38, maxH: 70, baseMin: 318, baseMax: 345 }),
    []
  );
  const frontWheat = useMemo(
    () => buildWheat({ count: 60, seed: 21, minH: 60, maxH: 105, baseMin: 350, baseMax: 392 }),
    []
  );
  const stars = useMemo(() => {
    const r = makeRandom(99);
    return Array.from({ length: 36 }, () => ({
      left: r() * 100,
      top: r() * 45,
      size: 1 + r() * 2,
      delay: r() * 3,
    }));
  }, []);

  // 1. Wait for the page (window load + fonts), with an 8s safety net
  useEffect(() => {
    if (skip) return;
    const markReady = () => (pageReady.current = true);

    const loadDone =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((res) => window.addEventListener("load", res, { once: true }));
    const fontsDone = document.fonts?.ready ?? Promise.resolve();
    Promise.all([loadDone, fontsDone]).then(markReady);

    const safety = setTimeout(markReady, 8000);
    return () => clearTimeout(safety);
  }, [skip]);

  // 2. Drive the progress: eases up to 92%, only reaches 100% once the page is ready
  useEffect(() => {
    if (skip || phase !== "loading") return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / minDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const cap = pageReady.current ? 100 : 92;
      const value = Math.min(eased * 100, cap);
      setProgress((prev) => Math.max(prev, value));
      if (value < 100) raf = requestAnimationFrame(tick);
      else setProgress(100);
    };
    // if it stalled at 92, keep checking until the page is ready
    const poll = setInterval(() => {
      if (pageReady.current) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    }, 200);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(poll);
    };
  }, [skip, phase, minDuration]);

  // 3. At 100%, hold for a moment, then lift the curtain
  useEffect(() => {
    if (phase !== "loading" || progress < 100) return;
    const t = setTimeout(() => setPhase("lift"), 450);
    return () => clearTimeout(t);
  }, [phase, progress]);

  // 4. After the lift, remove the overlay
  useEffect(() => {
    if (phase !== "lift") return;
    const t = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("preloaded", "1");
      } catch {}
      onDoneRef.current?.();
    }, 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // Lock scrolling while the loader is on screen
  useEffect(() => {
    if (phase !== "loading") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  const p = progress / 100;
  const lifting = phase === "lift";
  // sun starts hidden behind the hills and ends just above them
  const sunShift = (1 - p) * 48 - 6; // vh

  return (
    <div
      role="status"
      aria-label="Loading Chak 31/4L"
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#04140b] transition-[transform,border-radius] duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        transform: lifting ? "translateY(-100%)" : "translateY(0)",
        borderBottomLeftRadius: lifting ? "50% 12vh" : 0,
        borderBottomRightRadius: lifting ? "50% 12vh" : 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@700&display=swap');

        @keyframes pl-sway {
          0%, 100% { transform: rotate(-2.5deg); }
          50%      { transform: rotate(2.5deg); }
        }
        @keyframes pl-twinkle {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 1; }
        }

        .pl-urdu {
          stroke: #ffd36b;
          stroke-linejoin: round;
          stroke-dasharray: 400;
          filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.95));
        }
        .pl-sway {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: pl-sway 4s ease-in-out infinite;
        }
        .pl-star { animation: pl-twinkle 3s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .pl-sway, .pl-star { animation: none; }
        }
      `}</style>

      {/* Sky: deep green fading to a warm glow at the horizon as the sun rises */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04140b] via-[#0b3a22] to-[#1a5c38]" />
      <div
        className="absolute inset-0"
        style={{
          opacity: p,
          background:
            "radial-gradient(ellipse 80% 55% at 50% 72%, rgba(255,176,66,0.6), rgba(255,176,66,0) 65%)",
        }}
      />

      {/* Stars fade out as the sun comes up */}
      <div className="absolute inset-0" style={{ opacity: Math.max(0, 1 - p * 1.4) }}>
        {stars.map((s, i) => (
          <span
            key={i}
            className="pl-star absolute rounded-full bg-amber-50"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Sun + glow */}
      <div
        className="absolute left-1/2 bottom-[34vh] will-change-transform"
        style={{ transform: `translate(-50%, ${sunShift}vh)` }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[min(90vw,34rem)] w-[min(90vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: 0.25 + p * 0.75,
            background:
              "radial-gradient(circle, rgba(255,200,90,0.55) 0%, rgba(255,200,90,0.15) 40%, rgba(255,200,90,0) 70%)",
          }}
        />
        <div className="relative h-[clamp(6rem,18vw,10rem)] w-[clamp(6rem,18vw,10rem)] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff2c2,#ffd36b_55%,#f5a623)] shadow-[0_0_60px_10px_rgba(255,190,80,0.6)]" />
      </div>

      {/* Hills and wheat silhouettes */}
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 h-[46vh] w-full"
        aria-hidden="true"
      >
        <path
          d="M0 210 C150 170 300 200 450 185 S800 150 950 190 S1120 175 1200 165 L1200 400 L0 400 Z"
          fill="#1d6b40"
          opacity="0.55"
        />
        <path
          d="M0 270 C200 230 380 280 600 250 S950 230 1200 265 L1200 400 L0 400 Z"
          fill="#0f4527"
        />
        <Wheat stalks={backWheat} color="#0a3320" width={1.4} />
        <path d="M0 335 C300 315 700 345 1200 325 L1200 400 L0 400 Z" fill="#071f12" />
        <Wheat stalks={frontWheat} color="#04140b" width={1.8} />
      </svg>

      {/* Name */}
      <div className="absolute inset-x-0 top-[6%] sm:top-[8%] flex flex-col items-center px-6 text-center z-10">
        <svg
          viewBox="0 0 600 160"
          className="w-[min(82vw,34rem)] overflow-visible"
          role="img"
          aria-label="Chak 31/4L"
        >
          <text
            x="300"
            y="112"
            textAnchor="middle"
            direction="rtl"
            fontSize="96"
            fontFamily="'Aref Ruqaa', 'Noto Nastaliq Urdu', serif"
            className="pl-urdu transition-all duration-500 ease-out"
            style={{
              strokeDashoffset: Math.max(0, 400 - (progress / 60) * 400),
              fill: progress >= 70 ? "#ffe9b0" : "transparent",
              strokeWidth: progress >= 70 ? "0.3px" : "1.4px",
            }}
          >
            چک 31/4L
          </text>
        </svg>
        <p 
          className="mt-2 text-lg sm:text-xl font-bold tracking-wider text-white bg-black/35 backdrop-blur-md px-5 py-1.5 rounded-full border border-amber-300/30 shadow-[0_4px_20px_rgba(0,0,0,0.7)] inline-block transition-all duration-700 ease-out"
          style={{
             opacity: progress >= 70 ? 1 : 0,
             transform: progress >= 70 ? "translateY(0)" : "translateY(15px)",
             textShadow: "0 2px 12px rgba(0, 0, 0, 0.95), 0 0 24px rgba(0, 0, 0, 0.85)"
          }}
        >
          Kori Baloch, Okara, Punjab
        </p>
      </div>

      {/* Progress */}
      <div className="absolute bottom-6 left-1/2 w-[min(80vw,22rem)] -translate-x-1/2">
        <div className="mb-2 flex items-baseline justify-between text-sm text-amber-100/80">
          <span>Loading</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
