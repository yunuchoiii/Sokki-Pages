'use client';

import { useEffect } from 'react';

/** Progressive enhancement: content stays visible without JS or when motion is reduced. */
export default function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      const animations = new Set<Animation>();
      const targets = document.querySelectorAll<HTMLElement>(
        '.hero-content > *, .app-stage, .section-title, .steps article, .features article, .models article, .release-card, .download-section > *'
        // 회의록 섹션은 카드 격자가 아니라 덩어리가 제각각이라 하나씩 적어 준다.
        + ', .meeting-demo, .script-line, .meeting-ways > h3, .way, .meeting-facts article, .limits-head, .limit',
      );
      const reveal = (element: HTMLElement) => {
        const siblings = Array.from(element.parentElement?.children ?? []);
        // 받아 적은 원문은 한 줄씩 내려앉는다. 회의록 목업이 자리잡은 뒤(380ms)에 시작해야
        // 덩어리째 흐려지는 부모 위에서 같이 떠다니지 않는다.
        const line = element.matches('.script-line');
        const stagger = line ? 380 + siblings.indexOf(element) * 90
          : element.matches('article, .way, .limit') ? siblings.indexOf(element) % 3 * 100 : 0;
        const animation = element.animate(line ? [
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ] : [
          { opacity: 0, transform: 'translateY(48px) scale(.96)', filter: 'blur(7px)' },
          { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        ], { duration: line ? 420 : 950, delay: stagger, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
        animations.add(animation);
        animation.onfinish = () => { animations.delete(animation); };
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      targets.forEach(element => observer.observe(element));
      const stage = document.querySelector<HTMLElement>('.app-stage');
      const recording = document.querySelector<HTMLElement>('.record-window');
      const done = document.querySelector<HTMLElement>('.done-window');
      const progress = document.querySelector<HTMLElement>('.scroll-progress');
      let frame = 0;
      const draw = () => {
        frame = 0;
        const range = document.documentElement.scrollHeight - innerHeight;
        if (progress) progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
        if (!stage || !recording || !done) return;
        const rect = stage.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const offset = Math.max(-1, Math.min(1, (innerHeight * .45 - rect.top) / innerHeight));
        const strength = innerWidth < 760 ? 0.35 : 1;
        recording.style.transform = `translateY(${-offset * 26 * strength}px) rotate(${-offset * 3 * strength}deg)`;
        done.style.transform = `translateY(${offset * 24 * strength}px) rotate(${offset * 2 * strength}deg)`;
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      draw();
      dispose = () => {
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        cancelAnimationFrame(frame);
        [recording, done, progress].forEach(element => element?.style.removeProperty('transform'));
      };
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { dispose(); preference.removeEventListener('change', setup); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
