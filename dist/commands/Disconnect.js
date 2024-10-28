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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discordx_1 = require("discordx");
const voice_1 = require("@discordjs/voice");
const cmd = new discord_js_1.SlashCommandBuilder()
    .setName("stop")
    .setDescription("detener la musica");
let Disconnect = class Disconnect {
    async leave(interaction) {
        const connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (connection) {
            connection.destroy();
            await interaction.reply("Sali del canal de voz");
        }
        else {
            await interaction.reply("No estoy en un canal de voz");
        }
    }
};
__decorate([
    (0, discordx_1.Slash)(cmd),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.CommandInteraction]),
    __metadata("design:returntype", Promise)
], Disconnect.prototype, "leave", null);
Disconnect = __decorate([
    (0, discordx_1.Discord)()
], Disconnect);
