module.exports = {
    name: "sfwimage",
    alias: ["imagesfw"],
    desc: "Generate Random SFW Image From Nekoslife",
    type: "nekoslife",
    example: `List Type :\n\n${type().sort((a, b) => a - b).join("\n")}\n\nExample : %prefix%command <type>`,
    start: async(zenon, m, { text, toUpper }) => {
        let fetch = await global.api("zenz", "/api/anime/sfw/" + text, {}, "apikey")
        let buttons = [
            {buttonId: `sfwimage ${text}`, buttonText: { displayText: 'NEXT'}, type: 1 }
        ]
        let buttonMessage = {
            image: { url: fetch },
            caption: `Random SFW Image ${toUpper(text)}`,
            footer: `Powered By ͢ꪶ᳄ɪᴛs-ᴍᴇ  ͢ɴᴇxᴜs`,
            buttons: buttons,
            headerType: 4
        }
        zenon.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}

function type() {
    return ["waifu","gecg","avatar","kemonomimi","holo","meow","neko","fox_girl","wallpaper"]
}