import React, { useEffect, useRef, useState } from 'react';
import { 
  Globe, Code2, Zap, Shield, Sparkles, Layers, ArrowRight, CheckCircle2,
  RotateCcw, X, Send, Play, Terminal, Box, Navigation, Clock, Activity,
  ChevronRight, LayoutGrid, Monitor, Server, Eye, ExternalLink, RefreshCw,
  Users, Building2, Workflow, Database, LineChart, Lock, PhoneCall, Mail, MapPin,
  Smartphone, Megaphone, Palette, UserCheck, Star, Award, ChevronLeft, ArrowUpRight,
  Pause, FastForward, Heart, Search, Check, Layers3
} from 'lucide-react';

/**
 * Precise Metallic Gold 'AS' Logo Emblem Vector matching exact brand photo
 */
const ASLogoEmblem = ({ className = "h-12 w-auto", style = {} }) => (
  <img
    src="/amalsoft-logo.png"
    alt="Amal Soft Solutions"
    className={`object-contain ${className}`}
    style={style}
  />
);

/**
 * Full Amal Soft Solutions Brand Header Component
 */
const ASFullLogo = ({ className = "h-12 w-auto" }) => (
  <ASLogoEmblem className={`h-10 sm:h-12 w-auto shrink-0 ${className}`} />
);

