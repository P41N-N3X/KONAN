const { fetchUrl } = require("../../lib/Function")


let timeout = 120000
let poin = 4999

module.exports = {
    name: "tebakgambar",
    alias: ["tgambar"],
    desc: "Entertaiment Fiture Tebak Gambar",
    type: "entertainment",
    start: async(zenon, m) => {
        let game = global.db.game.tebakgambar
        let id = "_game" + m.from
        if (id in game) {
            zenon.sendMessage(m.from, "There are still unfinished Susun Kata sessions", { quoted: game[id][0] })
            throw false
        }
        let res = await fetchUrl(global.api("zenz", "/api/tebakgambar", {}, "apikey"))
        let json = await res.result
        game[id] = [
            await zenon.sendFile(m.from, json.img, "", m, { caption: `Answers the following questions\n${json.deskripsi}\n\nTimeout *${(timeout / 1000).toFixed(2)} second(s)*`}),
            json, poin,
            setTimeout(async () => {
                if (game[id]) await m.reply(`Time has run out!\nthe answer is *${json.jawaban}*`)
                delete game[id]
            }, timeout)
        ]
    }
}