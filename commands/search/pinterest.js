let { fetchBuffer, fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "pin",
    alias: ["pin"],
    use: "<query>",
    desc: "Search Image from Pinterest",
    type: "search",
    example: "%prefix%command <query>",
    start: async(zenon, m, { text, toUpper }) => {
        let fetch = await fetchUrl(global.api("zenz", "/searching/pinterest", { query: text }, "apikey"))
        let random = fetch.result[Math.floor(Math.random() * fetch.result.length)]
        let buttons = [
            {buttonId: `pin ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
        ]  
        let buttonMessage = {
            image: { url: random },
            caption: `Search Pinterest Query : ${toUpper(text)}`,
            footer: `Powered By ⚠︎Z𝚎𝚗𝚘𝚗⚠︎`,
            buttons: buttons,
            headerType: 4
        }
        zenon.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}