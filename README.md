```markdown
# Project Management Systems Avito

Пример мини-системы управления проектами: фронтенд (Vite + React + TS) и бэкенд (Go + Gin). Данный README описывает, как запустить проект локально и в Docker.

---

## Содержание
- [Технологии](#технологии)
- [Локальный запуск](#локальный-запуск)
  - [Сервер](#сервер)
  - [Клиент](#клиент)
- [Запуск через Docker Compose](#запуск-чрез-docker-compose)
  - [Требования](#требования)
  - [Сборка и запуск](#сборка-и-запуск)
  - [Проверка работы](#проверка-работы)
- [Структура проекта](#структура-проекта)
- [Контакты](#контакты)

---

## Технологии

- **Go** (1.20+), Gin Gonic – серверная часть, REST API
- **SQLite** – база данных
- **Node.js** (v20), React, TypeScript, Vite – фронтенд
- **Docker** + **docker-compose** – контейнеризация
- **Nginx** – для статической выдачи собранного фронтенда

---

## Локальный запуск

### Сервер

1. Установите Go (1.20 или новее).
2. Перейдите в папку `server`:
   ```bash
   cd server
   ```
3. Установите зависимости:
   ```bash
   go mod download
   ```
4. Запустите:
   ```bash
   go run ./cmd/service/main.go
   ```
   По умолчанию сервер слушает **порт 8080**.

### Клиент

1. Установите Node.js (v20 или новее).
2. Перейдите в папку `client`:
   ```bash
   cd client
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Запустите dev-сервер (Vite):
   ```bash
   npm run dev
   ```

---

## Запуск через Docker Compose

### Требования
- **Docker** (версия 20.10+)
- **Docker Compose** (v2 или встроенный в Docker Desktop)

### Сборка и запуск
В корне проекта (где лежит `docker-compose.yml`) выполните:
```bash
docker-compose up --build
```
Docker соберёт два контейнера:
1. **server** (Go, SQLite) – слушает порт **8080** внутри контейнера, мапится наружу как `localhost:8080`.
2. **client** (Vite/React, развёрнутый на Nginx) – слушает 80 внутри контейнера, мапится наружу как `localhost:3000`.

### Проверка работы
- Откройте **http://localhost:3000** – вы увидите фронтенд-приложение.
- Сервер доступен по **http://localhost:8080** (и API `http://localhost:8080/api/v1/...`).

Чтобы остановить контейнеры:
```bash
docker-compose down
```

---

## Структура проекта

```
ProjectManagementSystemsAvito/
  ├─ server/
  │   ├─ cmd/
  │   │   └─ service/
  │   │       └─ main.go
  │   ├─ go.mod
  │   ├─ go.sum
  │   └─ Dockerfile
  ├─ client/
  │   ├─ src/
  │   ├─ package.json
  │   ├─ tsconfig.json
  │   └─ Dockerfile
  ├─ docker-compose.yml
  └─ README.md
```

---
