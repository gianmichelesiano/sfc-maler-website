import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from './translations';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// LANGUAGE CONTEXT
// ==========================================
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('de');

  const toggleLang = () => {
    setLang(prev => prev === 'it' ? 'de' : 'it');
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ==========================================
// NAVBAR COMPONENT
// ==========================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-[3rem] transition-all duration-300 px-6 py-4 flex items-center justify-between border ${scrolled
          ? 'bg-inchiostro/95 backdrop-blur-xl border-calce/10 shadow-xl text-calce'
          : 'bg-transparent border-transparent text-inchiostro'
          }`}
      >
        <div className="font-sans font-black text-xl tracking-tight uppercase">SFC Maler</div>

        <div className="hidden md:flex gap-8 items-center text-sm font-sans font-semibold tracking-wide">
          <a href="#chisiamo" className="hover-lift hover:text-accent transition-colors">{t('nav_about')}</a>
          <a href="#servizi" className="hover-lift hover:text-accent transition-colors">{t('nav_services')}</a>
          <a href="#protocollo" className="hover-lift hover:text-accent transition-colors">{t('nav_protocol')}</a>
          <a href="#lavori" className="hover-lift hover:text-accent transition-colors">{t('nav_gallery')}</a>
          <a href="#contatti" className="hover-lift hover:text-accent transition-colors">{t('nav_contact')}</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest px-3 py-2 border rounded-full transition-colors ${scrolled ? 'border-calce/30 hover:bg-calce hover:text-inchiostro' : 'border-inchiostro/30 hover:bg-inchiostro hover:text-calce'
              }`}
          >
            <Globe size={14} /> {lang.toUpperCase()}
          </button>

          <a
            href="tel:0784044747"
            className={`font-sans font-bold text-sm px-6 py-3 rounded-full magnetic-btn relative overflow-hidden group ${scrolled
              ? 'bg-accent text-white hover:text-primary'
              : 'bg-inchiostro text-calce'
              }`}
          >
            <span className="relative z-10 transition-colors duration-300">{t('nav_cta')}</span>
            <span className={`absolute inset-0 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 ${scrolled ? 'bg-calce' : 'bg-accent'}`}></span>
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col justify-center items-center gap-8 font-sans font-bold text-2xl uppercase">
          <a href="#chisiamo" onClick={() => setMenuOpen(false)} className="hover:text-accent">{t('nav_about')}</a>
          <a href="#servizi" onClick={() => setMenuOpen(false)} className="hover:text-accent">{t('nav_services')}</a>
          <a href="#protocollo" onClick={() => setMenuOpen(false)} className="hover:text-accent">{t('nav_protocol')}</a>
          <a href="#lavori" onClick={() => setMenuOpen(false)} className="hover:text-accent">{t('nav_gallery')}</a>
          <a href="#contatti" onClick={() => setMenuOpen(false)} className="hover:text-accent">{t('nav_contact')}</a>
          <button onClick={() => { toggleLang(); setMenuOpen(false); }} className="font-mono text-sm border-2 border-primary px-6 py-2 rounded-full">
            {t('lang_label')}: {lang.toUpperCase()} &rarr; {lang === 'it' ? 'DE' : 'IT'}
          </button>
          <a
            href="tel:0784044747"
            className="mt-4 bg-accent text-white px-8 py-4 rounded-full text-lg"
          >
            {t('nav_call')}
          </a>
        </div>
      )}
    </>
  );
};

