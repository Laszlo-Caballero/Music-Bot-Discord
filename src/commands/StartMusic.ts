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
  StreamType,
} from "@discordjs/voice";
import { MusicPlayer } from "../class/loadMusic";
import { pauseSlash, playSlash, resumeSlash, skipSlash } from "../config/const";
import { Nodo } from "../class/nodo";
import yts from "yt-search";
import play from "play-dl";
import { Innertube } from "youtubei.js";
import { Readable } from "stream";

@Discord()
class StartMusic {
  private connection: VoiceConnection | null = null;
  private player = createAudioPlayer();
  private music: MusicPlayer = new MusicPlayer(this.player);
  private youtube = Innertube.create();

  @SelectMenuComponent({ id: "musicas" })
  async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
    await interaction.deferReply();
    const value = interaction.values?.[0];

    this.music.musicStack.push(new Nodo(value));

    await interaction.followUp(`Se inserto la siguiente cancion: ${value}`);
    return;
  }

  @Slash(playSlash)
  async play(
    @SlashOption({
      name: "url_name",
      description: "URL o Nombre de la canción",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    url: string,
    interaction: CommandInteraction
  ): Promise<unknown> {
    await interaction.deferReply();
    const member = interaction.member as GuildMember;
    if (!member.voice.channel) {
      await interaction.editReply(
        "¡Debes estar en un canal de voz para usar este comando!"
      );
      return;
    }

    const youtube = await this.youtube;

    const voiceChannel = member.voice.channel;

    this.connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as any,
    });
    this.connection.subscribe(this.player);

    this.player.on(AudioPlayerStatus.Idle, () => {
      this.music.playNextSong(interaction, youtube);
    });

    try {
      const newUrl = (await yts(url)).videos[0];

      // Si el reproductor ya está reproduciendo, añade la canción a la cola
      if (this.player.state.status === AudioPlayerStatus.Playing) {
        this.music.musicStack.push(new Nodo(newUrl.url));
        await interaction.editReply(
          `🎶 Canción añadida a la lista: ${newUrl.url}`
        );
        return;
      } else {
        const music = await youtube.download(newUrl.videoId);
        const nodeStream = Readable.fromWeb(music as any);

        const resource = createAudioResource(nodeStream);
        this.player.play(resource);
        this.connection.subscribe(this.player);
      }

      const menu = new StringSelectMenuBuilder()
        .addOptions(await this.music.getRecomendations(newUrl.url))
        .setCustomId("musicas");

      const buttonRow =
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          menu
        );

      await interaction.editReply(`🎶 Reproduciendo música: ${newUrl.url}`);
      await interaction.followUp({
        content: "Música recomendada:",
        components: [buttonRow],
      });
    } catch (error) {
      console.error("Error al reproducir la canción:", error);
      await interaction.editReply(
        "Hubo un error al intentar reproducir la canción."
      );
    }
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
    await interaction.deferReply();
    const youtube = await this.youtube;

    this.music.playNextSong(interaction, youtube);
  }
}
