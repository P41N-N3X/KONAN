const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "cnbc",
    alias: ["cnbcnews"],
    desc: "Latest News From CNBC",
    type: "news",
    example: `%prefix%command`,
    start: async(zenon, m, {}) => {
        let fetch = await fetchUrl(global.api("zenz", "/api/cnbc", {}, "apikey"))
        let caption = `Latest News From CNBC\n\n`
        for (let i of fetch.result) {
            caption += `⭔ News Title : ${i.berita}\n`
            caption += `⭔ Uploaded : ${i.berita_diupload}\n`
            caption += `⭔ Url : ${i.berita_url}\n\n`
        }
        zenon.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
    }
}
