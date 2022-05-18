module.exports = {
    name: "kannagen",
    alias: ["kannagenerator"],
    use: "<query>",
    desc: "Kanna Comment Maker",
    type: "creator",
    example: "%prefix%command <query>",
    start: async(zenon, m, { text }) => {
        zenon.sendFile(m.from, global.api("zenz", "/creator/kannagen", {text: text}, "apikey"), "", m)
    },
    isQuery: true
}