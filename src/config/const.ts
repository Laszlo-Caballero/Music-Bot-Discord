import { SlashCommandBuilder } from "discord.js";

export const playSlash = new SlashCommandBuilder()
  .setName("play")
  .setDescription("reproducir musica");

export const pauseSlash = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("pausar musica");

export const resumeSlash = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("resumir musica");

export const stopSlash = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("detener la musica");

export const skipSlash = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("ir a la siguiente cancion");
