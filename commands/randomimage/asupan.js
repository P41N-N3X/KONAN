let { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "asupan",
    alias: ["randomasupan"],
    desc: "Generate Random TikTok Asupan",
    type: "randomimage",
    example: `%prefix%command`,
    start: async(zenon, m, {}) => {
        let fetch = await global.api("zenz", "/api/random/asupan", {}, "apikey")
        zenon.sendFile(m.from, fetch, "", m, { caption: "Random TikTok Asupan" })
    }
}