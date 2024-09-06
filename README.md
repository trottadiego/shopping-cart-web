## shopping-cart-web

Este es el frontend para la aplicación de carrito de compras, gestionada con el backend correspondiente. Está construida con ReactJS utilizando Vite como herramienta de desarrollo, y los estilos están creados con SASS.

## Tecnologías Utilizadas

    ReactJS: Librería para crear interfaces de usuario.
    Vite: Herramienta rápida de desarrollo y construcción de proyectos.
    SASS: Preprocesador CSS para manejar los estilos.
    Axios: Cliente HTTP para hacer peticiones al backend.
    React Router: Manejo de rutas dentro de la aplicación.

### Instalación con npm

## Clona el repositorio:

https://github.com/trottadiego/shopping-cart-web.git

## Navega al directorio del proyecto:

cd shopping-cart-web

## Instala las dependencias:

npm install

## Configura las variables de entorno necesarias. Crea un archivo .env en la raíz del proyecto y define las siguientes variables:

VITE_APP_API_URL=http://localhost:3000/api

## Ejecuta la aplicación en modo desarrollo:

npm run dev

### Instalación con Docker

## Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

## Construye y corre el contenedores (Frontend):

docker-compose up --build
