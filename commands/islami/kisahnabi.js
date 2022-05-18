const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "storynabi",
    alias: ["nabi"],
    use: "<query>",
    desc: "The Story of the Prophet",
    type: "islami",
    example: "%prefix%command <nabi>\n%prefix%command Muhammad",
    start: async(zenon, m, { text }) => {
        if (text) {
            title = text.toLowerCase()
            let fetch = await fetchUrl(global.api("zenz", `/islami/kisahnabi/${title}`, {}, "apikey"))
            let teks = `⭔ Nama : ${fetch.result.name}\n⭔ Lahir : ${fetch.result.lahir}\n⭔ Umur : ${fetch.result.age}\n⭔ Lokasi : ${fetch.result.place}\n⭔ story :\n${fetch.result.story}`
            zenon.sendFile(m.from, "https://i.pinimg.com/originals/a6/81/c5/a681c55ca1bee611c39d3b4a58712dc3.jpg", "", m, { caption: teks })
        } else if (!text) {
            const sections = [{
                title: "story Nabi",
                rows: [
                    {title: "story Nabi Adam", rowId: "storynabi adam"},
                    {title: "story Nabi Idris", rowId: "storynabi idris"},
                    {title: "story Nabi Nuh", rowId: "storynabi nuh"},
                    {title: "story Nabi Hud", rowId: "storynabi hud"},
                    {title: "story Nabi Sholeh", rowId: "storynabi sholeh"},
                    {title: "story Nabi Ibrahim", rowId: "storynabi ibrahim"},
                    {title: "story Nabi Luth", rowId: "storynabi luth"},
                    {title: "story Nabi Ismail", rowId: "storynabi ismail"},
                    {title: "story Nabi Ishaq", rowId: "storynabi ishaq"},
                    {title: "story Nabi Yaqub", rowId: "storynabi yaqub"},
                    {title: "story Nabi Yusuf", rowId: "storynabi yusuf"},
                    {title: "story Nabi Ayyub", rowId: "storynabi ayyub"},
                    {title: "story Nabi Syuaib", rowId: "storynabi syuaib"},
                    {title: "story Nabi Musa", rowId: "storynabi musa"},
                    {title: "story Nabi Harun", rowId: "storynabi harun"},
                    {title: "story Nabi Dzulkifli", rowId: "storynabi dzulkifli"},
                    {title: "story Nabi Daud", rowId: "storynabi daud"},
                    {title: "story Nabi Sulaiman", rowId: "storynabi sulaiman"},
                    {title: "The story Nabi Ilyas", rowId: "storynabi ilyas"},
                    {title: "story Nabi Ilyasa", rowId: "storynabi ilyasa"},
                    {title: "story Nabi Yunus", rowId: "storynabi yunus"},
                    {title: "story Nabi Zakariya", rowId: "storynabi zakariya"},
                    {title: "story Nabi Yahya", rowId: "storynabi yahya"},
                    {title: "story Nabi Isa", rowId: "storynabi isa"},
                    {title: "story Nabi Muhammad", rowId: "storynabi muhammad"}
                ]
            }]
            const listMessage = {
                text: "List 25 Nabi",
                footer: `Powered By ͢ꪶ᳄ɪᴛs-ᴍᴇ  ͢ɴᴇxᴜs`,
                buttonText: "OPEN LIST",
                sections
            }
            const sendMsg = await zenon.sendMessage(m.from, listMessage, { quoted: m })
        }
    }
}