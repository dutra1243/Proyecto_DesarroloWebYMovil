# Trabajo Obligatorio de Desarrollo Web y Mobile

## Objetivo

Desarrollar una aplicación web y mobile utilizando React para la parte web y React Native
para la parte móvil, con la funcionalidad básica de una red social de intercambio de
imágenes, similar a Instagram. El objetivo es poner en práctica los conceptos de frontend y
seguridad aprendidos durante el curso, implementando un sistema de autenticación con
JWT.

## Descripción del Proyecto

La aplicación se compondrá de dos partes principales:
1. Aplicación Web (React): Una plataforma desde donde los usuarios podrán
visualizar un feed de imágenes, perfiles de usuario, y sus propias publicaciones.
2. Aplicación Móvil (React Native): Los usuarios podrán subir fotos desde sus
dispositivos móviles (mediante la cámara) y editar sus perfiles. Además, tendrán
acceso al feed de imágenes y a su perfil personal.

## Instrucciones de Uso

Para correr el proyecto, se debe tener instalado:
- [Docker](https://www.docker.com/)
- [NPM (Node Package Manager)](https://nodejs.org/en/download/package-manager)
- [Expo](https://docs.expo.dev/get-started/installation/)
- [Postman](https://www.postman.com/downloads/) o una herramienta similar para realizar peticiones HTTP.
- Un emulador de [Android](https://developer.android.com/studio) o [iOS](https://apps.apple.com/us/app/xcode/id497799835?mt=12) o un dispositivo móvil con la aplicación Expo Go instalada.

Una vez instale las dependencias, clone el repositorio y siga los siguientes pasos para correr cada parte del proyecto.

### Backend

1. Abra una terminal en la carpeta root del proyecto.
2. Diríjase a la carpeta `backend` con el comando `cd backend`.
3. Ejecute el comando `docker-compose up` para levantar el contenedor de la base de datos.
4. Una vez que el contenedor esté corriendo, abra otra terminal en la misma carpeta.
5. Diríjase a la carpeta `api-node` con el comando `cd api-node`.
6. Ejecute el comando `npm install` para instalar las dependencias.
7. Ejecute el comando `npm start` para correr el servidor de la API.

En caso de que quiera generar posts y usuarios de prueba, puede realizar una petición POST a la ruta `http://localhost:3001/api/seed/users/10` para generar 10 usuarios y posts.

### Frontend Web

1. Abra una terminal en la carpeta root del proyecto.
2. Diríjase a la carpeta `frontend` con el comando `cd frontend`.
3. Ejecute el comando `npm install` para instalar las dependencias.
4. Ejecute el comando `npm run dev` para correr la aplicación web.
5. La terminal le mostrará la URL en la que puede acceder a la aplicación.

### Frontend Mobile

1. Abra una terminal en la carpeta root del proyecto.
2. Diríjase a la carpeta `mobile` con el comando `cd mobile`.
3. Ejecute el comando `npm install` para instalar las dependencias.
4. Ejecute el comando `npx expo start` para correr la aplicación móvil.
5. Una vez que la aplicación esté corriendo, escanee el código QR con la aplicación Expo Go en su dispositivo móvil o escriba `i` o `a` para correr la aplicación en un emulador de iOS o Android respectivamente.

## Requisitos

1. Autenticación y Autorización:
    ○ Utilizar JWT para la autenticación de usuarios.
    ○ Implementar el flujo de login y registro de usuarios.
    ○ Los usuarios autenticados podrán ver el feed de toda la red social, subir
    imágenes y editar su perfil.

2. Subida de Imágenes (Solo en Mobile):
    ○ Implementar la funcionalidad de subida de imágenes desde la aplicación
    móvil utilizando React Native, se debe acceder a la cámara y poder subir la
    imagen.

3. Visualización de Feed:
    ○ La aplicación debe mostrar un feed de imágenes subidas por los usuarios,
    tanto en la versión web como en la versión móvil.
    ○ El feed debe estar ordenado cronológicamente por fecha de subida.

4. Perfil de Usuario:
    ○ Cada usuario debe poder editar su perfil, incluyendo su nombre de usuario y
    foto de perfil.
    ○ La funcionalidad de edición debe estar disponible tanto en la web como en la
    aplicación móvil.

5. Backend:
    ○ Será proporcionado por los profesores una API REST para consumir todos
    los servicios relacionados a las funcionalidades descritas.

6. Seguridad:
    ○ Implementar el uso de JWT para proteger las rutas que requieren
    autenticación.
    ○ Proteger la subida de imágenes y la edición de perfil mediante validación de
    autenticación.

7. Extras Opcionales:
    ○ Agregar la funcionalidad de “me gusta” en las publicaciones.
    ○ Permitir que los usuarios comenten en las imágenes.
    ○ Implementar un sistema de notificaciones cuando alguien te siga o interactúe
    con tus publicaciones.


## Criterios de Evaluación

● Funcionalidad completa de autenticación y autorización con JWT.
● Subida de imágenes desde dispositivos móviles.
● Implementación de un feed dinámico que muestre las imágenes.
● Funcionalidad de edición de perfil.
● Código limpio y bien estructurado, con buenas prácticas de desarrollo.
● Seguridad en el manejo de las credenciales y datos de los usuarios.


## Entregables:

1. Repositorio de GitHub con el código fuente de la aplicación web y móvil.
2. Documentación del proyecto que incluya:
    ○ Instrucciones para ejecutar la aplicación.
    ○ Explicación de las funcionalidades implementadas.
    ○ Justificación de las decisiones técnicas tomadas.


## Plazo de Entrega

La entrega del proyecto será el 26/11/2024. Cualquier entrega fuera de esta fecha tendrá
una penalización en la calificación final.