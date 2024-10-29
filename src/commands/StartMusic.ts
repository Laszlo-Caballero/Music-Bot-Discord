import { Discord, SelectMenuComponent, Slash, SlashOption } from "discordx";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
  AudioPlayerStatus,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import { MusicPlayer } from "../utils/loadMusic";
import { pauseSlash, playSlash, resumeSlash, skipSlash } from "../config/const";
import { Stack } from "../class/stack";
import { Nodo } from "../class/nodo";

@Discord()
class StartMusic {
  private connection: VoiceConnection | null = null;
  private player = createAudioPlayer();
  private music: MusicPlayer = new MusicPlayer();
  private musicStack = new Stack<string>();

  constructor() {
    // Suscribirse al evento `idle` del reproductor de audio para saber cuando una canción termina
    this.player.on(AudioPlayerStatus.Idle, async () => {
      if (this.musicStack.count == 0) {
        console.log(
          "La cola está vacía. No hay más canciones para reproducir."
        );
      } else {
        const nextSongUrl = this.musicStack.pop()?.dato;
        if (nextSongUrl) {
          await this.playNextSong(nextSongUrl);
        }
      }
    });
  }

  @SelectMenuComponent({ id: "musicas" })
  async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
    await interaction.deferReply();
    const value = interaction.values?.[0];

    this.musicStack.push(new Nodo(value));

    await interaction.followUp(`Se inserto la siguiente cancion: ${value}`);
    return;
  }

  @Slash(playSlash)
  async play(
    @SlashOption({
      name: "url",
      description: "URL de YouTube de la canción",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    url: string,
    interaction: CommandInteraction
  ): Promise<unknown> {
    const member = interaction.member as GuildMember;
    if (!member.voice.channel) {
      await interaction.reply(
        "¡Debes estar en un canal de voz para usar este comando!"
      );
      return;
    }

    const voiceChannel = member.voice.channel;
    if (!this.connection) {
      this.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator as any,
      });
    }

    const music = ytdl(url, { filter: "audioonly" });
    const resource = createAudioResource(music);

    this.player.play(resource);
    this.connection.subscribe(this.player);

    const menu = new StringSelectMenuBuilder()
      .addOptions(await this.music.getRecomendations(url))
      .setCustomId("musicas");

    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        menu
      );

    await interaction.reply(`🎶 Reproduciendo música: ${url}`);
    await interaction.followUp({
      content: "Música recomendada:",
      components: [buttonRow],
    });
  }

  private async playNextSong(url: string) {
    const music = ytdl(url, { filter: "audioonly" });
    const resource = createAudioResource(music);
    this.player.play(resource);
  }

  @Slash(pauseSlash)
  async pause(interaction: CommandInteraction) {
    this.player.pause();
    await interaction.reply("Pausado");
  }

  @Slash(resumeSlash)
  async resume(interaction: CommandInteraction) {
    this.player.unpause();
    await interaction.reply("Reanudado");
  }

  @Slash(skipSlash)
  async skip(interaction: CommandInteraction) {
    await interaction.reply("Skip");
  }
}
