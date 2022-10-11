# Project React JS - HENRY TICKET

Tienda online de eventos

Visit Page: https://tickethenry.vercel.app/
Original Repository: https://github.com/LuisDanielRB/ecommerce_pg

## Funcionalidades

USUARIO:
- Autenticacion , envio de email de bienvenida.
- Perfil del usuario, cambio de contraseña, foto de perfil , nombre , eliminar cuenta. Seccion de eventos favoritos.
- Menú con las secciones shop y carrito.
- Dentro de shop listado de todos los eventos disponibles, se puede filtrar por categorias , artistas y lugares.
- Dentro del carrito listado de todos los productos y el total de la compra.
- Dentro del checkout feedback de la compra realizada , envio de email con detalle de la compra.

ADMIN:
- Dashboard de admin
- Seccion para crear eventos.
- Dentro del dashboard de admin: Carritos activos y desactivados con sus resumenes de compra. Listado de usuario , donde se puede asignar roles , banear o desbanear un usuario , eventos activos, eliminarlos o editarlos. 

## Tecnologías usadas en el proyecto:

- React
- Tailwind
- Node
- Postgres
- Firebase


## Authors

- Joaquin Boto - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaquinboto)
- Luis Daniel Rios Barba - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luisdanielrios) 
- Cristian Albornoz - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cristian-gabriel-albornoz-06bb07238) 
- Horus Camacho - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/horus-camacho-80188a1a8)
- Jonatan Musciachio - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonatanmusciachio)
- Luciano Coronel - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luciano-coronel-90503bb8/)






## Instalacion

In the project directory, you can run:

## `git clone https://github.com/joaquinboto/TICKET-HENRY.git`

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
PORT=3000
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
DB_NAME=ecommerce
ACCESS_TOKEN = APP_USR-8432689739580509-092110-b0e758d49971f389e444a8d4c4996750-1202413171
CLOUDINARY_NAME=dzjonhhps
CLOUDINARY_API_KEY=147534349873877
CLOUDINARY_API_SECRET=e72UFVEW7-8qeNWbTRem32FPI5k
AUTH_SECRET='loquedesee'
AUTH_EXPIRES='1d'
AUTH_ROUNDS='10'

```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `ecommerce`

## `npm install`

### On folder /client `npm install` & `npm run dev`
### On folder /api `npm install` & `npm start`

