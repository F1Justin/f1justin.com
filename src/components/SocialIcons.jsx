import React from 'react';
import { Tv } from 'lucide-react';

export default function SocialIcons() {
  return (
    <div className="social-links">
      <a href="https://github.com/F1Justin" target="_blank" title="GitHub" className="social-link">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        <span>GitHub</span>
      </a>
      <a href="https://x.com/WV6LS" target="_blank" title="Twitter" className="social-link">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4l11.7 16h4.3L8.3 4H4z" />
          <path d="M20 4 4 20" />
        </svg>
        <span>Twitter</span>
      </a>
      <a href="https://space.bilibili.com/82513053" target="_blank" title="Bilibili" className="social-link">
        <Tv size={24} />
        <span>Bilibili</span>
      </a>
    </div>
  );
} 
