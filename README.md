# TaskOrbit

Функциональное веб-приложение для управления списком дел на React 18 + Vite.

## Технологии

- React 18 (функциональные компоненты)
- React Router v6
- Zustand
- CSS Modules
- Framer Motion
- JSON Server (mock API)

## Запуск проекта

1. Установите зависимости:

```
npm install
```

2. Запустите JSON Server:

```
npm run server
```

3. В другом терминале запустите Vite:

```
npm run dev
```

При необходимости можно изменить адрес API в `.env` (пример — `.env.example`).

## Особенности

- Custom Hook `useLocalStorage` для сохранения фильтра и сортировки.
- Анимации списка через Framer Motion.
- Оптимизация рендеринга с `useMemo` и `useCallback`.
- Чистая компонентная декомпозиция.

## Деплой

- Vercel: импортируйте репозиторий, выберите команду сборки `npm run build` и каталог `dist`.
- Netlify: в настройках сборки укажите команду `npm run build` и каталог `dist`.
