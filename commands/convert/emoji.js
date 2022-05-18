const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "emoji",
    alias: ["emot", "emoticon"],
    use: "<query>",
    desc: "Convert Emoji To Sticker",
    type: "convert",
    example: `\nList Type :\n\n${type().sort((a, b) => a - b).join("\n")}\n\nEmoji : %prefix%command 🤔\nEmoji 2 : %prefix%command 🤔 <type>`,
    start: async(zenon, m, { args }) => {
        let [a, b] = args
        let fetch = await fetchUrl(global.api("zenz", "/creator/emoji", {query: a}, "apikey"))
        if (b) {
            switch(b.toLowerCase()) {
                case "apple": 
                    zenon.sendFile(m.from, fetch.result.apple, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "google":
                    zenon.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "samsung":
                    zenon.sendFile(m.from, fetch.result.samsung, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "microsoft":
                    zenon.sendFile(m.from, fetch.result.microsoft, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "whatsapp":
                    zenon.sendFile(m.from, fetch.result.whatsapp, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "twitter":
                    zenon.sendFile(m.from, fetch.result.twitter, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "facebook":
                    zenon.sendFile(m.from, fetch.result.facebook, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "skype":
                    zenon.sendFile(m.from, fetch.result.skype, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "joypixels":
                    zenon.sendFile(m.from, fetch.result.joypixels, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "openmoji":
                    zenon.sendFile(m.from, fetch.result.openmoji, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "emojidex":
                    zenon.sendFile(m.from, fetch.result.emojidex, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "notoemoji":
                    zenon.sendFile(m.from, fetch.result.noto_emoji, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "messenger":
                    zenon.sendFile(m.from, fetch.result.messenger, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "lg":
                    zenon.sendFile(m.from, fetch.result.LG, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "htc":
                    zenon.sendFile(m.from, fetch.result.HTC, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "mozilla":
                    zenon.sendFile(m.from, fetch.result.mozilla, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "softbank":
                    zenon.sendFile(m.from, fetch.result.softbank, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "docomo":
                    zenon.sendFile(m.from, fetch.result.docomo, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
                case "kddi":
                    zenon.sendFile(m.from, fetch.result.au_by_kddi, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
                break
            }
        } else {
            zenon.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        }
    },
    isQuery: true
}

function type() {
    return ["apple", "google","samsung", "microsoft", "whatsapp", "twitter", "facebook", "skype", "joypixels", "openmoji", "emojidex", "noto_emoji", "messanger", "lg", "htc", "mozilla", "softbank", "docomo", "kddi"]
}