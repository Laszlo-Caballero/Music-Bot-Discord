"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discordx_1 = require("discordx");
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const cmd = new discord_js_1.SlashCommandBuilder()
    .setName("play")
    .setDescription("reproducir musica");
let StartMusic = class StartMusic {
    constructor() {
        this.connection = null;
    }
    async play(url, interaction) {
        // Verifica que el usuario esté en un canal de voz
        const member = interaction.member;
        if (!member.voice.channel) {
            await interaction.reply("¡Debes estar en un canal de voz para usar este comando!");
            return;
        }
        // Unirse al canal de voz del usuario
        const voiceChannel = member.voice.channel;
        if (!this.connection) {
            this.connection = (0, voice_1.joinVoiceChannel)({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
        }
        const player = (0, voice_1.createAudioPlayer)();
        const info = await ytdl_core_1.default.getInfo(url);
        const music = (0, ytdl_core_1.default)(url, { filter: "audioonly" });
        const resource = (0, voice_1.createAudioResource)(music);
        try {
            player.play(resource); // Inicia la reproducción
            await interaction.reply("reproduciendo  ");
        }
        catch (error) {
            await interaction.reply("error");
        }
        this.connection.subscribe(player);
    }
};
__decorate([
    (0, discordx_1.Slash)(cmd),
    __param(0, (0, discordx_1.SlashOption)({
        name: "url",
        description: "URL de YouTube de la canción",
        required: true,
        type: discord_js_1.ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, discord_js_1.CommandInteraction]),
    __metadata("design:returntype", Promise)
], StartMusic.prototype, "play", null);
StartMusic = __decorate([
    (0, discordx_1.Discord)()
], StartMusic);
