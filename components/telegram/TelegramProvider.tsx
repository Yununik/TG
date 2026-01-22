'use client';

import { useEffect } from 'react';
import { initTelegramWebApp } from '@/lib/telegram/config';
import { applyTelegramTheme } from '@/lib/telegram/theme';

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Инициализация Telegram WebApp
    initTelegramWebApp();
    
    // Применение темы Telegram
    applyTelegramTheme();

    // Расширение приложения на весь экран
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      webApp.expand();
    }
  }, []);

  return <>{children}</>;
}
