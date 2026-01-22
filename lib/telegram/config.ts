/**
 * Конфигурация Telegram WebApp SDK
 * Инициализация и настройка интеграции с Telegram
 */

// Telegram WebApp SDK загружается через script tag в layout.tsx

export interface TelegramConfig {
  botToken?: string;
  webAppUrl?: string;
}

/**
 * Инициализация Telegram WebApp
 * Вызывается в корневом layout приложения
 */
export function initTelegramWebApp() {
  if (typeof window !== 'undefined') {
    // Telegram WebApp SDK автоматически инициализируется при загрузке
    // Дополнительная настройка может быть добавлена здесь
  }
}

/**
 * Получение данных пользователя из Telegram
 */
export function getTelegramUser() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    return webApp.initDataUnsafe?.user;
  }
  return null;
}

/**
 * Получение темы Telegram (светлая/темная)
 */
export function getTelegramTheme() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    return {
      colorScheme: webApp.colorScheme,
      themeParams: webApp.themeParams,
    };
  }
  return {
    colorScheme: 'light' as const,
    themeParams: {},
  };
}

/**
 * Расширение Window для TypeScript
 */
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
      };
    };
  }
}
