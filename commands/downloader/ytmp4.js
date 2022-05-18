const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "ytmp4",
    alias: ["yt4"],
    use: "<url>",
    desc: "Download Media From https://youtube.com",
    type: "downloader",
    example: "%prefix%command <url>",
    start: async(zenon, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/downloader/ytmp4", { url: isUrl(text)[0] }, "apikey"))
        zenon.sendFile(m.from, fetch.result.url, "", m)
    },
    isQuery: true
}