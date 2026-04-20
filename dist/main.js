"use strict";
const STORAGE_KEY = 'portfolio-theme';
function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark')
        return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
}
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
}
function init() {
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
//# sourceMappingURL=main.js.map