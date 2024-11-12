import { Client } from "discordx";
import { importx } from "@discordx/importer";
import { config } from "dotenv";
import path from "path";
import { GatewayIntentBits } from "discord.js";
import ffmpeg from "ffmpeg-static";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  await client.initApplicationCommands();
  console.log("Listo");
});

client.on("interactionCreate", (interation) => {
  client.executeInteraction(interation);
});

async function run() {
  const commandsPath = path.join(__dirname, "{events,commands}/**/*.{ts,js}");
  await importx(commandsPath);
  client.login(process.env.DISCORD_KEY ?? "");
}

run();
