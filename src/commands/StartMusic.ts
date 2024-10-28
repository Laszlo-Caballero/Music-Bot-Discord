import { Discord, Slash, SlashOption } from "discordx";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";

const cmd = new SlashCommandBuilder()
  .setName("play")
  .setDescription("reproducir musica");

@Discord()
class StartMusic {
  private connection: VoiceConnection | null = null;

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
  ): Promise<void> {
    // Verifica que el usuario esté en un canal de voz
    const member = interaction.member as GuildMember;
    if (!member.voice.channel) {
      await interaction.reply(
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
    const info = await ytdl.getInfo(url);
    const music = ytdl(url, { filter: "audioonly" });
    const resource = createAudioResource(music);

    try {
      player.play(resource); // Inicia la reproducción
      await interaction.reply("reproduciendo  ");
    } catch (error) {
      await interaction.reply("error");
    }

    this.connection.subscribe(player);
  }
}
