# Car Management Project

## Обзор

Car Management Project - это веб-приложение, которое позволяет пользователям управлять своими автомобилями через личный кабинет. Оно создано с помощью Django REST Framework на бекенде и React на фронтенде. Пользователи могут входить в личный кабинет, выходить, управлять своими автомобилями. Аутентификация на основе JWT гарантирует безопасный доступ к приложению.

---

## Функционал

- **Аутентификация пользователя**:
  - Безопасный вход в систему с использованием JWT токенов.
  - Возможность выхода из системы.
- **Управление автомобилями**:
  - Добавление, редактирование, удаление и просмотр автомобилей.
  - Автомобили привязаны к залогиненному пользователю (владельцу).
- **Профиль пользователя**:
  - Просмотр деталей пользователя (имя пользователя, email).
  - Управление персональным списком автомобилей.
- **Адаптивный дизайн**:
  - Удобный интерфейс с использованием CSS.

---

## Технологии

- **Бэкенд**: Django REST Framework
- **Фронтенд**: React.js (версия 6)
- **Аутентификация**: JWT (JSON Web Tokens)
- **База данных**: SQLite (по умолчанию в Django)

---

## Установка и настройка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/genpoplevin/Test-case-car-management.git
   cd Test-case-car-management
2. Настройте бэкенд:
   ``` bash
    cd backend
    python -m venv venv
    source venv/bin/activate   # В Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser --username "admin" --email "admin@admin.com"
    python manage.py runserver
3. Настройте фронтенд:
   ```bash
   cd ..
   cd frontend
   npm install
   npm start
4. Перейдите к приложению по адресу http://localhost:3000.

---
## Эндпоинты
**Аутентификация**
  - POST /api/token/
   ```
    Получение JWT токенов доступа и обновления.
    Запрос: { "username": "user", "password": "pass" }
    Ответ: { "access": "jwt_token", "refresh": "jwt_refresh_token" }
   ```

  - POST /api/token/refresh/
   ```
   Обновление токена доступа с использованием refresh токена.
   Запрос: { "refresh": "jwt_refresh_token" }
   Ответ: { "access": "new_jwt_token" }
   ```
---

**Профиль пользователя**
  - GET /api/profile/
   ```
   Получение деталей профиля залогиненного пользователя.
   Ответ: { "username": "user", "email": "user@example.com" }
   ```

---

**Автомобили**
- GET /api/cars/
  ```
  Получение списка автомобилей, принадлежащих залогиненному пользователю.
  Ответ:
  ```
```bash
[
  { "id": 1, "make": "Toyota", "model": "Corolla", "year": 2020, "color": "Blue", "owner": 1 },
  { "id": 2, "make": "Honda", "model": "Civic", "year": 2021, "color": "Red", "owner": 1 }
]
```

- POST /api/cars/
Добавление нового автомобиля.
Запрос:
```bash
{ "make": "Ford", "model": "Focus", "year": 2019, "color": "White" }
```
Ответ:
```bash
{ "id": 3, "make": "Ford", "model": "Focus", "year": 2019, "color": "White", "owner": 1 }
```
- PUT /api/cars/:id/
Обновление информации об автомобиле.
Запрос:
```bash
{ "make": "Ford", "model": "Fusion", "year": 2020, "color": "Black" }

```
Ответ:
```bash
{ "id": 3, "make": "Ford", "model": "Fusion", "year": 2020, "color": "Black", "owner": 1 }

```
- DELETE /api/cars/:id/
Удаление автомобиля.
Ответ:
```bash
{ "message": "Автомобиль успешно удалён." }

```
---
## Страницы
1. **Страница входа**:

    - Позволяет пользователям войти в систему, используя свои учетные данные.
    - Перенаправляет на страницу профиля после успешного входа.
2. **Страница профиля**:

    - Отображает информацию о пользователе (имя пользователя, email).
    - Список автомобилей пользователя с возможностью добавления, редактирования и удаления.
3. **Страница списка автомобилей**:

    - Отображает полный список автомобилей, принадлежащих залогиненному пользователю.

---

## Контакты
- Telegram: t.me/genpoplevin
- Email: 79530088804@yandex.ru
- Phone: +79530088804
