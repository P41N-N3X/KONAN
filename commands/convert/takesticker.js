module.exports = {
    name: "takesticker",
    alias: ["colong","take"],
    use: "<reply>",
    desc: "Take And Change Sticker Exif",
    type: "convert",
    example: "\nColong : %prefix%command --sticker reply\nTake : %prefix%command packname|author --sticker reply",
    start: async(zenon, m, { command, prefix, args, quoted, mime }) => {
        if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
        if (/image|video|sticker/.test(mime)) {
            anu = args.join(" ").split('|')
            const packname = anu[0] !== '' ? anu[0] : global.packname
            const author = anu[1] !== '' ? anu[1] : global.author
            let download = await quoted.download()
            zenon.sendFile(m.from, download, "", m, { asSticker: true, author: author, packname: packname, categories: ['😄','😊'] })
        } else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    },
}
