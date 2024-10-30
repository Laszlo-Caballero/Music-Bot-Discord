# Discord Music Bot

Un bot de Discord que permite reproducir música desde YouTube en tu servidor.

## Requisitos

1. **FFmpeg**: Necesario para procesar el audio. Asegúrate de tenerlo instalado, ya sea localmente o en tu entorno de despliegue.
2. **Node.js**: Versión 19 o superior.

## Instalación

1. **Clona este repositorio** (o descarga los archivos):

   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   ```

2. **Variables de entorno**:
   ```
   DISCORD_TOKEN="tu_token_de_discord"
   ```
3. **Instalar dependencias**
   ```bash
       npm install
   ```
4. **Hacer build**
   ```bash
       npm run build
   ```
5. **Ejecutar bot**
   ```bash
       npm start
   ```

## Comandos

1.  /play <url_o_nombre>: Reproduce una canción de YouTube o la Añade a la cola.
2.  /stop detener el bot
3.  /pause: Pausa la reproducción de la música.
4.  /resume: Reanuda la reproducción.
5.  /skip: Salta a la siguiente canción en la cola.
