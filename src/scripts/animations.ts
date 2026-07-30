import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface AnimationOptions {
  scope?: Element | null;
}

export function initHeroAnimation(options: AnimationOptions = {}) {
  const scope = options.scope || document;
  if (prefersReducedMotion) {
    const heroText = scope.querySelectorAll<HTMLElement>('[data-hero-reveal]');
    gsap.set(heroText, { opacity: 1, y: 0 });

    const allHero = scope.querySelectorAll<HTMLElement>('[data-hero-word], [data-hero-sub], [data-hero-cta]');
    gsap.set(allHero, { opacity: 1, y: 0, rotateX: 0 });
    return;
  }

  const heroWords = scope.querySelectorAll<HTMLElement>('[data-hero-word]');
  const heroSub = scope.querySelector<HTMLElement>('[data-hero-sub]');
  const heroCta = scope.querySelector<HTMLElement>('[data-hero-cta]');

  if (heroWords.length === 0) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.set(heroWords, { y: 80, opacity: 0, rotateX: -15 })
    .to(heroWords, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.08,
    });

  if (heroSub) {
    tl.fromTo(
      heroSub,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    );
  }

  if (heroCta) {
    tl.fromTo(
      heroCta,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );
  }

  // Subtle parallax on hero section
  const heroSection = scope.querySelector<HTMLElement>('[data-section="hero"]');
  if (heroSection) {
    const heroInner = heroSection.querySelector<HTMLElement>('.hero-inner');
    if (heroInner) {
      gsap.to(heroInner, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }
}

export function initFeelingListAnimation(options: AnimationOptions = {}) {
  const scope = options.scope || document;
  if (prefersReducedMotion) {
    gsap.set(scope.querySelectorAll('[data-feeling-item]'), { opacity: 1, y: 0 });
    return;
  }

  const items = scope.querySelectorAll<HTMLElement>('[data-feeling-item]');
  items.forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=80px',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

export function initProjectCardsAnimation(options: AnimationOptions = {}) {
  const scope = options.scope || document;
  if (prefersReducedMotion) {
    gsap.set(scope.querySelectorAll('[data-project-card]'), { opacity: 1, y: 0 });
    return;
  }

  const cards = scope.querySelectorAll<HTMLElement>('[data-project-card]');
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=60px',
          toggleActions: 'play none none none',
        },
      }
    );

    // Subtle hover lift
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)', duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3 });
    });
  });
}

export function initTimelineAnimation(options: AnimationOptions = {}) {
  const scope = options.scope || document;
  if (prefersReducedMotion) {
    gsap.set(scope.querySelectorAll('[data-timeline-item]'), { opacity: 1, x: 0 });
    const line = scope.querySelector<HTMLElement>('[data-timeline-line]');
    if (line) gsap.set(line, { scaleY: 1 });
    return;
  }

  const items = scope.querySelectorAll<HTMLElement>('[data-timeline-item]');
  const line = scope.querySelector<HTMLElement>('[data-timeline-line]');

  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: scope.querySelector('[data-section="journey"]'),
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      }
    );
  }

  items.forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=50px',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

export function initCoursesAnimation(options: AnimationOptions = {}) {
  const scope = options.scope || document;
  if (prefersReducedMotion) {
    gsap.set(scope.querySelectorAll('[data-course-card]'), { opacity: 1, y: 0 });
    return;
  }

  const cards = scope.querySelectorAll<HTMLElement>('[data-course-card]');
  if (cards.length === 0) return;

  gsap.fromTo(
    cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.querySelector('[data-section="courses"]'),
        start: 'top bottom-=60px',
        toggleActions: 'play none none none',
      },
    }
  );
}

export function initContactAnimation(options: AnimationOptions = {}) {
  const scope = options.scope || document;
  if (prefersReducedMotion) {
    gsap.set(scope.querySelectorAll('[data-contact-reveal]'), { opacity: 1, y: 0 });
    return;
  }

  const elements = scope.querySelectorAll<HTMLElement>('[data-contact-reveal]');
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.querySelector('[data-section="contact"]'),
        start: 'top bottom-=40px',
        toggleActions: 'play none none none',
      },
    }
  );
}

export function initAll(options: AnimationOptions = {}) {
  initHeroAnimation(options);
  initFeelingListAnimation(options);
  initProjectCardsAnimation(options);
  initTimelineAnimation(options);
  initCoursesAnimation(options);
  initContactAnimation(options);

  // Refresh ScrollTrigger after a short delay to ensure layout is settled
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

// Self-execute when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAll());
} else {
  initAll();
}