export default function App() {
  const [introActive, setIntroActive] = useState(true);
  const [introStage, setIntroStage] = useState(0); // 0: Wave ribbons, 1: Emblem reveal, 2: Text reveal, 3: Lens Glint
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorSpeed, setCursorSpeed] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Carousel Pause States
  const [solutionsPaused, setSolutionsPaused] = useState(false);
  const [processPaused, setProcessPaused] = useState(false);

  // Live World Clocks State
  const [worldTimes, setWorldTimes] = useState({
    newYork: '--:--',
    london: '--:--',
    dubai: '--:--',
    singapore: '--:--',
    tokyo: '--:--',
    chennai: '--:--'
  });

  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const introCanvasRef = useRef(null);
  const mapCanvasRef = useRef(null);
  const prevPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      const dx = x - prevPosRef.current.x;
      const dy = y - prevPosRef.current.y;
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.8, 35);
      setCursorSpeed(speed);
      prevPosRef.current = { x, y };

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea, .hoverable-target')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let ringX = 0, ringY = 0;
    const animateRing = () => {
      ringX += (prevPosRef.current.x - ringX) * 0.16;
      ringY += (prevPosRef.current.y - ringY) * 0.16;

      if (cursorRingRef.current) {
        const scale = cursorHovered ? 1.8 : 1 + cursorSpeed * 0.02;
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };
    animateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorHovered, cursorSpeed]);

  useEffect(() => {
    if (!introActive) return;
    const hasSeenIntro = sessionStorage.getItem('amal_soft_video_intro_v7');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setIntroActive(false);
      return;
    }

    const canvas = introCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Golden Dust Particles
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.6,
      color: ['#D4AF37', '#F7E7AD', '#E5C158', '#FFF2C2', '#AA771C'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.8 + 0.2,
      vy: -(Math.random() * 0.35 + 0.1),
      vx: (Math.random() - 0.5) * 0.25
    }));

    let startTime = performance.now();
    let introAnimId;

    const renderIntroVideoSequence = (timestamp) => {
      const elapsed = (timestamp - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Radial Light
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      bgGrad.addColorStop(0, '#1E1E22');
      bgGrad.addColorStop(0.6, '#0E0E10');
      bgGrad.addColorStop(1, '#050506');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating Dust Particles
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      // Stage 0: Golden Ribbon Waves
      if (elapsed >= 0) {
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#D4AF37';

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height / 2 + Math.sin(x * 0.005 + elapsed * 1.8) * 80 + Math.cos(x * 0.002) * 40;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(247, 231, 173, 0.55)';
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height / 2 - Math.sin(x * 0.006 - elapsed * 1.5) * 75 - Math.sin(x * 0.003) * 35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Short, elegant intro timing (4 seconds total)
      setIntroStage((current) => {
        if (elapsed >= 3.0) return 3;
        if (elapsed >= 2.0) return Math.max(current, 2);
        if (elapsed >= 1.0) return Math.max(current, 1);
        return current;
      });

      if (elapsed < 4.0) {
        introAnimId = requestAnimationFrame(renderIntroVideoSequence);
      } else {
        finishIntro();
      }
    };

    introAnimId = requestAnimationFrame(renderIntroVideoSequence);

    return () => {
      cancelAnimationFrame(introAnimId);
    };
  }, [introActive]);

  const finishIntro = () => {
    setIntroActive(false);
    sessionStorage.setItem('amal_soft_video_intro_v7', 'true');
  };

  useEffect(() => {
    const updateTimes = () => {
      const options = { hour: '2-digit', minute: '2-digit', hour12: false };
      setWorldTimes({
        newYork: new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' }),
        london: new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Europe/London' }),
        dubai: new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Dubai' }),
        singapore: new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Singapore' }),
        tokyo: new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Tokyo' }),
        chennai: new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Kolkata' }),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateSize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const hubs = [
      { name: 'New York (Americas)', x: 0.22, y: 0.35 },
      { name: 'London (EMEA)', x: 0.48, y: 0.28 },
      { name: 'Dubai (MENA)', x: 0.62, y: 0.45 },
      { name: 'Chennai HQ (India)', x: 0.72, y: 0.52 },
      { name: 'Singapore (SEA)', x: 0.78, y: 0.62 },
      { name: 'Tokyo (APAC)', x: 0.86, y: 0.38 },
    ];

    let frame = 0;
    let mapAnimId;

    const drawMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Connecting Lines
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      for (let i = 0; i < hubs.length; i++) {
        for (let j = i + 1; j < hubs.length; j++) {
          ctx.moveTo(hubs[i].x * w, hubs[i].y * h);
          ctx.lineTo(hubs[j].x * w, hubs[j].y * h);
        }
      }
      ctx.stroke();

      // Signals Passing
      frame += 0.012;
      hubs.forEach((hub, idx) => {
        const target = hubs[(idx + 1) % hubs.length];
        const progress = (frame + idx * 0.2) % 1;
        const px = hub.x * w + (target.x * w - hub.x * w) * progress;
        const py = hub.y * h + (target.y * h - hub.y * h) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#E5C158';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
      });

      // Hub Node Pulsing Circles
      hubs.forEach((hub) => {
        const nx = hub.x * w;
        const ny = hub.y * h;

        const ringRadius = 6 + (Math.sin(frame * 3 + hub.x * 10) + 1) * 5;
        ctx.beginPath();
        ctx.arc(nx, ny, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#A37C1E';
        ctx.fill();

        ctx.fillStyle = '#1A1A1F';
        ctx.font = '700 11px "Space Grotesk", sans-serif';
        ctx.fillText(hub.name, nx + 10, ny + 4);
      });

      mapAnimId = requestAnimationFrame(drawMap);
    };

    drawMap();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(mapAnimId);
    };
  }, []);

  const amalSoftServices = [
    {
      num: '01',
      title: 'IT Staffing (All Major Technology Stacks)',
      category: 'Talent & Team Scale',
      desc: 'We help you build and scale engineering teams across common enterprise stacks and modern product stacks with dedicated support.',
      features: ['Dedicated Team', 'Team Augmentation', 'Sprint-based Hiring', 'Managed Delivery Support'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      badge: 'All Major Tech Stacks'
    },
    {
      num: '02',
      title: 'Web Design & Development',
      category: 'Web Applications',
      desc: 'From marketing websites to complex web apps, we deliver responsive, fast, SEO-friendly experiences built for growth.',
      features: ['Static & Dynamic Websites', 'Admin Dashboards', 'Customer Portals', 'SaaS Modules'],
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      badge: 'Fast & SEO-Friendly'
    },
    {
      num: '03',
      title: 'Mobile App Development (Native + Hybrid)',
      category: 'Mobile Products',
      desc: 'We build mobile products end-to-end: discovery, UX flows, engineering, testing, release, and post-launch improvements.',
      features: ['MVP Launch & Enterprise Apps', 'Field Workforce Applications', 'Secure Auth & Offline-First', 'App Store Publishing Support'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      badge: 'iOS & Android'
    },
    {
      num: '04',
      title: 'Digital Marketing & Paid Campaigns',
      category: 'Growth & Performance',
      desc: 'We help brands grow with practical marketing execution tied to measurable KPIs across multiple ad platforms.',
      features: ['Facebook & Instagram Ads Setup', 'Google Ads (Search/Display/YouTube)', 'Conversion Optimization', 'GA4 Analytics Setup'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      badge: 'Measurable KPIs'
    },
    {
      num: '05',
      title: 'UI/UX Design (Product-Grade Experiences)',
      category: 'Design Systems',
      desc: 'We design interfaces that improve adoption, reduce support load, and strengthen brand trust across all digital touchpoints.',
      features: ['UX Research Support', 'Wireframes & UI Systems', 'Interactive Prototypes', 'Design Handoff for Engineering'],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      badge: 'Figma Systems'
    }
  ];

  const workingProcess = [
    {
      step: '01',
      title: 'Strategy & Analysis',
      desc: 'We begin by listening and gaining a deep understanding of your business, goals, target audience, and market challenges through research and conversation.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 01'
    },
    {
      step: '02',
      title: 'Design & Development',
      desc: 'We breathe life into concepts, creating vibrant, responsive experiences that captivate users and drive conversion across web and mobile platforms.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 02'
    },
    {
      step: '03',
      title: 'Enhance & Evolve',
      desc: 'We continuously refine, test, and support your digital product post-launch to ensure long-term stability and measurable business impact.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 03'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1A1A1F] font-sans selection:bg-[#D4AF37] selection:text-white relative overflow-x-hidden">
      
      {/* Custom Gold Dynamic Trailing Cursor */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#D4AF37] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_12px_#D4AF37]"
      />
      <div 
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#D4AF37]/60 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out bg-[#D4AF37]/5"
      />

      {/* Cinematic Logo Intro Overlay */}
      {introActive && (
        <div className="fixed inset-0 z-[100000] bg-[#0A0A0C] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000">
          <canvas ref={introCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          <div className="absolute w-[700px] h-[700px] bg-radial from-[#D4AF37]/25 via-amber-600/10 to-transparent rounded-full blur-[140px] animate-pulse pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-6 text-center sm:text-left select-none">
            <div className={`transition-all duration-1000 transform ${
              introStage >= 1 
                ? 'opacity-100 scale-100 translate-y-0 filter drop-shadow-[0_0_35px_rgba(212,175,55,0.7)]' 
                : 'opacity-0 scale-75 translate-y-8'
            }`}>
              <ASLogoEmblem className="h-32 sm:h-44 md:h-52 w-auto" />
            </div>

            <div className={`relative overflow-hidden transition-all duration-1000 ${
              introStage >= 2 ? 'opacity-100 max-w-[600px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-12'
            }`}>
              <div className="flex flex-col justify-center whitespace-nowrap pl-2 sm:pl-4 border-l-2 border-[#D4AF37]/40">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-space text-white tracking-tight">
                  Amal Soft <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C2] via-[#D4AF37] to-[#A37C1E]">Solutions</span>
                </h1>
                <p className="text-xs sm:text-sm uppercase tracking-[0.45em] text-[#F7E7AD] font-bold mt-2">
                  Scale Your Business
                </p>
              </div>

              {introStage >= 3 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[shimmer_1.5s_ease-in-out_forwards] pointer-events-none opacity-70" />
              )}
            </div>
          </div>

          <button 
            onClick={finishIntro}
            className="absolute top-8 right-8 z-20 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4AF37]/40 text-xs tracking-widest text-white uppercase font-bold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
          >
            <span>Skip Intro</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <a href="#home" className="hover:opacity-95 transition-opacity">
            <ASFullLogo />
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-extrabold uppercase tracking-wider text-[#1A1A1F]">
            <a href="#home" className="hover:text-[#D4AF37] transition-colors py-1 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors py-1 relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#services" className="hover:text-[#D4AF37] transition-colors py-1 relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#process" className="hover:text-[#D4AF37] transition-colors py-1 relative group">
              Working Process
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#global-reach" className="hover:text-[#D4AF37] transition-colors py-1 relative group">
              Global Reach
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors py-1 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => { sessionStorage.removeItem('amal_soft_video_intro_v7'); setIntroStage(0); setIntroActive(true); }}
              className="p-2.5 rounded-full bg-[#F7F3E9] hover:bg-[#F3E5AB] text-[#1A1A1F] border border-[#D4AF37]/30 transition-all cursor-pointer"
              title="Replay Video Intro"
            >
              <RotateCcw className="w-4 h-4 text-[#A37C1E]" />
            </button>

            <a 
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A1A1F] text-white hover:bg-[#A37C1E] transition-all text-xs font-bold tracking-wide shadow-md"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1A1F]"
            >
              <LayoutGrid className="w-6 h-6" />
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#D4AF37]/20 px-6 py-6 flex flex-col gap-4 text-sm font-bold uppercase tracking-wider text-[#1A1A1F]">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)}>Working Process</a>
            <a href="#global-reach" onClick={() => setMobileMenuOpen(false)}>Global Reach</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center py-20 bg-gradient-to-b from-[#FFFDF9] via-[#F8F4EA] to-[#FFFDF9] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D4AF37]/35 text-xs font-bold text-[#A37C1E] shadow-sm mb-6">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>214+ Tailor-made Projects Across the Globe</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-space tracking-tight text-[#1A1A1F] leading-[1.12]">
                Scale Your Business <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A37C1E] via-[#D4AF37] to-amber-700">
                  With Purpose-Driven
                </span> Digital Design
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#4A4A57] max-w-2xl leading-relaxed">
                We build brands, websites, mobile apps, and digital experiences with intention, clarity, and care. Amal Soft is a growing technology partner focused on reliable, scalable, and practical software solutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a 
                  href="#contact" 
                  className="px-8 py-4 rounded-full bg-[#1A1A1F] text-white hover:bg-[#A37C1E] transition-all duration-300 font-bold text-sm shadow-xl flex items-center gap-3 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href="#services" 
                  className="px-8 py-4 rounded-full bg-white border border-[#D4AF37]/40 text-[#1A1A1F] hover:bg-[#F7F3E9] transition-all duration-300 font-bold text-sm shadow-sm flex items-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Explore 5 Core Services</span>
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 w-full max-w-lg">
                <div className="p-4 rounded-2xl bg-white/85 border border-[#D4AF37]/25 backdrop-blur-md text-center shadow-sm">
                  <p className="text-2xl font-extrabold font-space text-[#D4AF37]">214+</p>
                  <p className="text-[10px] uppercase font-bold text-[#4A4A57] tracking-wider mt-1">Global Projects</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/85 border border-[#D4AF37]/25 backdrop-blur-md text-center shadow-sm">
                  <p className="text-2xl font-extrabold font-space text-[#D4AF37]">14+ Yrs</p>
                  <p className="text-[10px] uppercase font-bold text-[#4A4A57] tracking-wider mt-1">Industry Leadership</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/85 border border-[#D4AF37]/25 backdrop-blur-md text-center shadow-sm">
                  <p className="text-2xl font-extrabold font-space text-[#D4AF37]">4.8 / 5.0</p>
                  <p className="text-[10px] uppercase font-bold text-[#4A4A57] tracking-wider mt-1">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px]">
              <div className="relative z-20 w-full max-w-md rounded-3xl p-3 bg-white/90 border border-[#D4AF37]/35 backdrop-blur-md shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Amal Soft Engineering Team" 
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-1 rounded bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase tracking-widest">
                      Amal Soft Team
                    </span>
                    <h3 className="text-base font-bold font-space mt-1">Technical Excellence & Strategy</h3>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 z-30 w-64 p-3 rounded-2xl bg-white/95 border border-[#D4AF37]/40 backdrop-blur-xl shadow-xl hidden sm:block">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                    alt="Senior Designer" 
                    className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1F]">UX & Digital Strategy</h4>
                    <p className="text-[11px] text-[#4A4A57]">Target-driven product design</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-4 z-30 p-3 rounded-2xl bg-white/95 border border-[#D4AF37]/40 backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <ASLogoEmblem className="h-8 w-auto" />
                  <span className="text-xs font-extrabold text-[#1A1A1F]">Active Global Mesh</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md group">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" 
                      alt="Yousuf K - Founder Amal Soft Solutions" 
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-extrabold font-space">Yousuf K</p>
                      <p className="text-[10px] text-[#D4AF37] uppercase font-bold">Founder, Amal Soft Solutions</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30 text-center shadow-xs">
                    <Award className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#1A1A1F]">14+ Years of Experience</p>
                    <p className="text-[11px] text-[#4A4A57] mt-0.5">Reliable & Practical Solutions</p>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="p-6 rounded-2xl bg-[#1A1A1F] text-white text-center shadow-xl">
                    <p className="text-3xl font-extrabold font-space text-[#D4AF37]">95+</p>
                    <p className="text-[10px] uppercase font-bold text-gray-300 mt-1">Businesses Scaled</p>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md group">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                      alt="Amal Soft Delivery Lead" 
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-bold tracking-widest text-[#A37C1E] uppercase">About Amal Soft Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#1A1A1F] mt-2">
                Helping Brands & Industry Grow Through Purpose-Driven Technology
              </h2>
              <div className="w-16 h-[3px] bg-[#D4AF37] mt-4 mb-6" />

              <p className="text-[#4A4A57] text-sm sm:text-base leading-relaxed mb-6">
                Amal Soft is a growing technology partner focused on reliable, scalable, and practical digital solutions. We combine technical excellence with deep business understanding to deliver measurable outcomes for startups and enterprises globally.
              </p>

              <div className="space-y-4 w-full">
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="text-sm font-bold text-[#1A1A1F]">Our Mission</h3>
                  </div>
                  <p className="text-xs text-[#4A4A57] leading-relaxed">
                    We help businesses grow with reliable technology, strong teams, and clear delivery, so every project creates real impact.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="text-sm font-bold text-[#1A1A1F]">Our Vision</h3>
                  </div>
                  <p className="text-xs text-[#4A4A57] leading-relaxed">
                    To be a trusted partner known for quality work, honest communication, and long-term results across software, mobile, web, marketing, and IT staffing.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STRATEGIC SOLUTIONS (Left-To-Right Animated Grid Carousel) */}
      <section id="services" className="py-24 bg-[#F7F3E9]/30 relative border-t border-[#D4AF37]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          
          <div className="relative p-8 sm:p-10 rounded-3xl bg-white/85 border border-[#D4AF37]/40 shadow-lg backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF3718_1px,transparent_1px),linear-gradient(to_bottom,#D4AF3718_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute h-[1.5px] w-full top-1/3 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-[gridScanH_6s_linear_infinite] opacity-70" />
              <div className="absolute h-[1.5px] w-full top-2/3 bg-gradient-to-r from-transparent via-[#E5C158] to-transparent animate-[gridScanH_8s_linear_infinite_reverse] opacity-50" />
              <div className="absolute w-[1.5px] h-full left-1/4 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent animate-[gridScanV_7s_linear_infinite] opacity-60" />
              <div className="absolute w-[1.5px] h-full left-3/4 bg-gradient-to-b from-transparent via-[#E5C158] to-transparent animate-[gridScanV_9s_linear_infinite_reverse] opacity-60" />
            </div>

            <div className="absolute top-3 left-3 text-[#D4AF37]/70 font-mono text-xs font-bold">+</div>
            <div className="absolute top-3 right-3 text-[#D4AF37]/70 font-mono text-xs font-bold">+</div>
            <div className="absolute bottom-3 left-3 text-[#D4AF37]/70 font-mono text-xs font-bold">+</div>
            <div className="absolute bottom-3 right-3 text-[#D4AF37]/70 font-mono text-xs font-bold">+</div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4AF37]/45 text-[11px] font-extrabold text-[#A37C1E] uppercase tracking-widest shadow-xs mb-3">
                  <ASLogoEmblem className="h-4 w-auto" />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  <span>Strategic Solutions Grid</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#1A1A1F] tracking-tight">
                  Strategic Solutions for Digital Growth
                </h2>
                
                <p className="text-[#4A4A57] mt-3 text-sm sm:text-base leading-relaxed">
                  We provide a full range of digital solutions designed to help businesses grow, connect, & succeed internationally.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setSolutionsPaused(!solutionsPaused)}
                  className="px-5 py-2.5 rounded-full bg-[#1A1A1F] text-white text-xs font-bold hover:bg-[#A37C1E] transition-all flex items-center gap-2 shadow-md cursor-pointer border border-[#D4AF37]/40"
                >
                  {solutionsPaused ? <Play className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{solutionsPaused ? 'Resume Grid' : 'Pause Grid'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Continuous Left-to-Right Moving Grid Track */}
        <div 
          className="w-full relative overflow-hidden py-4"
          onMouseEnter={() => setSolutionsPaused(true)}
          onMouseLeave={() => setSolutionsPaused(false)}
        >
          <div 
            className={`flex items-center gap-8 w-max transition-all ${
              solutionsPaused ? '' : 'animate-[scrollLeftToRight_28s_linear_infinite]'
            }`}
          >
            {[...amalSoftServices, ...amalSoftServices].map((service, idx) => (
              <div 
                key={idx} 
                className="w-[320px] sm:w-[380px] p-6 rounded-3xl bg-white border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl group relative flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-5 h-48">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F]/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1A1A1F] text-[#D4AF37] text-[10px] font-extrabold font-space uppercase tracking-wider border border-[#D4AF37]/30">
                      {service.num} • {service.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-[#A37C1E] uppercase tracking-widest">{service.category}</span>
                  <h3 className="text-xl font-bold font-space text-[#1A1A1F] mt-1 mb-2">{service.title}</h3>
                  <p className="text-[#4A4A57] text-xs leading-relaxed mb-4">{service.desc}</p>

                  <div className="space-y-1.5 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] font-semibold text-[#1A1A1F]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href="#contact"
                  className="w-full py-3 rounded-xl bg-[#F7F3E9] hover:bg-[#1A1A1F] hover:text-white text-[#1A1A1F] font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Inquire Now</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVEN WORKING PROCESS (Right-To-Left Animated Grid Carousel) */}
      <section id="process" className="py-24 bg-white relative border-t border-[#D4AF37]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          
          <div className="relative p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#D4AF37]/40 shadow-lg backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF3718_1px,transparent_1px),linear-gradient(to_bottom,#D4AF3718_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold tracking-widest text-[#A37C1E] uppercase">How We Work</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#1A1A1F] mt-2">
                  Our Proven Working Process
                </h2>
                <p className="text-[#4A4A57] mt-3 text-sm sm:text-base">
                  Clear delivery, steady progress, and transparent communication from day one.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setProcessPaused(!processPaused)}
                  className="px-5 py-2.5 rounded-full bg-[#1A1A1F] text-white text-xs font-bold hover:bg-[#A37C1E] transition-all flex items-center gap-2 shadow-md cursor-pointer border border-[#D4AF37]/40"
                >
                  {processPaused ? <Play className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{processPaused ? 'Resume Grid' : 'Pause Grid'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Continuous Right-to-Left Moving Grid Track */}
        <div 
          className="w-full relative overflow-hidden py-4"
          onMouseEnter={() => setProcessPaused(true)}
          onMouseLeave={() => setProcessPaused(false)}
        >
          <div 
            className={`flex items-center gap-8 w-max transition-all ${
              processPaused ? '' : 'animate-[scrollRightToLeft_24s_linear_infinite]'
            }`}
          >
            {[...workingProcess, ...workingProcess, ...workingProcess].map((item, idx) => (
              <div 
                key={idx} 
                className="w-[320px] sm:w-[380px] p-6 rounded-3xl bg-[#FFFDF9] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xs hover:shadow-xl group shrink-0"
              >
                <div className="relative rounded-2xl overflow-hidden mb-6 h-44">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1F]/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-xs font-extrabold font-space">
                    Step {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-space text-[#1A1A1F] mb-2">{item.title}</h3>
                <p className="text-[#4A4A57] text-xs leading-relaxed mb-4">{item.desc}</p>

                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-bold text-[#A37C1E]">
                  <span>Agile Sprint Delivery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section id="global-reach" className="py-24 bg-[#F7F3E9]/30 relative border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#A37C1E] uppercase">Global Reach</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#1A1A1F] mt-2">
              Connecting Projects & Operations Worldwide
            </h2>
            <p className="text-[#4A4A57] mt-3 text-sm sm:text-base">
              Supporting client teams across major international tech hubs with low latency and dedicated care.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 text-center shadow-xs">
              <p className="text-xs font-extrabold text-[#A37C1E] uppercase">Chennai (HQ)</p>
              <p className="text-base font-bold font-space text-[#1A1A1F] mt-1">{worldTimes.chennai}</p>
              <span className="text-[10px] text-green-600 font-bold">Primary Hub</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 text-center shadow-xs">
              <p className="text-xs font-extrabold text-[#A37C1E] uppercase">New York</p>
              <p className="text-base font-bold font-space text-[#1A1A1F] mt-1">{worldTimes.newYork}</p>
              <span className="text-[10px] text-green-600 font-bold">12ms Active</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 text-center shadow-xs">
              <p className="text-xs font-extrabold text-[#A37C1E] uppercase">London</p>
              <p className="text-base font-bold font-space text-[#1A1A1F] mt-1">{worldTimes.london}</p>
              <span className="text-[10px] text-green-600 font-bold">8ms Active</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 text-center shadow-xs">
              <p className="text-xs font-extrabold text-[#A37C1E] uppercase">Dubai</p>
              <p className="text-base font-bold font-space text-[#1A1A1F] mt-1">{worldTimes.dubai}</p>
              <span className="text-[10px] text-green-600 font-bold">14ms Active</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 text-center shadow-xs">
              <p className="text-xs font-extrabold text-[#A37C1E] uppercase">Singapore</p>
              <p className="text-base font-bold font-space text-[#1A1A1F] mt-1">{worldTimes.singapore}</p>
              <span className="text-[10px] text-green-600 font-bold">11ms Active</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 text-center shadow-xs">
              <p className="text-xs font-extrabold text-[#A37C1E] uppercase">Tokyo</p>
              <p className="text-base font-bold font-space text-[#1A1A1F] mt-1">{worldTimes.tokyo}</p>
              <span className="text-[10px] text-green-600 font-bold">16ms Active</span>
            </div>
          </div>

          <div className="relative rounded-3xl bg-[#FFFDF9] border border-[#D4AF37]/35 p-8 shadow-xl overflow-hidden min-h-[420px] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 z-10">
              <div className="flex items-center gap-3">
                <ASLogoEmblem className="h-8 w-auto" />
                <div>
                  <h3 className="text-base font-bold font-space text-[#1A1A1F]">Global Operational Mesh</h3>
                  <p className="text-xs text-[#4A4A57]">Connecting delivery hubs with client teams</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 text-green-700 text-xs font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse text-green-600" />
                <span>Grid Active (0 Latency Spikes)</span>
              </div>
            </div>

            <div className="relative w-full h-[320px] rounded-2xl bg-white border border-[#D4AF37]/20 overflow-hidden">
              <canvas ref={mapCanvasRef} className="w-full h-full block" />
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#A37C1E] uppercase">Tell Details About Your Project</span>
                <h2 className="text-3xl font-extrabold font-space text-[#1A1A1F] mt-2">Let’s Build Something Exceptional Together</h2>
                <p className="text-[#4A4A57] text-xs sm:text-sm mt-3 leading-relaxed">
                  Fast turnaround and clear deadlines matter. Expect fast delivery, transparent updates, and steady progress throughout your entire project.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#A37C1E]">Direct Call</p>
                      <p className="text-sm font-bold text-[#1A1A1F] mt-0.5">+91 88079 02321</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#A37C1E]">Official Inquiry</p>
                      <p className="text-sm font-bold text-[#1A1A1F] mt-0.5">info@amalsoft.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/25 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#A37C1E]">Office Location</p>
                      <p className="text-xs font-bold text-[#1A1A1F] mt-0.5 leading-snug">
                        Amal Soft Solutions Private Limited <br />
                        Chandrasekaran Avenue, 1st Main Road, Thoraipakkam, Tamil Nadu 600097, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30">
                <p className="text-xs italic text-[#4A4A57]">
                  "Helping brands and industry grow through creative and purpose-driven technical design."
                </p>
                <p className="text-xs font-bold text-[#1A1A1F] mt-2">— Yousuf K, Founder</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#D4AF37]/30 shadow-xl">
                {!formSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1F] mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Alexander Vance" 
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/30 text-[#1A1A1F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1F] mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="alexander@company.com" 
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/30 text-[#1A1A1F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1F] mb-2">Company Name</label>
                        <input 
                          type="text" 
                          placeholder="Vance Technologies" 
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/30 text-[#1A1A1F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1F] mb-2">Your Budget</label>
                        <select className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/30 text-[#1A1A1F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                          <option>$5,000 - $15,000</option>
                          <option>$15,000 - $30,000</option>
                          <option>$30,000 - $50,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1F] mb-2">Selected Service Needs</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/30 text-[#1A1A1F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                        <option>IT Staffing & Dedicated Engineering Team</option>
                        <option>Web Design & Development (Apps / Dashboards)</option>
                        <option>Mobile App Development (Native + Hybrid)</option>
                        <option>Digital Marketing & Google/Meta Paid Ads</option>
                        <option>UI/UX Design Systems & Prototypes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1F] mb-2">Project Message *</label>
                      <textarea 
                        rows={4} 
                        required 
                        placeholder="Tell us about your project goals, timelines, and requirements..." 
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/30 text-[#1A1A1F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 rounded-xl bg-[#1A1A1F] text-white hover:bg-[#A37C1E] transition-all duration-300 font-bold text-sm shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold font-space text-[#1A1A1F]">Message Received</h3>
                    <p className="text-[#4A4A57] text-xs mt-2">Thank you for contacting Amal Soft Solutions. Our team will get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 text-xs font-bold text-[#A37C1E] underline cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D4AF37]/20 py-12 text-xs text-[#4A4A57]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <ASFullLogo className="h-8 w-auto" />
            <span className="text-[11px] text-[#4A4A57] sm:border-l sm:border-[#D4AF37]/30 sm:pl-4">
              © {new Date().getFullYear()} Amal Soft Solutions Pvt Ltd. All Rights Reserved. <br />
              <span className="text-[10px] text-gray-400">CIN: U62099TN2026PTC191348 • Thoraipakkam, Tamil Nadu</span>
            </span>
          </div>

          <div className="flex items-center gap-6 font-bold uppercase tracking-wider text-[#1A1A1F]">
            <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a>
            <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#D4AF37] transition-colors">Process</a>
            <a href="#global-reach" className="hover:text-[#D4AF37] transition-colors">Global Reach</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
</div>
  );
}