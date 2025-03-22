import React from 'react';
import { Github, Twitter, Tv } from 'lucide-react';

export default function SocialIcons() {
  return (
    <div className="social-links">
      <a href="https://github.com/F1Justin" target="_blank" title="GitHub" className="social-link">
        <Github size={24} />
        <span>GitHub</span>
      </a>
      <a href="https://x.com/WV6LS" target="_blank" title="Twitter" className="social-link">
        <Twitter size={24} />
        <span>Twitter</span>
      </a>
      <a href="https://space.bilibili.com/82513053" target="_blank" title="Bilibili" className="social-link">
        <Tv size={24} />
        <span>Bilibili</span>
      </a>
    </div>
  );
} 