// ==========================================
// HERO COMPONENT
// ==========================================
const Hero = () => {
  const comp = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative h-[100dvh] w-full flex items-end pb-24 lg:pb-32 px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/Gemini_Generated_Image_n1luovn1luovn1lu.png"
          alt="SFC Maler"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/5"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="hero-elem font-sans text-xs md:text-sm font-bold tracking-widest uppercase text-inchiostro/80 mb-6 inline-block py-1 px-3 border border-inchiostro/20 rounded-full backdrop-blur-sm">
          {t('hero_brand')}
        </div>

        <h1 className="flex flex-col gap-2 md:gap-0 leading-[1.1]">
          <span className="hero-elem font-sans font-black text-2xl md:text-4xl lg:text-5xl tracking-[-0.04em] text-inchiostro">
            {t('hero_title_1')}
          </span>
          <span className="hero-elem font-drama italic font-semibold text-5xl md:text-[6.5rem] lg:text-[7.5rem] text-inchiostro tracking-tight block ml-0 md:ml-12 mt-2 md:-mt-4">
            {t('hero_title_2')}<span className="text-accent">.</span>
          </span>
        </h1>

        <div className="hero-elem mt-12 max-w-lg">
          <p className="font-drama text-lg md:text-xl text-inchiostro/80 leading-relaxed mb-8">
            {t('hero_desc')}
          </p>
          <a
            href="#servizi"
            className="inline-flex items-center justify-center font-sans font-bold text-sm bg-inchiostro text-calce px-8 py-4 rounded-full magnetic-btn relative overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300">{t('hero_cta')}</span>
            <span className="absolute inset-0 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// FEATURE 1: DIAGNOSTIC SHUFFLER
// ==========================================
const ShufflerCard = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState([
    { id: 1, label: t('shuffler_1'), active: true },
    { id: 2, label: t('shuffler_2'), active: false },
    { id: 3, label: t('shuffler_3'), active: false }
  ]);

  // Sync translations if language changes
  useEffect(() => {
    setItems(prev => [
      { ...prev[0], label: t(prev[0].id === 1 ? 'shuffler_1' : prev[0].id === 2 ? 'shuffler_2' : 'shuffler_3') },
      { ...prev[1], label: t(prev[1].id === 1 ? 'shuffler_1' : prev[1].id === 2 ? 'shuffler_2' : 'shuffler_3') },
      { ...prev[2], label: t(prev[2].id === 1 ? 'shuffler_1' : prev[2].id === 2 ? 'shuffler_2' : 'shuffler_3') }
    ]);
  }, [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr.map((item, i) => ({ ...item, active: i === 0 }));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-inchiostro text-calce border border-calce/10 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all h-[400px] flex flex-col justify-between">
      <div>
        <h3 className="font-sans font-black text-2xl mb-3">{t('shuffler_title')}</h3>
        <p className="font-drama text-calce/60 mb-8">{t('shuffler_desc')}</p>
      </div>

      <div className="relative h-44 flex flex-col items-center justify-end overflow-hidden pb-4">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`absolute w-full max-w-[280px] p-4 rounded-xl border font-sans font-bold text-sm transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${i === 0 ? 'bg-calce text-inchiostro border-calce bottom-4 scale-100 z-30 opacity-100 shadow-xl' :
                i === 1 ? 'bg-inchiostro text-calce/60 border-calce/40 bottom-8 scale-95 z-20 opacity-70' :
                  'bg-inchiostro text-calce/40 border-calce/20 bottom-12 scale-90 z-10 opacity-40'}`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// FEATURE 2: TELEMETRY TYPEWRITER
// ==========================================
const TypewriterCard = () => {
  const { t } = useLanguage();
  const lines = t('typewriter_lines');

  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  // Reset typewriter on lang change
  useEffect(() => {
    setText(""); setLineIdx(0); setCharIdx(0);
  }, [t]);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const reset = setTimeout(() => {
        setText(""); setLineIdx(0); setCharIdx(0);
      }, 3000);
      return () => clearTimeout(reset);
    }

    const currentLine = lines[lineIdx];
    if (charIdx < currentLine.length) {
      const to = setTimeout(() => {
        setText(prev => prev + currentLine[charIdx]);
        setCharIdx(charIdx + 1);
      }, 50); // typing speed
      return () => clearTimeout(to);
    } else {
      const to = setTimeout(() => {
        setText(prev => prev + "\n");
        setLineIdx(lineIdx + 1);
        setCharIdx(0);
      }, 800);
      return () => clearTimeout(to);
    }
  }, [charIdx, lineIdx, lines]);

  return (
    <div className="bg-inchiostro text-calce border border-calce/10 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all h-[400px] flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-sans font-black text-2xl">{t('typewriter_title')}</h3>
        </div>
        <p className="font-drama text-calce/60 mb-6">{t('typewriter_desc')}</p>
      </div>

      <div className="bg-black/40 rounded-xl p-5 h-44 overflow-hidden relative shadow-inner border border-calce/5">
        <pre className="font-mono text-xs md:text-[13px] text-salvia leading-relaxed whitespace-pre-wrap break-words">
          {text}
          <span className="inline-block w-2 bg-accent ml-1 animate-pulse">&nbsp;</span>
        </pre>
      </div>
    </div>
  );
};

