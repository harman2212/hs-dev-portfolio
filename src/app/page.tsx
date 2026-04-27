'use client'

import { Navbar } from "@/components/portfolio/Navbar"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Skills } from "@/components/portfolio/Skills"
import { Projects } from "@/components/portfolio/Projects"
import { Contact } from "@/components/portfolio/Contact"
import { Footer } from "@/components/portfolio/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1" id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />

      {/* Visitor Tracker Script - runs silently in background */}
      <script dangerouslySetInnerHTML={{ __html: trackerScript() }} />
    </div>
  )
}

function trackerScript() {
  return `
    (function() {
      function getFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('fp', 2, 15);
        const data = canvas.toDataURL();
        const nav = navigator;
        const screen = window.screen;
        const raw = [
          nav.userAgent,
          nav.language,
          screen.width + 'x' + screen.height,
          screen.colorDepth,
          new Date().getTimezoneOffset(),
          nav.hardwareConcurrency || '',
          nav.platform || '',
          data
        ].join('|||');
        let hash = 0;
        for (let i = 0; i < raw.length; i++) {
          const char = raw.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return 'fp_' + Math.abs(hash).toString(36);
      }

      function parseUA(ua) {
        let browser = 'Unknown';
        let os = 'Unknown';
        let device = 'Desktop';
        if (ua.includes('Edg/')) browser = 'Edge';
        else if (ua.includes('Chrome/')) browser = 'Chrome';
        else if (ua.includes('Firefox/')) browser = 'Firefox';
        else if (ua.includes('Safari/')) browser = 'Safari';
        if (ua.includes('Windows')) os = 'Windows';
        else if (ua.includes('Mac OS')) os = 'macOS';
        else if (ua.includes('Linux')) os = 'Linux';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
        if (/Mobi|Android|iPhone/i.test(ua)) device = 'Mobile';
        else if (/iPad|Tablet/i.test(ua)) device = 'Tablet';
        return { browser, os, device };
      }

      const fp = getFingerprint();
      const ua = parseUA(navigator.userAgent);
      const sessionId = sessionStorage.getItem('analyticsSession') || ('sess_' + Math.random().toString(36).slice(2));
      sessionStorage.setItem('analyticsSession', sessionId);

      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fingerprint: fp,
          userAgent: navigator.userAgent,
          browser: ua.browser,
          os: ua.os,
          device: ua.device,
          language: navigator.language,
          screenRes: screen.width + 'x' + screen.height,
          referrer: document.referrer || null,
          sessionId: sessionId,
          page: window.location.pathname,
        })
      }).catch(function() {});
    })();
  `
}
