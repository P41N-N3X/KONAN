const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "tiktokwm",
    alias: ["tiktokwm","ttwm","tiktokwatermark"],
    use: "<url>",
    desc: "Download Media From https://tiktok.com",
    type: "downloader",
    example: "%prefix%command <url>",
    start: async(zenon, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/downloader/tiktok", { url: isUrl(text)[0] }, "apikey"))
        let buttons = [
            {buttonId: `tiktoknowm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
            {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
        ]
        let buttonMessage = {
            video: { url: fetch.result.watermark },
            caption: `Download Tiktok From : ${isUrl(text)[0]}`,
            footer: 'Powered by ͢ꪶ᳄ɪᴛs-ᴍᴇ  ͢ɴᴇxᴜs',
            buttons: buttons,
            headerType: 5
        }
        zenon.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}