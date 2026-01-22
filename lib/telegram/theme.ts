/**
 * Утилиты для работы с темой Telegram
 * Адаптация цветов приложения под тему Telegram
 */

import { getTelegramTheme } from './config';

/**
 * Применение темы Telegram к CSS переменным
 */
export function applyTelegramTheme() {
  if (typeof window === 'undefined') return;

  const theme = getTelegramTheme();
  const root = document.documentElement;

  if (theme.themeParams) {
    // Применяем цвета Telegram к CSS переменным
    if (theme.themeParams.bg_color) {
      root.style.setProperty('--telegram-bg-color', theme.themeParams.bg_color);
    }
    if (theme.themeParams.text_color) {
      root.style.setProperty('--telegram-text-color', theme.themeParams.text_color);
    }
    if (theme.themeParams.hint_color) {
      root.style.setProperty('--telegram-hint-color', theme.themeParams.hint_color);
    }
    if (theme.themeParams.link_color) {
      root.style.setProperty('--telegram-link-color', theme.themeParams.link_color);
    }
    if (theme.themeParams.button_color) {
      root.style.setProperty('--telegram-button-color', theme.themeParams.button_color);
    }
    if (theme.themeParams.button_text_color) {
      root.style.setProperty('--telegram-button-text-color', theme.themeParams.button_text_color);
    }
    if (theme.themeParams.secondary_bg_color) {
      root.style.setProperty('--telegram-secondary-bg-color', theme.themeParams.secondary_bg_color);
    }
  }

  // Устанавливаем класс темы
  root.classList.toggle('dark', theme.colorScheme === 'dark');
}

/**
 * Конвертация hex цвета в HSL для Tailwind
 */
export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
      default:
        h = 0;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
