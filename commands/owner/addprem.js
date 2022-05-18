module.exports = {
    name: "addprem",
    alias: ["premadd"],
    use: "<query>",
    desc: "Add Premium User to database",
    type: "owner",
	example: "\n\nExample: %prefix%command @tag 30d\nExample: %prefix%command 918782xxx 30d",
    start: async (zenon, m, { args, prefix, command }) => {
        if (args.length < 2) return m.reply(`Example: ${prefix + command} @tag 30d\nExample: %prefix%command 918782xxx 30d`)
		if (m.mentions.length !== 0) {
			for (let i = 0; i < m.mentions.length; i++) {
				user.addPremiumUser(m.mentions[0], args[1], _user);
			}
			m.reply("success");
		} else {
			user.addPremiumUser(args[0] + "@s.whatsapp.net", args[1], _user);
			m.reply("success");
		}
    },
    isOwner: true
}