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
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import { MusicPlayer } from "../utils/loadMusic";
import { pauseSlash, playSlash, resumeSlash } from "../config/const";

@Discord()
class StartMusic {
  private connection: VoiceConnection | null = null;
  private music: MusicPlayer = new MusicPlayer();

  @SelectMenuComponent({ id: "musicas" })
  async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
    await interaction.deferReply();

    const value = interaction.values?.[0];
    interaction.followUp(`you have selected role: ${value}`);

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
      await interaction.followUp(
        "¡Debes estar en un canal de voz para usar este comando!"
      );
      return;
    }

    // Unirse al canal de voz del usuario
    const voiceChannel = member.voice.channel;
    if (!this.connection) {
      this.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator as any,
      });
    }
    const player = createAudioPlayer();
    const music = ytdl(url, { filter: "audioonly" });
    const resource = createAudioResource(music);

    try {
      player.play(resource);
      const menu = new StringSelectMenuBuilder()
        .addOptions(await this.music.getRecomendations(url))
        .setCustomId("musicas");

      const buttonRow =
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          menu
        );

      this.connection.subscribe(player);

      await interaction.reply(`🎶 Reproduciendo música. ${url}`);

      await interaction.followUp({
        content: "musica Recomendada",
        components: [buttonRow],
      });
      return;
    } catch (error) {
      console.log(error);
      await interaction.reply("error");
      return;
    }
  }

  @Slash(pauseSlash)
  async pause(interaction: CommandInteraction) {
    await interaction.reply("pusado");
    return;
  }

  @Slash(resumeSlash)
  async resume(interaction: CommandInteraction) {
    await interaction.reply("resumir");
  }
}
