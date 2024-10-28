import { Discord, SelectMenuComponent, Slash, SlashOption } from "discordx";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  MessageActionRowComponentBuilder,
  SlashCommandBuilder,
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

const cmd = new SlashCommandBuilder()
  .setName("play")
  .setDescription("reproducir musica");

const cmd2 = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("pausar musica");

const cmd3 = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("resumir musica");

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

  @Slash(cmd)
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
    // Verifica que el usuario esté en un canal de voz
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

  @Slash(cmd2)
  async pause(interaction: CommandInteraction) {
    await interaction.reply("pusado");
    return;
  }

  @Slash(cmd3)
  async resume(interaction: CommandInteraction) {
    await interaction.reply("resumir");
  }
}
