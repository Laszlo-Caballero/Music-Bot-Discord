# Discord Music Bot

Un bot de Discord que permite reproducir música desde YouTube en tu servidor.

## Requisitos

1. **FFmpeg**: Necesario para procesar el audio. Asegúrate de tenerlo instalado, ya sea localmente o en tu entorno de despliegue.
2. **Node.js**: Versión 19 o superior.

## Instalación

1. **Clona este repositorio** (o descarga los archivos):

   ```bash
   git clone https://github.com/Laszlo-Caballero/Music-Bot-Discord.git
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

## Despliege

De preferencia usar RailWay para desplegar el bot.

1. sincronizar el repo con Railway
2. configurar las variables de entorno
3. poner este comando en Custom Start Command
   ```bash
   sudo apt update && sudo apt install -y ffmpeg && npm start
   ```

### TODOS

1. Reproducir playlist de youtube [ ]
2. Reproducir links de spotify y playlist [ ]
3. Reproducir links de dezzer (no se 😄) [ ]
