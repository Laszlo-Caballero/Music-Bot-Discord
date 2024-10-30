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
import { MusicPlayer } from "../class/loadMusic";
import { pauseSlash, playSlash, resumeSlash, skipSlash } from "../config/const";
import { Nodo } from "../class/nodo";
import yts from "yt-search";

@Discord()
class StartMusic {
  private connection: VoiceConnection | null = null;
  private player = createAudioPlayer();
  private music: MusicPlayer = new MusicPlayer(this.player);

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
    const member = interaction.member as GuildMember;
    if (!member.voice.channel) {
      await interaction.reply(
        "¡Debes estar en un canal de voz para usar este comando!"
      );
      return;
    }

    const voiceChannel = member.voice.channel;

    this.connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as any,
    });
    this.connection.subscribe(this.player);

    this.player.on(AudioPlayerStatus.Idle, () => {
      this.music.playNextSong(interaction);
    });
    try {
      const newUrl = ytdl.validateURL(url)
        ? url
        : (await yts(url)).videos[0].url;
      if (this.player.state.status === AudioPlayerStatus.Playing) {
        this.music.musicStack.push(new Nodo(newUrl));
        await interaction.reply(`🎶 Canción añadida a la lista: ${newUrl}`);
        return;
      } else {
        const music = ytdl(newUrl, { filter: "audioonly" });
        const resource = createAudioResource(music);
        this.player.play(resource);
        this.connection.subscribe(this.player);
      }

      const menu = new StringSelectMenuBuilder()
        .addOptions(await this.music.getRecomendations(url))
        .setCustomId("musicas");

      const buttonRow =
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          menu
        );

      await interaction.reply(`🎶 Reproduciendo música: ${newUrl}`);
      await interaction.followUp({
        content: "Música recomendada:",
        components: [buttonRow],
      });
    } catch (error) {
      console.log(error);
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
    this.music.playNextSong(interaction);
  }
}
