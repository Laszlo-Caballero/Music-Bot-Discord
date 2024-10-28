import {
  createAudioPlayer,
  createAudioResource,
  VoiceConnection,
} from "@discordjs/voice";

export class MusicPlayer {
  private player = createAudioPlayer();
  private connection: VoiceConnection | null = null;

  constructor() {
    this.player.on("error", (error) => {
      console.error("Error en el reproductor:", error);
    });
  }

  setConnection(connection: VoiceConnection) {
    this.connection = connection;
    this.connection.subscribe(this.player);
  }

  //   async play(url: string): Promise<string> {
  //     if (!this.connection) {
  //       throw new Error("El bot no está conectado a un canal de voz.");
  //     }

  //     // Reproducir el audio
  //   }
}