// ==========================================
// FEATURE 3: CURSOR PROTOCOL SCHEDULER
// ==========================================
const SchedulerCard = () => {
  const comp = useRef(null);
  const { t } = useLanguage();
  const days = t('scheduler_days');

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // Cursor enters from bottom right
      tl.fromTo('.anim-cursor',
        { x: 200, y: 150, opacity: 0 },
        { x: 95, y: 45, opacity: 1, duration: 1.2, ease: "power2.inOut" }
      )
        // Clicks middle day (Wed)
        .to('.anim-cursor', { scale: 0.8, duration: 0.15 })
        .to('.grid-cell-3', { backgroundColor: '#E8521A', color: '#fff', duration: 0.1 }, "<")
        .to('.anim-cursor', { scale: 1, duration: 0.15 })
        // Notice appearance
        .to('.event-notice', { opacity: 1, y: 0, duration: 0.4 }, "+=0.2")
        // Cursor moves to save
        .to('.anim-cursor', { x: 195, y: 110, duration: 0.8, ease: "power2.inOut" })
        .to('.anim-cursor', { scale: 0.8, duration: 0.15 })
        .to('.save-btn-bg', { scaleX: 1, duration: 0.3 }, "<")
        .to('.save-btn-text', { color: '#0F0F0D', duration: 0.1 }, "<")
        .to('.anim-cursor', { scale: 1, duration: 0.15 })
        // Fade out and reset
        .to('.anim-cursor', { opacity: 0, duration: 0.5 }, "+=0.5")
        .to('.grid-cell-3', { backgroundColor: 'transparent', color: '#0F0F0D', duration: 0.2 }, "+=0.2")
        .to('.event-notice', { opacity: 0, y: 5, duration: 0.2 }, "<")
        .to('.save-btn-bg', { scaleX: 0, duration: 0.2 }, "<")
        .to('.save-btn-text', { color: '#F5F2EB', duration: 0.1 }, "<");
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="bg-inchiostro text-calce border border-calce/10 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all h-[400px] flex flex-col justify-between">
      <div>
        <h3 className="font-sans font-black text-2xl mb-3">{t('scheduler_title')}</h3>
        <p className="font-drama text-calce/60 mb-5">{t('scheduler_desc')}</p>
      </div>

      <div className="relative h-44 bg-inchiostro/50 border border-calce/10 rounded-xl p-4 overflow-hidden">
        {/* Weekly Grid */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs font-bold mb-4">
          <div className="py-2 text-calce/50">{days[0]}</div>
          <div className="py-2 text-calce/50">{days[1]}</div>
          <div className="py-2 border border-calce/20 rounded uppercase grid-cell-3 transition-colors text-calce">{days[2]}</div>
          <div className="py-2 text-calce/50">{days[3]}</div>
          <div className="py-2 text-calce/50">{days[4]}</div>
          <div className="py-2 text-calce/20">{days[5]}</div>
          <div className="py-2 text-calce/20">{days[6]}</div>
        </div>

        {/* Action button mock */}
        <div className="flex justify-between items-center mt-6">
          <div className="event-notice opacity-0 translate-y-1 font-mono text-[10px] text-accent font-bold px-2 py-1 bg-accent/20 rounded">{t('scheduler_notice')}</div>
          <div className="save-btn relative border border-calce/30 rounded px-4 py-1.5 font-sans font-bold text-xs overflow-hidden text-calce">
            <span className="save-btn-text relative z-10">{t('scheduler_btn')}</span>
            <div className="save-btn-bg absolute inset-0 bg-calce origin-left scale-x-0"></div>
          </div>
        </div>

        {/* Fake Cursor SVG */}
        <svg className="anim-cursor absolute top-0 left-0 w-6 h-6 z-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F5F2EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" fill="#0F0F0D" />
        </svg>
      </div>
    </div>
  );
};

