# Инструкция по Развертыванию

## 1. Настройка BotFather

### Шаг 1: Создание бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям:
   - Введите имя бота (например: "Конструктор Договоров")
   - Введите username бота (должен заканчиваться на `bot`, например: `contract_bot`)
4. Сохраните полученный токен бота (формат: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Шаг 2: Создание Mini App

1. Отправьте команду `/newapp` в BotFather
2. Выберите вашего бота из списка
3. Заполните данные:
   - **Title**: Название приложения (например: "Конструктор Договоров")
   - **Short name**: Короткое имя (используется в URL)
   - **Description**: Описание приложения
   - **Photo**: Загрузите иконку 512x512px (PNG)
   - **GIF**: Опционально, анимированная иконка
   - **Web App URL**: URL вашего приложения (см. раздел "Туннель")

### Шаг 3: Настройка команд бота

Отправьте команду `/setcommands` и выберите вашего бота, затем введите:

```
start - Запустить приложение
profile - Открыть профиль
contract - Создать договор
```

## 2. Локальная Разработка с Туннелем

### Вариант 1: ngrok (Рекомендуется)

#### Установка ngrok

**macOS:**
```bash
brew install ngrok
```

**Windows:**
Скачайте с [ngrok.com](https://ngrok.com/download) и распакуйте

**Linux:**
```bash
# Ubuntu/Debian
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin
```

#### Использование

1. Запустите ваше Next.js приложение:
```bash
npm run dev
```

2. В другом терминале запустите ngrok:
```bash
ngrok http 3000
```

3. Скопируйте HTTPS URL (например: `https://abc123.ngrok.io`)

4. Используйте этот URL в BotFather при настройке Mini App

**Важно:** При каждом перезапуске ngrok URL изменится. Для постоянного URL используйте платный план ngrok или другие решения.

### Вариант 2: Cloudflare Tunnel (cloudflared)

#### Установка

**macOS:**
```bash
brew install cloudflared
```

**Другие платформы:**
Скачайте с [developers.cloudflare.com](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

#### Использование

```bash
cloudflared tunnel --url http://localhost:3000
```

Скопируйте полученный HTTPS URL и используйте в BotFather.

### Вариант 3: localtunnel

#### Установка

```bash
npm install -g localtunnel
```

#### Использование

```bash
lt --port 3000
```

## 3. Настройка Переменных Окружения

1. Скопируйте `.env.example` в `.env.local`:
```bash
cp .env.example .env.local
```

2. Откройте `.env.local` и заполните:
```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=ваш_токен_бота
NEXT_PUBLIC_TELEGRAM_WEBAPP_URL=https://ваш-домен.com
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Важно:** Не коммитьте `.env.local` в git (он уже в `.gitignore`)

## 4. Production Развертывание

### Вариант 1: Vercel (Рекомендуется для Next.js)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите в Vercel:
```bash
vercel login
```

3. Разверните проект:
```bash
vercel
```

4. Настройте переменные окружения в панели Vercel:
   - `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`
   - `NEXT_PUBLIC_TELEGRAM_WEBAPP_URL` (ваш Vercel URL)

5. Получите production URL (например: `https://your-app.vercel.app`)

6. Обновите URL в BotFather

### Вариант 2: Railway

1. Зарегистрируйтесь на [railway.app](https://railway.app)
2. Создайте новый проект из GitHub репозитория
3. Настройте переменные окружения
4. Railway автоматически предоставит HTTPS URL
5. Используйте этот URL в BotFather

### Вариант 3: Render

1. Зарегистрируйтесь на [render.com](https://render.com)
2. Создайте новый Web Service
3. Подключите GitHub репозиторий
4. Настройте:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Добавьте переменные окружения
6. Получите URL и обновите в BotFather

### Вариант 4: DigitalOcean App Platform

1. Создайте аккаунт на DigitalOcean
2. Создайте новый App
3. Подключите репозиторий
4. Настройте переменные окружения
5. Разверните приложение

## 5. Проверка Работы

1. Откройте Telegram
2. Найдите вашего бота
3. Отправьте команду `/start`
4. Нажмите на кнопку Mini App (если настроена)
5. Приложение должно открыться в Telegram

## 6. Troubleshooting

### Проблема: Mini App не открывается

**Решение:**
- Убедитесь, что URL использует HTTPS (обязательно!)
- Проверьте, что приложение доступно по указанному URL
- Убедитесь, что в BotFather указан правильный URL

### Проблема: Ошибка CORS

**Решение:**
- Убедитесь, что приложение работает на HTTPS
- Проверьте настройки Next.js для CORS (если используете API routes)

### Проблема: Telegram WebApp SDK не загружается

**Решение:**
- Проверьте, что скрипт Telegram добавлен в `layout.tsx`
- Убедитесь, что приложение открывается внутри Telegram (не в браузере)

### Проблема: Туннель не работает

**Решение:**
- Проверьте, что локальный сервер запущен на порту 3000
- Убедитесь, что порт не заблокирован файрволом
- Попробуйте другой туннель (ngrok, cloudflared, localtunnel)

## 7. Обновление URL в BotFather

Если вы изменили URL приложения:

1. Откройте BotFather
2. Отправьте `/myapps`
3. Выберите ваше приложение
4. Выберите "Edit" → "Web App URL"
5. Введите новый URL

## 8. Безопасность

⚠️ **Важно:**
- Никогда не коммитьте токен бота в git
- Используйте переменные окружения для всех секретов
- Включите HTTPS для production
- Регулярно обновляйте зависимости

## 9. Мониторинг

Рекомендуется настроить:
- Логирование ошибок (Sentry, LogRocket)
- Мониторинг производительности
- Аналитика использования (Telegram Analytics)

---

**Готово!** Ваше приложение должно работать в Telegram Mini App.
