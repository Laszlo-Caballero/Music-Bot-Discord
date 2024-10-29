import ytdl from "@distube/ytdl-core";
import yts from "yt-search";
// import { config } from "dotenv";
// import { Client } from "youtubei";
// import { YoutubeSearchApi } from "youtube-search-api-ts";
// config();

async function run() {
  const url = "https://www.youtube.com/watch?v=kJ666g2_Lpw";
  const result = await yts("en la ciudad de la fuira");
  console.log(result);
  ytdl.validateURL("asd");
}

run();

// import { Nodo } from "../src/class/nodo";
// import { Stack } from "../src/class/stack";

// const stack = new Stack<string>();
// stack.push(new Nodo("1"));
// stack.push(new Nodo("2"));
// stack.push(new Nodo("3"));

// console.log(stack.count);

// while (stack.inicio != null) {
//   console.log(stack.pop()?.dato);
// }

// console.log(stack.count);

// console.log(stack.inicio);
