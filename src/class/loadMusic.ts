import { AudioPlayer, createAudioResource } from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import { recomendations } from "../types/types";
import { CommandInteraction } from "discord.js";
import { Stack } from "./stack";
import yts from "yt-search";
import Innertube from "youtubei.js/agnostic";
import { Readable } from "stream";

export class MusicPlayer {
  public musicStack = new Stack<string>();

  private player: AudioPlayer | null = null;
  constructor(_player: AudioPlayer) {
    this.player = _player;
  }

  async getRecomendations(url: string): Promise<recomendations[]> {
    if (ytdl.validateURL(url)) {
      const info = await ytdl.getBasicInfo(url);
      return info.related_videos.slice(0, 20).map((value) => {
        return {
          label: value.title?.slice(0, 70) ?? "",
          value: `https://www.youtube.com/watch?v=${value.id}`,
        };
      });
    } else {
      const result = await yts(url);
      const newUrl = result.videos[0].url;
      const info = await ytdl.getBasicInfo(newUrl);
      return info.related_videos.slice(0, 20).map((value) => {
        return {
          label: value.title?.slice(0, 70) ?? "",
          value: `https://www.youtube.com/watch?v=${value.id}`,
        };
      });
    }
  }

  public async playNextSong(
    interaction: CommandInteraction,
    youtube: Innertube
  ) {
    const nextSongUrl = this.musicStack.pop()?.dato ?? "";

    if (nextSongUrl) {
      const newUrl = (await yts(nextSongUrl)).videos[0];

      const music = await youtube.download(newUrl.videoId);
      const nodeStream = Readable.fromWeb(music as any);

      const resource = createAudioResource(nodeStream);
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
