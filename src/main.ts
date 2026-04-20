type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme') as Theme;
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function init(): void {
  applyTheme(getPreferredTheme());

  const btn = document.getElementById('themeToggle');
  btn?.addEventListener('click', toggleTheme);

  // Keep in sync if system preference changes and user hasn't set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
