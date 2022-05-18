const { getRandom } = require("../../lib/Function")
let axios = require('axios')
let BodyForm = require('form-data')

module.exports = {
    name: "tovideo",
    alias: ["tomp4","tomedia"],
    use: "<reply>",
    desc: "Convert Sticker Gif To Video",
    type: "convert",
    example: `%prefix%command --sticker reply`,
    start: async(zenon, m, { command, prefix, quoted, mime }) => {
        if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
        if (/image|video|sticker/.test(mime)) {
            let download = await zenon.downloadMediaMessage(quoted)
            const form = new BodyForm()
            form.append('sampleFile', download, { filename: getRandom('webp') })
            axios.post(global.api("zenz", "/convert/webp-to-mp4", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
            }).then(({ data }) => {
                zenon.sendFile(m.from, data.result, "", m, { caption: 'Convert Sticker Gif To Video' })
            })
        } else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}