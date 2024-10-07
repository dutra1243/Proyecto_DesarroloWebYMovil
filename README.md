Objetivo:

Desarrollar una aplicación web y mobile utilizando React para la parte web y React Native
para la parte móvil, con la funcionalidad básica de una red social de intercambio de
imágenes, similar a Instagram. El objetivo es poner en práctica los conceptos de frontend y
seguridad aprendidos durante el curso, implementando un sistema de autenticación con
JWT.

Descripción del Proyecto:

La aplicación se compondrá de dos partes principales:
1. Aplicación Web (React): Una plataforma desde donde los usuarios podrán
visualizar un feed de imágenes, perfiles de usuario, y sus propias publicaciones.
2. Aplicación Móvil (React Native): Los usuarios podrán subir fotos desde sus
dispositivos móviles (mediante la cámara) y editar sus perfiles. Además, tendrán
acceso al feed de imágenes y a su perfil personal.

Requisitos:

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


Criterios de Evaluación:

● Funcionalidad completa de autenticación y autorización con JWT.
● Subida de imágenes desde dispositivos móviles.
● Implementación de un feed dinámico que muestre las imágenes.
● Funcionalidad de edición de perfil.
● Código limpio y bien estructurado, con buenas prácticas de desarrollo.
● Seguridad en el manejo de las credenciales y datos de los usuarios.


Entregables:

1. Repositorio de GitHub con el código fuente de la aplicación web y móvil.
2. Documentación del proyecto que incluya:
○ Instrucciones para ejecutar la aplicación.
○ Explicación de las funcionalidades implementadas.
○ Justificación de las decisiones técnicas tomadas.


Plazo de Entrega:

La entrega del proyecto será el 26/11/2024. Cualquier entrega fuera de esta fecha tendrá
una penalización en la calificación final.