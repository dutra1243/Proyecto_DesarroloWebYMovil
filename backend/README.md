# Función `runSeed`

## Descripción

La función `runSeed` genera datos de prueba aleatorios para la base de datos MongoDB de una aplicación que gestiona usuarios y publicaciones (posts). Utiliza los modelos `User` y `Post` para insertar usuarios y sus respectivas publicaciones, empleando la biblioteca `faker` para generar datos falsos (como nombres de usuario, correos electrónicos, contraseñas y descripciones).

Además, utiliza un generador de imágenes aleatorias de la URL `https://picsum.photos/200` para las imágenes de las publicaciones. La cantidad de usuarios y publicaciones creadas es configurable a través de un parámetro en la solicitud HTTP.

## Uso

### Pre-requisito

Antes de ejecutar el seed, es **necesario que la base de datos MongoDB esté corriendo**. Para ello, debes ejecutar el comando:

```bash
docker-compose up
```

### Endpoint

`POST /seed/:qty`

- **:qty** - Parámetro que especifica la cantidad de usuarios a generar. Cada usuario tendrá entre 1 y 20 publicaciones aleatorias.

### Ejemplo de Uso

Si deseas generar 10 usuarios y sus publicaciones, puedes realizar una solicitud `POST` al siguiente endpoint:

```
localhost:3001/api/seed/users/10
```

### Respuesta

Si los datos de prueba se generan correctamente, la API devolverá un mensaje de éxito:

```json
{
  "message": "Seed data created successfully"
}
