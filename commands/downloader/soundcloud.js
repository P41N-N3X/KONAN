const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "soundcloud",
    alias: ["scdl"],
    use: "<url>",
    desc: "Download Media From https://soundcloud.com",
    type: "downloader",
    example: "%prefix%command <url>",
    start: async(zenon, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/downloader/soundcloud", { url: isUrl(text)[0] }, "apikey"))
        zenon.sendFile(m.from, fetch.result.url, "", m)
    },
    isQuery: true
}