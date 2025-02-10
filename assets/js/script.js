document.addEventListener('DOMContentLoaded', () => {
  // 根据系统设置或本地存储的偏好设置来应用主题
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.body.setAttribute('data-theme', theme);
  updateThemeToggle(theme);
  
  // 初始化 Lucide 图标
  lucide.createIcons();
});

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
  const button = document.querySelector('.theme-toggle');
  button.textContent = theme === 'dark' ? '☀️' : '🌙';
}
