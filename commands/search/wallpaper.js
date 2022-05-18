let { fetchBuffer, fetchUrl } = require("../../lib/Function")
let { wallpaper } = require("../../lib/Scraper")

module.exports = {
    name: "wallpaper",
    alias: [],
    use: "<query>",
    desc: "Search Wallpaper from https://www.besthdwallpaper.com",
    type: "search",
    example: "%prefix%command <query>",
    start: async(zenon, m, { text, command, toUpper }) => {
        if (!text) return m.reply(`Example : ${prefix + command} zenon Zogratis`)
        let fetch = await wallpaper(text)
        let random = fetch[Math.floor(Math.random() * fetch.length)]
        let buttons = [
            {buttonId: `wallpaper ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
        ]
        let buttonMessage = {
            image: { url: random.image[0] },
            caption: `Search Wallpaper Query : ${toUpper(text)}`,
            footer: `Powered By ͢ꪶ᳄ɪᴛs-ᴍᴇ  ͢ɴᴇxᴜs`,
            buttons: buttons,
            headerType: 4
        }
        zenon.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}