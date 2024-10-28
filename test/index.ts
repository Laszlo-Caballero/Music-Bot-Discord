import ytdl from "@distube/ytdl-core";
import { config } from "dotenv";
import { Client } from "youtubei";
import { YoutubeSearchApi } from "youtube-search-api-ts";
config();

async function run() {
  const url = "https://www.youtube.com/watch?v=kJ666g2_Lpw";

  const id = await ytdl.getVideoID(url);
  const info = await ytdl.getBasicInfo(url);
  console.log(info.related_videos);

  //   console.log(audioFormts[0]);
  //   ytdl(url);
  // console.log(cmd);
}

run();
