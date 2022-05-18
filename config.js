const fs = require("fs")
const chalk = require("chalk")

global.reloadFile = (file, options = {}) => {
    nocache(file, module => console.log(`File "${file}" has updated`))
}

// MAIN API
global.APIs = {
	zenz: 'https://zenzapis.xyz',
}

// APIKEY
global.APIKeys = {
	'https://zenzapis.xyz': 'Your Api plz',
}

// OPTIONS
global.options = {
    autoRead: true, //give false here to disable auto reading messages
    self: false, //give true here for only self work
    mute: false
}
global.prefa = /^[#$+.?_&<>!/\\]/
global.owner = ["918XXXX"] 
global.sessionName = {
    legacy: "/database/zenon-legacy.json",
    multi: "/database/zenon-multi.json"
}
global.botnam = "⚠︎𝚉𝚎𝚗𝚘𝚗⚠︎" //give your bot name , It doest have any much use🐦⚡
global.packname = "⚠︎𝚉𝚎𝚗𝚘𝚗⚠︎" // Give your Packname for sticker
global.author = "ʙʏ ɴᴇXᴜsɴW 𖠌" //Give your Sticker author name

// USERDATA
global.user = require("./data/user")
global.group = require("./data/group")
global._user = JSON.parse(fs.readFileSync("./database/user.json"))
global._group = JSON.parse(fs.readFileSync("./database/group.json"))
global.limitCount = 12

global.mess = (type, m) => {
    let msg = {
        wait: 'Wait, in progress',
        owner: 'This command can only be used by the Owner!',
        premium: 'This command can only be used by Premium! ',
        group: 'This command can only be used in groups!',
        private: 'This command can only be used in private chat!',
        admin: 'This command can only be used by group admins! ', 
        botAdmin: 'Bot is not admin, cant access the feature',
        bot: 'This feature can only be accessed by Bots',
        dead: 'This feature is being turned off!',
        media: 'Reply media',
        error: "No Results Found"
    }[type]
    if (msg) return m.reply(msg, m.from, { quoted: m })
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update File "${file}"`))
})
