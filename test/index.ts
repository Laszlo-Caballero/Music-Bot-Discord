import ytdl from "ytdl-core";

async function run() {
  const url = "https://www.youtube.com/watch?v=kJ666g2_Lpw";

  const info = await ytdl.getInfo(url);
  const audioFormts = ytdl.filterFormats(info.formats, "audioonly");
  const cmd = ytdl(url, { filter: "audioonly" });
  //   console.log(audioFormts[0]);
  //   ytdl(url);
  console.log(cmd);
}

run();
