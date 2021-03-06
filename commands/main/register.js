module.exports = {
    name: "register",
    alias: ["verify"],
    desc: "Add User To Database",
    type: "main",
    example: "%prefix%command",
    noLimit: true,
    start: async(zenon, m) => {
        const { pushName, sender } = m
        const namaUser = `${pushName === undefined ? sender.split("@")[0] : pushName}`
        user.addUser(m.sender, namaUser, _user)
        zenon.sendText(m.from, "success", m)
    }
}
    
