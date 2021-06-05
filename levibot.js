require("dotenv").config();
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const { Client, Message } = require("discord.js");
const discord = require("discord.js");
const clientObj = new Client();
const prefix = "~";

const link = "https://www.nonolive.com/profile/";

clientObj.login(process.env.DISCORDJS_BOT_TOKEN);

async function makeRequest(url) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "load",
    // Remove the timeout
    timeout: 0,
  });
  let html = await page.content();
  let ppages = await browser.pages();
  await Promise.all(ppages.map((page) => page.close()));
  await browser.close();
  return html;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const doSomething = async () => {
  await sleep(5000);
  //do stuff
};

flag = 0;

clientObj.on("ready", async () => {
  const exampleEmbed = new discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("https://www.nonolive.com/44517516")
    .setURL("https://www.nonolive.com/44517516")
    .setAuthor("Levi's notification bot")
    .setDescription(
      ":flag_us: Levi is live on Nonolive || :flag_vn: Levi đang trực tiếp trên Nonolive"
    )
    .setThumbnail("https://i.imgur.com/3SNXThF.jpg")
    .setTimestamp()
    .setFooter("Sponsored by alphr.finance");

  var reqLink = "https://www.nonolive.com/profile/44517516";
  var channel = "822063976375648296";
  //var logChannel = clientObj.channels.cache.get(channel)
  //var pingRole = clientObj.channels.roles.cache.find(role => role.name === "Observer & Stream's Ping");
  //console.log(pingRole)

  //clientObj.channels.cache.get(channel).send(':flag_vn: Levi đang trực tiếp trên Nonolive')
  //clientObj.channels.cache.get(channel).send('https://www.nonolive.com/44517516')
  //clientObj.channels.cache.get(channel).send("<@&841653195562156032>")

  while (true) {
    // buh buh lmao cant think anything
    dom = await makeRequest(reqLink);
    var $ = cheerio.load(dom);
    onlive = $(".on-live").length;
    console.log(onlive);
    if (onlive > 0) {
      if (flag === 0) {
        // clientObj.channels.cache.get(channel).send(':flag_us: Levi is live on Nonolive')
        // clientObj.channels.cache.get(channel).send(':flag_vn: Levi đang trực tiếp trên Nonolive')
        // clientObj.channels.cache.get(channel).send('https://www.nonolive.com/44517516')
        //await clientObj.channels.cache.get(channel).send("<@&821832759651598466>")
        //await clientObj.channels.cache.get(channel).send("<@everyone>");
        await clientObj.channels.cache.get(channel).send(exampleEmbed);
        process.exit()
        flag = 1;
      }
    } else {
      flag = 0;
    }

    doSomething();
  }
});