// ==========================================
// FEATURES SECTION MUX
// ==========================================
const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="servizi" className="py-24 md:py-32 px-6 lg:px-12 bg-calce relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-7xl text-primary tracking-tight mb-6">
            {t('feat_title')} <span className="text-secondary italic font-drama">{t('feat_title_span')}.</span>
          </h2>
          <p className="font-drama text-xl text-primary/70 max-w-2xl">
            {t('feat_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <ShufflerCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </div>
    </section>
  );
};

// ==========================================
// PHILOSOPHY SECTION (The Manifesto)
// ==========================================
const Philosophy = () => {
  const comp = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-elem', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="filosofia" ref={comp} className="relative w-full py-32 md:py-48 px-6 lg:px-12 bg-inchiostro text-calce overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1596541223130-5d5644837563?q=80&w=2070&auto=format&fit=crop"
          alt="Texture industriale organica"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="phil-elem font-mono text-sm tracking-widest text-segnale uppercase mb-16 px-4 py-2 border border-segnale/30 bg-segnale/10 rounded-full inline-block">
          {t('phil_label')}
        </div>

        <p className="phil-elem font-sans font-bold text-xl md:text-3xl lg:text-4xl text-calce/50 mb-8 max-w-3xl leading-snug">
          {t('phil_1')} <span className="text-calce/80 line-through">{t('phil_1_strike')}</span>.
        </p>

        <h2 className="phil-elem font-drama italic font-semibold text-5xl md:text-7xl lg:text-8xl text-calce tracking-tight leading-tight mt-6">
          {t('phil_2')} <br />
          <span className="text-salvia block mt-4">{t('phil_2_span')}</span>
        </h2>
      </div>
    </section>
  );
};

