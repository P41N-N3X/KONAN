const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "joox",
    alias: ["jooxplay"],
    use: "<query>",
    desc: "Download Media From https://joox.com",
    type: "downloader",
    example: "%prefix%command <query>",
    start: async(zenon, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/downloader/joox", { query: text }, "apikey"))
        let teks = `⭔ Title : ${fetch.result.lagu}\n⭔ Album : ${fetch.result.album}\n⭔ Penyanyi : ${fetch.result.penyanyi}\n⭔ Publish : ${fetch.result.publish}`
        zenon.sendFile(m.from, fetch.result.img, "", m, { caption: teks })
        zenon.sendFile(m.from, fetch.result.mp3Link || fetch.result.mp4aLink, "", m)
    },
    isQuery: true
}