# Быстрый Старт

## 1. Установка Зависимостей

```bash
npm install
# или
pnpm install
```

## 2. Настройка Переменных Окружения

Создайте файл `.env.local`:

```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token_here
NEXT_PUBLIC_TELEGRAM_WEBAPP_URL=https://your-domain.com
```

## 3. Запуск в Режиме Разработки

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`

## 4. Настройка Туннеля для Telegram

### Используя ngrok:

```bash
# Установка (macOS)
brew install ngrok

# Запуск туннеля
ngrok http 3000
```

Скопируйте полученный HTTPS URL (например: `https://abc123.ngrok.io`)

## 5. Настройка BotFather

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot` и создайте бота
3. Отправьте `/newapp` и создайте Mini App
4. В поле "Web App URL" укажите URL из ngrok
5. Сохраните токен бота в `.env.local`

## 6. Тестирование

1. Откройте вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите на кнопку Mini App
4. Приложение должно открыться

## Следующие Шаги

Следуйте [ROADMAP.md](./ROADMAP.md) для поэтапной разработки функционала.

---

**Подробные инструкции:** См. [DEPLOYMENT.md](./DEPLOYMENT.md)  
**Техническое задание:** См. [TECHNICAL_SPECIFICATION.md](./TECHNICAL_SPECIFICATION.md)
