"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCommands = clearCommands;
async function clearCommands(client) {
    await client.clearApplicationCommands();
    console.log("se elimino los comandos");
}
