const { getRandom } = require("../../lib/Function")
const request = require('request')
const fs = require('fs')

module.exports = {
    name: "stickernobg",
    alias: ["sbg"],
    use: "<reply>",
    desc: "Convert Image To Sticker With No Background",
    type: "convert",
    example: `%prefix%command --image reply`,
    start: async(zenon, m, { command, prefix, quoted, mime }) => {
        if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
        if (/image/.test(mime)) {
            let download = await zenon.downloadAndSaveMediaMessage(quoted)
            file_name = getRandom('jpg')
            request({
                url: global.api("zenz", "/convert/sticker-nobg", {}, "apikey"),
                method: 'POST',
                formData: {
                    "sampleFile": fs.createReadStream(download)
                },
                encoding: "binary"
            }, async function(error, response, body) {
                fs.unlinkSync(download)
                fs.writeFileSync(file_name, body, "binary")
                ini_buff = fs.readFileSync(file_name)
                await zenon.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] }).then(() => {
                    fs.unlinkSync(file_name)
                })
            })
        } else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}