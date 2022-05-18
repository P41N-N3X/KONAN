module.exports = {
    name: "cekpremium",
    alias: ["checkprem"],
    desc: "Premium Check Information",
    type: "users",
    example: "%prefix%command",
    isPremium: true,
    start: async(zenon, m) => {
        let cekprem = require("parse-ms")((await user.getPremiumExpired(m.sender, _user)) - Date.now())
        let caption = `*Expired :* ${cekprem.days} day ${cekprem.hours} hour ${cekprem.minutes} minute ${cekprem.seconds} Second`
        zenon.sendText(m.from, caption, m)
    }
}