# 🛠️ Sanplast - Sitio Web Corporativo

Este proyecto es el sitio web oficial de **Sanplast**, una empresa especializada en soluciones de almacenamiento de agua mediante tanques de polietileno de alta calidad.

## 🚀 Tecnologías utilizadas

### Frontend
- ⚡️ [Astro](https://astro.build/) - Framework rápido y moderno para sitios estáticos.
- 🌐 HTML5 + CSS3 (Responsive)
- 📱 Diseño totalmente adaptado para móviles

### Backend
- 🧰 [Laravel](https://laravel.com/) - Framework PHP para el backend/API REST
- 🔐 Laravel Starter Kit con autenticación
- 📦 API REST para consumir desde el frontend en caso de ser necesario

## 📁 Estructura del proyecto

```bash
sanplast/
├── public/            # Imágenes y assets accesibles directamente
├── src/
│   └── pages/         # Páginas Astro (index.astro, productos.astro, etc)
├── app/               # Laravel (backend)
│   ├── Http/
│   └── Models/
├── routes/
│   └── api.php        # Rutas de la API
├── database/          # Migraciones y seeders
├── resources/
│   └── views/         # Blade (si se usa para administración u otra parte)
├── .env               # Variables de entorno Laravel
├── composer.json      # Dependencias backend
└── README.md          # Este archivo
```

## 🔧 Instalación del proyecto

### Frontend (Astro)
```bash
cd sanplast-astro
npm install
npm run dev
```

### Backend (Laravel API)
```bash
cd sanplast-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

> Asegúrate de que el backend esté sirviendo la API en `http://localhost:8000/api` y que el frontend lo consuma correctamente.

## 🌍 Rutas disponibles

### Frontend
- `/` - Página de inicio
- `/productos` - Catálogo de tanques
- `/nosotros` - Información de la empresa
- `/contacto` - Datos de contacto

### Backend API (ejemplo)
- `GET /api/productos` - Lista de productos
- `POST /api/contacto` - Envío de mensaje de contacto

## 📦 Laravel Starter Kit
Este proyecto usa [Laravel Breeze](https://laravel.com/docs/starter-kits) como punto de partida para autenticación sencilla:

```bash
composer require laravel/breeze --dev
php artisan breeze:install api
npm install && npm run dev
php artisan migrate
```

## 🙌 Contribuciones
¡Las contribuciones son bienvenidas! Podés enviar un PR o abrir un issue.

---

Desarrollado con ❤️ por el equipo de **Sanplast**
