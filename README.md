# Propital Client

Este proyecto es una aplicación de React construida con Vite que utiliza autenticación JWT para gestionar el acceso y permisos de usuario. Cuenta con rutas protegidas para ingresar a una lista de notificaciones  guardadas en una DB en la nube, creación de usuarios, y administración de roles como "Super Usuario". El token de autenticación se almacena en `sessionStorage` para un acceso rápido en otras partes de la aplicación. La aplicación utiliza TailwindCSS para el estilo y Axios para la comunicación con la API backend.

## Estructura de Carpetas

La estructura de carpetas sigue una organización modular para facilitar la escalabilidad del proyecto:

- `/components`: Componentes reutilizables.
- `/context`: Almacena el `AuthContext` y otros contextos globales.
- `/pages`: Páginas de la aplicación, como `Login`, `Register`, y `Home`.
- `/services`: Contiene la configuración y servicios de Axios para realizar solicitudes HTTP.

## Características

- **Autenticación JWT**: Gestión de usuarios con tokens de autenticación almacenados en `sessionStorage`.
- **Rutas Protegidas**: Asegura que las rutas sensibles solo estén accesibles para usuarios autenticados.
- **Permisos de Usuario**: Control de acceso según roles, como `Super Usuario`.
- **Formulario de Registro y Login**: Formularios validados con `react-hook-form` y `zod`.
- **Notificaciones y Mensajes**: Soporte de notificaciones con `react-toastify`.

## Tecnologías

- **React 18**: Librería de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **Tailwind CSS**: Framework de CSS para el diseño y estilo de la interfaz.
- **React Router DOM**: Gestión de rutas dentro de la aplicación.
- **React Hook Form**: Manejo de formularios y validación.
- **Zod**: Validación de datos.
- **Axios**: Cliente HTTP para la comunicación con la API backend.
- **React Toastify**: Para mostrar notificaciones de forma sencilla.

## Instalación

1. Crea un archivo .env en la raíz del proyecto y define la URL para MongoDB:
   ```bash
   VITE_MONGO_URL=<URL_DE_CONEXIÓN_DE_MONGODB>


2. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd propital-client
   npm install
   npm run dev

