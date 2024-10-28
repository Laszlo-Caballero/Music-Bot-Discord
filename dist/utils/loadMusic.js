"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicPlayer = void 0;
const voice_1 = require("@discordjs/voice");
class MusicPlayer {
    constructor() {
        this.player = (0, voice_1.createAudioPlayer)();
        this.connection = null;
        this.player.on("error", (error) => {
            console.error("Error en el reproductor:", error);
        });
    }
    setConnection(connection) {
        this.connection = connection;
        this.connection.subscribe(this.player);
    }
}
exports.MusicPlayer = MusicPlayer;
