import { Client } from "discordx";

export async function clearCommands(client: Client) {
  await client.clearApplicationCommands();
  console.log("se elimino los comandos");
}
