# ⚡ Быстрая настройка сервера на Timeweb

## 🎯 Краткая инструкция (для тех, кто хочет быстро)

Это краткая версия. Подробная инструкция в файле `TIMEWEB_SERVER_SETUP.md`.

---

## 📋 Быстрый чек-лист

### 1. Создать VPS на Timeweb
- [ ] Зайти на https://timeweb.com
- [ ] Создать VPS (Ubuntu 22.04, минимальный тариф)
- [ ] Сохранить IP адрес, логин (root) и пароль

### 2. Подключиться к серверу
```bash
ssh root@ТВОЙ_IP_АДРЕС
```

### 3. Установить все программы (скопируй и выполни все команды подряд)

```bash
# Обновить систему
apt update && apt upgrade -y

# Установить Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20

# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Установить Git (если не установлен)
apt install git -y

# Создать папку для проекта
mkdir -p /var/www/telegram-bot
cd /var/www/telegram-bot
```

### 4. Запустить базу данных
```bash
# Запустить PostgreSQL
docker run --name telegram-bot-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  -d \
  --restart unless-stopped \
  postgres

# Создать базу данных
docker exec -it telegram-bot-db psql -U postgres -c "CREATE DATABASE telegram_bot;"
```

### 5. Создать SSH ключи для GitHub Actions
```bash
# Создать ключи
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions -N ""

# Добавить публичный ключ
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Показать приватный ключ (СКОПИРУЙ ЕГО!)
cat ~/.ssh/github_actions
```

### 6. Настроить GitHub Secrets
- [ ] Открыть репозиторий на GitHub
- [ ] Settings → Secrets and variables → Actions
- [ ] Добавить секреты:
  - `SERVER_HOST` = IP адрес сервера
  - `SERVER_USER` = `root`
  - `SERVER_SSH_KEY` = приватный SSH ключ (из шага 5)

---

## ✅ Готово!

После выполнения всех шагов:
1. Напиши мне "готово"
2. Я проверю настройки
3. Мы протестируем автоматический деплой
4. Начнем создавать бота!

---

## 🆘 Проблемы?

Если что-то не работает - смотри подробную инструкцию в `TIMEWEB_SERVER_SETUP.md` или спрашивай меня!
