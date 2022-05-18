let { fetchBuffer, fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "gimage",
    alias: ["image"],
    use: "<query>",
    desc: "Search Image from Google",
    type: "search",
    example: "%prefix%command <query>",
    start: async(zenon, m, { text, command, toUpper }) => {
        if (!text) return m.reply(`Example : ${prefix + command} zenon Zogratis`)
        let fetch = await fetchUrl(global.api("zenz", "/searching/gimage", { query: text }, "apikey"))
        let random = fetch.result[Math.floor(Math.random() * fetch.result.length)]
        let buttons = [
            {buttonId: `pinterest ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
        ]
        let buttonMessage = {
            image: { url: random },
            caption: `Search Google Image Query : ${toUpper(text)}`,
            footer: `Powered By ͢ꪶ᳄ɪᴛs-ᴍᴇ  ͢ɴᴇxᴜs`,
            buttons: buttons,
            headerType: 4
        }
        zenon.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}