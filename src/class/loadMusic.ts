import { AudioPlayer, createAudioResource } from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import { recomendations } from "../types/types";
import { CommandInteraction } from "discord.js";
import { Stack } from "./stack";
import yts from "yt-search";

export class MusicPlayer {
  public musicStack = new Stack<string>();

  private player: AudioPlayer | null = null;
  constructor(_player: AudioPlayer) {
    this.player = _player;
  }

  async getRecomendations(url: string): Promise<recomendations[]> {
    if (ytdl.validateURL(url)) {
      const info = await ytdl.getBasicInfo(url);
      return info.related_videos.map((value) => {
        return {
          label: value.title ?? "",
          value: `https://www.youtube.com/watch?v=${value.id}`,
        };
      });
    } else {
      const result = await yts(url);
      const newUrl = result.videos[0].url;
      const info = await ytdl.getBasicInfo(newUrl);
      return info.related_videos.map((value) => {
        return {
          label: value.title ?? "",
          value: `https://www.youtube.com/watch?v=${value.id}`,
        };
      });
    }
  }

  public async playNextSong(interaction: CommandInteraction) {
    const nextSongUrl = this.musicStack.pop()?.dato ?? "";
    if (nextSongUrl) {
      const stream = ytdl(nextSongUrl, { filter: "audioonly" });
      const resource = createAudioResource(stream);
      this.player?.play(resource);

      // Anuncia la canción
      await interaction.followUp(`🎶 Reproduciendo música: ${nextSongUrl}`);
    } else {
      await interaction.followUp(
        "La cola está vacía. No hay más canciones para reproducir."
      );
    }
  }
}
