# Структура Проекта

```
TG/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Корневой layout с Telegram SDK
│   ├── page.tsx                 # Главная страница
│   ├── globals.css              # Глобальные стили + Telegram тема
│   ├── profile/                 # Страница профиля (TODO)
│   │   └── page.tsx
│   └── contract/                # Конструктор договоров (TODO)
│       └── page.tsx
│
├── components/                   # React компоненты
│   ├── ui/                      # Shadcn/UI компоненты
│   │   └── button.tsx          # Базовая кнопка
│   ├── telegram/                # Telegram интеграция
│   │   └── TelegramProvider.tsx # Провайдер для инициализации
│   ├── profile/                 # Компоненты профиля (TODO)
│   ├── contract/                # Компоненты конструктора (TODO)
│   └── pdf/                     # PDF компоненты (TODO)
│
├── lib/                         # Утилиты и хелперы
│   ├── db/                      # IndexedDB (Dexie)
│   │   └── database.ts         # Схема БД и методы работы
│   ├── telegram/                # Telegram SDK утилиты
│   │   ├── config.ts           # Конфигурация и инициализация
│   │   └── theme.ts             # Работа с темой Telegram
│   ├── pdf/                     # PDF генерация
│   │   └── generator.ts        # Генерация PDF с подписью
│   ├── parser/                  # Парсер реквизитов
│   │   └── counterparty.ts    # Парсинг данных контрагента
│   └── utils.ts                 # Общие утилиты (cn для классов)
│
├── types/                       # TypeScript типы
│   └── index.ts                # Экспорт всех типов
│
├── hooks/                       # Custom React hooks (TODO)
│   ├── useProfile.ts
│   ├── useTemplate.ts
│   ├── useCounterparty.ts
│   └── usePDF.ts
│
├── store/                       # Zustand store (TODO)
│   └── index.ts
│
├── public/                      # Статические файлы
│
├── .env.example                 # Пример переменных окружения
├── .gitignore                   # Git ignore правила
├── components.json              # Конфигурация Shadcn/UI
├── next.config.js               # Конфигурация Next.js
├── package.json                 # Зависимости проекта
├── postcss.config.js            # PostCSS конфигурация
├── tailwind.config.ts           # Tailwind CSS конфигурация
├── tsconfig.json                # TypeScript конфигурация
│
├── README.md                    # Основная документация
├── QUICK_START.md               # Быстрый старт
├── TECHNICAL_SPECIFICATION.md   # Техническое задание
├── ROADMAP.md                   # Поэтапный план разработки
├── DEPLOYMENT.md                # Инструкции по развертыванию
└── PROJECT_STRUCTURE.md         # Этот файл
```

## Описание Основных Папок

### `/app`
Next.js 14 App Router. Содержит страницы и layouts приложения.

### `/components`
React компоненты, разделенные по функциональности:
- `ui/` - базовые UI компоненты из Shadcn/UI
- `telegram/` - компоненты для работы с Telegram
- `profile/` - компоненты профиля пользователя
- `contract/` - компоненты конструктора договоров
- `pdf/` - компоненты для работы с PDF

### `/lib`
Утилиты и бизнес-логика:
- `db/` - работа с IndexedDB через Dexie
- `telegram/` - интеграция с Telegram WebApp SDK
- `pdf/` - генерация PDF документов
- `parser/` - парсинг реквизитов из текста

### `/types`
TypeScript типы и интерфейсы для всего приложения.

### `/hooks` (TODO)
Custom React hooks для переиспользования логики.

### `/store` (TODO)
Zustand store для глобального состояния.

## Ключевые Файлы

### `lib/db/database.ts`
Схема IndexedDB базы данных и методы для работы с:
- Профилями пользователей
- Шаблонами договоров
- Созданными договорами
- Контрагентами

### `lib/pdf/generator.ts`
Генерация PDF документов:
- Подстановка данных в шаблоны
- Наложение подписи
- Экспорт и скачивание

### `lib/parser/counterparty.ts`
Парсинг реквизитов контрагента из текста:
- ИНН, ОГРН
- Наименование
- Адреса
- Банковские реквизиты

### `lib/telegram/config.ts` и `theme.ts`
Интеграция с Telegram WebApp SDK:
- Инициализация
- Получение данных пользователя
- Применение темы Telegram

## Следующие Шаги

1. Создайте недостающие компоненты согласно ROADMAP.md
2. Реализуйте функционал поэтапно
3. Тестируйте каждый этап перед переходом к следующему