// ==========================================
// PROTOCOL SECTION (Sticky Stacking Archive)
// ==========================================
const ProtocolCard = ({ index, title, subtitle, animType }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (animType === 'roller') {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(`.roller-mask-${index}`, {
        height: 200,
        duration: 2.5,
        ease: 'power2.inOut'
      }, 0);
      tl.to(`.roller-tool-${index}`, {
        y: 200,
        duration: 2.5,
        ease: 'power2.inOut'
      }, 0);
    } else if (animType === 'swatches') {
      gsap.to(`.swatch-${index}`, {
        y: (i) => i % 2 === 0 ? -20 : 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'sine.inOut'
      });
    } else if (animType === 'precision_grid') {
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(`.laser-x-${index}`,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );
      tl.fromTo(`.laser-y-${index}`,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
        "-=1"
      );
      tl.to(`.laser-point-${index}`, {
        scale: 1.5,
        opacity: 0,
        duration: 1,
        stagger: 0.1
      }, "-=0.5");
    }
  }, [animType, index]);

  return (
    <div
      ref={cardRef}
      className="protocol-card sticky top-0 h-[100dvh] w-full flex items-center justify-center p-6 bg-calce shadow-[0_-20px_50px_rgba(0,0,0,0.05)] origin-top border-t border-primary/5"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <div>
          <div className="font-mono font-bold text-4xl md:text-6xl text-primary/20 mb-6">0{index + 1} //</div>
          <h3 className="font-sans font-black text-4xl md:text-6xl text-primary mb-6 tracking-tight">{title}</h3>
          <p className="font-drama text-xl md:text-2xl text-primary/70 leading-relaxed max-w-xl">{subtitle}</p>
        </div>

        {/* Right: Graphic / Animation Container */}
        <div className="bg-white border border-primary/10 rounded-[3rem] h-[40vh] md:h-[60vh] flex items-center justify-center p-8 relative overflow-hidden shadow-sm">
          {animType === 'roller' && (
            <svg viewBox="0 0 200 300" className="w-[60%] h-[80%] opacity-90">
              {/* Sfondo muro grezzo */}
              <rect x="50" y="20" width="100" height="260" fill="#E8E4DD" rx="4" />
              {/* Traccia di vernice (Maschera per la rivelazione) */}
              <mask id={`paint-mask-${index}`}>
                <rect className={`roller-mask-${index}`} x="50" y="20" width="100" height="0" fill="white" />
              </mask>
              <rect x="50" y="20" width="100" height="260" fill="#C8A84B" mask={`url(#paint-mask-${index})`} rx="4" />

              {/* Strumento Rullo */}
              <g className={`roller-tool-${index}`}>
                {/* Manico */}
                <path d="M100 0 L100 -40 L160 -40 L160 20 L150 20" fill="none" stroke="#2A2A35" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="94" y="-70" width="12" height="30" fill="#1A1A1A" rx="2" />
                {/* Rullo cilindro */}
                <rect x="40" y="-10" width="120" height="30" fill="#E8E4DD" rx="8" stroke="#111111" strokeWidth="2" />
                {/* Vernice fresca sul rullo */}
                <rect x="42" y="-8" width="116" height="26" fill="#C8A84B" rx="6" opacity="0.9" />
              </g>
            </svg>
          )}

          {animType === 'swatches' && (
            <svg viewBox="0 0 300 200" className="w-[80%] h-[60%] opacity-90 overflow-visible">
              <g transform="translate(150, 100)">
                <rect className={`swatch-${index}`} x="-120" y="-40" width="60" height="80" rx="8" fill="#F5F2EB" stroke="#1A1A1A" strokeWidth="2" transform="rotate(-15)" />
                <rect className={`swatch-${index}`} x="-40" y="-50" width="60" height="80" rx="8" fill="#E8521A" stroke="#1A1A1A" strokeWidth="2" transform="rotate(-5)" />
                <rect className={`swatch-${index}`} x="40" y="-60" width="60" height="80" rx="8" fill="#6B8F71" stroke="#1A1A1A" strokeWidth="2" transform="rotate(5)" />
                <rect className={`swatch-${index}`} x="120" y="-50" width="60" height="80" rx="8" fill="#C8A84B" stroke="#1A1A1A" strokeWidth="2" transform="rotate(15)" />
              </g>
            </svg>
          )}

          {animType === 'precision_grid' && (
            <svg viewBox="0 0 300 300" className="w-[90%] opacity-80">
              {/* Griglia di fondo */}
              <path d="M0 100 L300 100 M0 200 L300 200 M100 0 L100 300 M200 0 L200 300" stroke="#E8E4DD" strokeWidth="1" strokeDasharray="4 4" />

              {/* Linee Laser */}
              <line className={`laser-x-${index}`} x1="0" y1="150" x2="300" y2="150" stroke="#E63B2E" strokeWidth="2" style={{ transformOrigin: 'left center' }} />
              <line className={`laser-y-${index}`} x1="150" y1="0" x2="150" y2="300" stroke="#E63B2E" strokeWidth="2" style={{ transformOrigin: 'top center' }} />

              {/* Dispositivo Livella Centrale */}
              <circle cx="150" cy="150" r="16" fill="#111111" />
              <circle cx="150" cy="150" r="12" fill="#2A2A35" />
              <circle cx="150" cy="150" r="4" fill="#E63B2E" className="animate-pulse" />

              {/* Punti di misurazione */}
              <circle className={`laser-point-${index}`} cx="150" cy="50" r="4" fill="#E63B2E" />
              <circle className={`laser-point-${index}`} cx="250" cy="150" r="4" fill="#E63B2E" />
              <circle className={`laser-point-${index}`} cx="150" cy="250" r="4" fill="#E63B2E" />
              <circle className={`laser-point-${index}`} cx="50" cy="150" r="4" fill="#E63B2E" />
            </svg>
          )}
        </div>

      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cards[i + 1],
            end: 'top top',
            pinSpacing: false,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.4,
              filter: 'blur(10px)',
              ease: 'none',
              transformOrigin: 'top center'
            }),
            scrub: true,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocollo" ref={containerRef} className="relative w-full z-20">
      <ProtocolCard
        index={0}
        title={t('prot_1_title')}
        subtitle={t('prot_1_desc')}
        animType="swatches"
      />
      <ProtocolCard
        index={1}
        title={t('prot_2_title')}
        subtitle={t('prot_2_desc')}
        animType="roller"
      />
      <ProtocolCard
        index={2}
        title={t('prot_3_title')}
        subtitle={t('prot_3_desc')}
        animType="precision_grid"
      />
    </section>
  );
};

