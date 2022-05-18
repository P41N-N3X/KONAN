let { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "cerpen",
    alias: ["shortstory"],
    desc: "GenerateShortstory",
    type: "randomtext",
    example: `%prefix%command`,
    start: async(zenon, m, {}) => {
        let fetch = await fetchUrl(global.api("zenz", "/randomtext/cerpen", {}, "apikey"))
        let caption = `Generate Random Short Story :\n\n`
        caption += `⭔ Title : ${fetch.result.Judul}\n`
        caption += `⭔ Writer : ${fetch.result.Penulis}\n\n`
        caption += `⭔ The Story : ${fetch.result.cerita}\n\n`
        caption += `⭔ Source : ${fetch.result.sumber}\n`
        zenon.sendText(m.from, caption, m)
    }
}
