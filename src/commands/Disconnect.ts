import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { getVoiceConnection } from "@discordjs/voice";
import { stopSlash } from "../config/const";

@Discord()
class Disconnect {
  @Slash(stopSlash)
  async leave(interaction: CommandInteraction) {
    const connection = getVoiceConnection(interaction.guildId!);

    if (connection) {
      connection.destroy();
      await interaction.reply("Sali del canal de voz");
    } else {
      await interaction.reply("No estoy en un canal de voz");
    }
  }
}
