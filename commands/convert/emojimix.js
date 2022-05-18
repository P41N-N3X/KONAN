module.exports = {
    name: "emojimix",
    alias: ["mixemoji"],
    use: "<query>",
    desc: "Convert And Mix Emoji To Sticker",
    type: "convert",
    example: "\nEmojimix : %prefix%command 🤔\nEmojimix 2 : %prefix%command 😅🤔",
    start: async(zenon, m, { args }) => {
        let [a, b] = args.join("")
        if (b) {
            zenon.sendFile(m.from, global.api("zenz", `/creator/emojimix`, {text: a, text2: b}, "apikey"), "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else {
            zenon.sendFile(m.from, global.api("zenz", `/creator/emojimix2`, {text: a}, "apikey"), "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        }
    },
    isQuery: true
}