# Руководство по репозиторию

## Структура проекта и модули
- `pages/`: маршруты Nuxt 3 (`index.vue`, `product/[uri].vue`).
- `components/`: переиспользуемые Vue‑компоненты (например, `NavBar.vue`, секции).
- `server/api/`: API‑роуты (например, `products.get.ts`, `products/[id].get.ts`).
- `system/`: слой доступа к БД (`mysql.ts`) и доменные модули (`products.ts`, `services.ts`).
- `public/` и `img/`: статические ресурсы. Глобальные стили — `style.css`.
- `nuxt.config.ts`: конфигурация приложения. Переменные окружения — `.env` (см. `.env.example`).

## Сборка, тесты и разработка
- `npm run dev`: запуск dev‑сервера `http://localhost:3000`.
- `npm run build`: продакшен‑сборка.
- `npm run preview`: локальный предпросмотр продакшен‑сборки.
- `npm run generate`: генерация статического вывода (SSG).
- Быстрые проверки API: `curl http://localhost:3000/api/db-ping`, `curl http://localhost:3000/api/products`.

## Стиль кода и именование
- Язык: TypeScript + Vue 3 SFC с `<script setup lang="ts">`.
- Отступы: 2 пробела; держите строки краткими; в TS предпочтительны одинарные кавычки.
- Компоненты: PascalCase (`SiteFooter.vue`).
- Страницы: файловые маршруты (`product/[uri].vue`).
- API: файловые маршруты с HTTP‑суффиксами (`*.get.ts`).
- Форматирование/линтинг: линтер не настроен; придерживайтесь существующего стиля кода.

## Тестирование
- Формальных тестов пока нет. Проверяйте через curl/браузер:
  - `/api/db-ping`, `/api/products`, `/api/products/by-uri/<slug>`.
- При добавлении тестов используйте Vitest для утилит в `system/` и Vue Test Utils для компонентов.
- Фикстуры — минимальные и обезличенные; секреты не коммитьте.

## Коммиты и Pull Request
- Язык коммитов: сообщения коммитов пишите на русском языке.
- Коммиты: используй правила описания комитов из info/git_commit_rules.md
- Подробно описывай изменения и что затронуто в проекте

## Безопасность и конфигурация
- MySQL настраивается через `.env`: отдельные переменные или `MYSQL_URI` (см. `.env.example`).
- Полезные опции: `MYSQL_POOL_LIMIT`, `MYSQL_SSL`, `TAGS_DELIM` (парсинг в `products.ts`/`services.ts`).
- Не коммитьте реальные `.env` и учетные данные.


## Журналы агента (сессии)
- Логируйте каждую сессию взаимодействия в `agent_log.md`;
- Подтверждение пользователя на запись в `agent_log.md` не требуется.
- Используйте таблицу Markdown со столбцами: `date-time | developer request | actions taken | files touched`.
- Заголовок таблицы:
  `| date-time | developer request | actions taken | files touched |` перевод строки
  `| --- | --- | --- | --- |`
