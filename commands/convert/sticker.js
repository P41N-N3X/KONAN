const { delay, extractMessageContent } = require("@adiwajshing/baileys")
const { isUrl } = require("../../lib/Function")

module.exports = {
    name: "sticker",
    alias: ["s","stiker"],
    use: "<reply>",
    desc: "Convert Image, Video, Gif To Sticker",
    type: "convert",
    example: "\nsticker : %prefix%command --media reply\nPP sticker : %prefix%command @tag\nurl sticker : %prefix%command <url>",
    start: async(zenon, m, { command, prefix, text, quoted, mime }) => {
        if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
        if (/image|video|sticker/.test(mime)) {
            let download = await quoted.download()
            zenon.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else if (quoted.mentions[0]) {
            let url = await zenon.profilePictureUrl(quoted.mentions[0], "image")
            zenon.sendFile(m.from, url, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else if (isUrl(text)) {
            if (isUrl(text)) zenon.sendFile(m.from, isUrl(text)[0], "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            else m.reply('No Url Match')
        } else if (text) {
            let fetch = await fetchUrl(global.api("zenz", "/searching/stickersearch", { query: text }, "apikey"))
            for (let url of fetch.result) {
                await delay(1000)
                zenon.sendFile(m.from, url, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            }
        } else if (quoted.type == "templateMessage") {
            let message = quoted.imageMessage || quoted.videoMessage
            let download = await zenon.downloadMediaMessage(message)
            zenon.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else if (quoted.type == "buttonsMessage") {
            let message = quoted.imageMessage || quoted.videoMessage
            let download = await zenon.downloadMediaMessage(message)
            zenon.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}