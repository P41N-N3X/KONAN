const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "pinterest",
    alias: ["pinterestdl"],
    use: "<url>",
    desc: "Download Video From https://pinterest.com",
    type: "downloader",
    example: "%prefix%command <url>",
    start: async(zenon, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/downloader/pinterestdl", { url: isUrl(text)[0] }, "apikey"))
        zenon.sendFile(m.from, fetch.result, "", m, { caption: `Download Pinterest Video From : ${isUrl(text)[0]}` })
    },
    isQuery: true
}