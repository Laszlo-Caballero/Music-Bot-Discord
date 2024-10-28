"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discordx_1 = require("discordx");
const importer_1 = require("@discordx/importer");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
const client = new discordx_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.MessageContent,
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
    const commandsPath = path_1.default.join(__dirname, "{events,commands}/**/*.{ts,js}");
    await (0, importer_1.importx)(commandsPath);
    client.login(process.env.DISCORD_KEY ?? "");
}
run();
