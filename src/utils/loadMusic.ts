import {
  createAudioPlayer,
  createAudioResource,
  VoiceConnection,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import { recomendations } from "../types/types";

export class MusicPlayer {
  // constructor() {
  //   this.player.on("error", (error) => {
  //     console.error("Error en el reproductor:", error);
  //   });
  // }

  // setConnection(connection: VoiceConnection) {
  //   this.connection = connection;
  //   this.connection.subscribe(this.player);
  // }

  //   async play(url: string): Promise<string> {
  //     if (!this.connection) {
  //       throw new Error("El bot no está conectado a un canal de voz.");
  //     }

  //     // Reproducir el audio
  //   }

  async getRecomendations(url: string): Promise<recomendations[]> {
    const info = await ytdl.getBasicInfo(url);
    return info.related_videos.map((value) => {
      return {
        label: value.title ?? "",
        value: `https://www.youtube.com/watch?v=${value.id}`,
      };
    });
  }
}
