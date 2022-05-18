module.exports = {
    name: "menu",
    alias: ["help","?"],
    desc: "List all command",
    type: "main",
    noLimit: true,
    start: async(zenon, m, { commands, args, prefix, text, toUpper }) => {
        const { pushName, sender } = m
        if (args[0]) {
            let data = []
            let name = args[0].toLowerCase()
            let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias.includes(name))
            if (!cmd || cmd.type == "hide") return m.reply("No Command Found")
            else data.push(`*Command :* ${cmd.name.replace(/^\w/, c => c.toUpperCase())}`)
            if (cmd.alias) data.push(`*Alias :* ${cmd.alias.join(", ")}`)
            if (cmd.use) data.push(`*Use:* ${cmd.use}`);
            if (cmd.desc) data.push(`*Description :* ${cmd.desc}\n`)
            if (cmd.example) data.push(`*Example :* ${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
            return m.reply(`*Info Command ${cmd.name.replace(/^\w/, c => c.toUpperCase())}*\n\n${data.join("\n")}`)
        } else {
            let teks = `Hello, ${pushName === undefined ? sender.split("@")[0] : pushName}\nHere is the Command List\n\n`

            for (let type of commands.type) {
                teks += `┌──⭓ *${toUpper(type)} Menu*\n`
                teks += `│\n`
                teks += `${commands.list[type].filter(v => v.type !== "hide").map((cmd) => `│⭔ ${prefix + cmd.name} ${cmd.use ? " " + cmd.use : ""}`).join("\n")}\n`
                teks += `│\n`
                teks += `└───────⭓\n\n`
            }

            teks += `Send ${prefix}help followed by a command name to get detail of command, ex: ${prefix}help sticker`;
            let templateButtons = [
                { urlButton: { displayText: "Source Code", url: "https://github.com/nexusNw/Zenon" } },
                { urlButton: { displayText: "Tutorial Channel", url: "https://youtu.be/W-QCp2fWRTo" } },
                { quickReplyButton: { displayText: "Button 1", id: "#" } },
                { quickReplyButton: { displayText: "Button 2", id: "#" } },
                { quickReplyButton: { displayText: "Button 3", id: "#" } },
            ]
            
            let templateMessage = {
                image: { url: 'https://i.imgur.com/igU7FAm.jpg' },
                caption: teks,
                footer: `Powered By ${global.botnam}`,
                templateButtons: templateButtons
            }

            zenon.sendMessage(m.from, templateMessage, { quoted: m })
        }
    }
}
    
