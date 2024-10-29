// import ytdl from "@distube/ytdl-core";
// import { config } from "dotenv";
// import { Client } from "youtubei";
// import { YoutubeSearchApi } from "youtube-search-api-ts";
// config();

// // async function run() {
// //   const url = "https://www.youtube.com/watch?v=kJ666g2_Lpw";

// //   const id = await ytdl.getVideoID(url);
// //   const info = await ytdl.getBasicInfo(url);
// //   console.log(info.related_videos);

// //   //   console.log(audioFormts[0]);
// //   //   ytdl(url);
// //   // console.log(cmd);
// // }

// // run();

import { Nodo } from "../src/class/nodo";
import { Stack } from "../src/class/stack";

const stack = new Stack<string>();
stack.push(new Nodo("1"));
stack.push(new Nodo("2"));
stack.push(new Nodo("3"));

console.log(stack.count);

while (stack.inicio != null) {
  console.log(stack.pop()?.dato);
}

console.log(stack.count);

console.log(stack.inicio);
