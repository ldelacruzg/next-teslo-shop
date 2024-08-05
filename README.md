# Clon de Tesla Shop

## Desarrollo

1. Clonar el repositorio
2. Instalar las dependecias

    ```bash
    pnpm install
    ```

3. Copia y pega el archivo `.env.template` y reemplaza el nombre a `.env`. Coloca los valores de las variables de entorno donde sea necesario.

4. Levantar la base de datos

    ```bash
    docker compose up -d
    ```

5. Generar las migraciones

    ```bash
    pnpx prisma migrate dev
    pnpx prisma generate (optional)
    ```

6. Ejecutar el seed para poblar la base de datos

    ```bash
    pnpx prisma db seed
    ```

7. Ejecutar el proyecto

    ```bash
    pnpm dev
    ```

Abrir aplicación <http://localhost:3000>
