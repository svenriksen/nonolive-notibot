require('dotenv').config()
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const { Client } = require('discord.js')
const clientObj = new Client()
const prefix = "~"


const link = "https://www.nonolive.com/profile/"

clientObj.login(process.env.DISCORDJS_BOT_TOKEN)

var response

clientObj.on('message', async (message) => {
    if(message.author.bot) return
    if(message.content.startsWith(prefix)) 
    {
        var [cmd, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)

        if (cmd==='live')
        {
            if (args.length===0)
            {
                message.reply("Please provide a Nonolive ID")
            }
            else
            {
                
                message.channel.send("Processing...")
                reqLink = link + args[0]
                
                // buh buh lmao cant think anything
                dom = await makeRequest(reqLink);
                var $ = cheerio.load(dom);
                onlive = $(".on-live").length
                console.log(onlive)
                if (onlive>0)
                    message.channel.send("Liveeeeeeeeeeeeee")
                else
                    message.channel.send("Not live yet")

            }
        }


    }
})

async function makeRequest(url) {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "load",
      // Remove the timeout
      timeout: 0,
    });
    let html = await page.content();
  
    await browser.close();
    return html;
  }

clientObj.on('ready', () => {
    console.log('ready to go')
})