// ==========================================
// FOOTER COMPONENT
// ==========================================
const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-inchiostro text-calce z-30 pt-32 pb-12 mt-[-5dvh] rounded-t-[4rem] px-6 lg:px-12 border-t border-calce/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16 mb-24">

        <div>
          <h2 className="font-sans font-black text-4xl tracking-tight mb-4">{t('hero_brand')}</h2>
          <p className="font-drama text-lg text-calce/60 max-w-sm">
            {t('foot_desc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 font-sans font-bold text-sm tracking-wide">
          <div className="flex flex-col gap-4">
            <a href="#chisiamo" className="hover:text-accent transition-colors">{t('nav_about')}</a>
            <a href="#servizi" className="hover:text-accent transition-colors">{t('nav_services')}</a>
            <a href="#protocollo" className="hover:text-accent transition-colors">{t('nav_protocol')}</a>
            <a href="#lavori" className="hover:text-accent transition-colors">{t('nav_gallery')}</a>
            <a href="#contatti" className="hover:text-accent transition-colors">{t('nav_contact')}</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-calce/50 hover:text-calce transition-colors">{t('foot_imp')}</a>
            <a href="#" className="text-calce/50 hover:text-calce transition-colors">{t('foot_priv')}</a>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-calce/10 relative">
        <div className="font-mono text-xs text-calce/40 font-bold tracking-widest uppercase">
          {t('foot_rights')}
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// STATS BAR COMPONENT
// ==========================================
const StatsBar = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-inchiostro border-t border-calce/10 relative z-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-calce divide-x divide-calce/10">
        <div className="flex flex-col items-center">
          <p className="font-sans font-black text-6xl text-segnale mb-2 tracking-tighter">34</p>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-calce/50">{t('stat_1')}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-sans font-black text-6xl text-calce mb-2 tracking-tighter">15+</p>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-calce/50">{t('stat_2')}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-sans font-black text-6xl text-calce mb-2 tracking-tighter">5</p>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-calce/50">{t('stat_3')}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-sans font-black text-6xl text-calce mb-2 tracking-tighter">100+</p>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-calce/50">{t('stat_4')}</p>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// ABOUT COMPONENT
// ==========================================
const About = () => {
  const { t } = useLanguage();

  return (
    <section id="chisiamo" className="py-24 lg:py-32 bg-calce relative z-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-sm tracking-widest text-salvia uppercase mb-6 px-4 py-2 border border-salvia/30 bg-salvia/10 rounded-full inline-block">
            {t('about_label')}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-inchiostro mb-8 tracking-tight leading-tight">
            {t('about_title_1')} <br />
            <span className="font-drama italic font-semibold text-ottone">{t('about_title_2')}</span>
          </h2>
          <p className="font-drama text-lg md:text-xl text-inchiostro/80 leading-relaxed mb-10">
            {t('about_desc')}
          </p>

          <div className="flex flex-col gap-4 font-sans font-bold text-sm text-inchiostro">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-salvia flex items-center justify-center">
                <svg className="w-3 h-3 text-calce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="uppercase tracking-wide">{t('about_bullet_1')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-salvia flex items-center justify-center">
                <svg className="w-3 h-3 text-calce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="uppercase tracking-wide">{t('about_bullet_2')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-salvia flex items-center justify-center">
                <svg className="w-3 h-3 text-calce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="uppercase tracking-wide">{t('about_bullet_3')}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-4 bg-inchiostro/5 rounded-[3rem] -z-10 transform translate-x-4 translate-y-4"></div>
          <img
            src="/assets/images/about.jpg"
            alt="Salvo Catanese"
            className="w-full h-auto object-cover rounded-[3rem] shadow-xl border border-inchiostro/5"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop'; }}
          />
        </div>
      </div>
    </section>
  );
};

// ==========================================
// GALLERY COMPONENT
// ==========================================
const Gallery = () => {
  const { t } = useLanguage();
  const images = Array.from({ length: 11 }).map((_, i) => `/assets/images/gallery-${i + 1}.jpg`);
  const videos = Array.from({ length: 5 }).map((_, i) => `/assets/images/video-${i + 1}.mp4`);

  // Interleave: after every 3 photos, insert a video
  const items = [];
  let vIdx = 0;
  images.forEach((img, i) => {
    items.push({ type: 'image', src: img, idx: i });
    if ((i + 1) % 3 === 0 && vIdx < videos.length) {
      items.push({ type: 'video', src: videos[vIdx], idx: vIdx });
      vIdx++;
    }
  });
  // Append remaining videos
  while (vIdx < videos.length) {
    items.push({ type: 'video', src: videos[vIdx], idx: vIdx });
    vIdx++;
  }

  return (
    <section id="lavori" className="py-24 bg-calce border-t border-inchiostro/5 relative z-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-sans font-black text-4xl lg:text-5xl text-inchiostro tracking-tight mb-4">{t('gallery_title')}</h2>
          <p className="font-drama text-lg text-inchiostro/60">{t('gallery_desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[2rem] h-[400px] bg-inchiostro/5">
              {item.type === 'image' ? (
                <>
                  <img
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                    alt={`Lavoro ${item.idx + 1}`}
                  />
                  <div className="absolute inset-0 bg-inchiostro/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// CONTACT COMPONENT
// ==========================================
const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contatti" className="py-24 lg:py-32 bg-inchiostro text-calce relative z-30 px-6 lg:px-12 rounded-t-[4rem] -mb-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-calce/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Contact Info */}
        <div>
          <h2 className="font-sans font-black text-5xl lg:text-6xl text-calce mb-6 tracking-tight">{t('contact_title')}</h2>
          <p className="font-drama text-lg text-calce/60 mb-12 max-w-md">
            {t('contact_desc')}
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-calce/5 border border-calce/10 rounded-full shrink-0">
                <svg className="w-5 h-5 text-segnale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-calce/40 font-bold mb-1">{t('contact_lbl_address')}</p>
                <p className="font-sans font-semibold text-lg">{t('contact_address')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-calce/5 border border-calce/10 rounded-full shrink-0">
                <svg className="w-5 h-5 text-segnale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-calce/40 font-bold mb-1">{t('contact_lbl_phone')}</p>
                <a href="tel:0784044747" className="font-sans font-semibold text-lg text-calce hover:text-segnale transition-colors block">078 404 47 47</a>
                <a href="https://wa.me/41784044747" target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-bold text-[#25D366] hover:underline mt-1 block">{t('contact_wa_link')}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-calce text-inchiostro p-8 md:p-12 rounded-[3rem] shadow-xl">
          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert(t('form_success')); }}>
            <div>
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-inchiostro/50 mb-2 block">{t('form_name')}</label>
              <input type="text" required className="w-full bg-inchiostro/5 border border-inchiostro/10 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-segnale/50" placeholder={t('form_name_ph')} />
            </div>
            <div>
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-inchiostro/50 mb-2 block">{t('form_contact')}</label>
              <input type="text" required className="w-full bg-inchiostro/5 border border-inchiostro/10 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-segnale/50" placeholder={t('form_contact_ph')} />
            </div>
            <div>
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-inchiostro/50 mb-2 block">{t('form_details')}</label>
              <textarea rows="4" required className="w-full bg-inchiostro/5 border border-inchiostro/10 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-segnale/50 resize-none" placeholder={t('form_details_ph')} />
            </div>
            <button type="submit" className="w-full bg-segnale text-white font-sans font-bold py-4 rounded-xl uppercase tracking-wider magnetic-btn group overflow-hidden">
              <span className="relative z-10 transition-colors group-hover:text-inchiostro">{t('form_btn')}</span>
              <span className="absolute inset-0 bg-calce scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// FLOATING WHATSAPP
// ==========================================
const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  return (
    <a
      href="https://wa.me/41784044747"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 border-2 border-[#25D366]"
      aria-label={t('wa_label')}
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.571-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  return (
    <LanguageProvider>
      <div className="w-full min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <StatsBar />
        <About />
        <Philosophy />
        <Protocol />
        <Gallery />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LanguageProvider>
  );
}

export default App;
