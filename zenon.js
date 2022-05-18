require("./config")
const { generateWAMessage, areJidsSameUser, proto } = require("@adiwajshing/baileys")
const { Simple, Collection, Function } = require("./lib")
const { isUrl, isNumber } = Function
const Func = require("./lib")
const fs = require("fs")
const moment = require("moment-timezone")
const chalk = require("chalk")
const util = require("util")
const { correct } = require("./lib/Correct")

global.db = JSON.parse(fs.readFileSync("./database/db.json"))
if (global.db) global.db = {
    sticker: {},
    database: {},
    chats: {},
    game: {},
    ...(global.db || {})
}

// Entertainment
let family100 = global.db.game.family100 = {}
let caklontog = global.db.game.caklontong = {}
let tebakgambar = global.db.game.tebakgambar = {}
let asahotak = global.db.game.asahotak = {}
let siapakahaku = global.db.game.siapakahaku = {}
let susunkata = global.db.game.susunkata = {}
let tekateki = global.db.game.tekateki = {}
let tebakbendera = global.db.game.tebakbendera = {}
let tebaklagu = global.db.game.tebaklagu = {}

module.exports = async (zenon, m, commands, chatUpdate) => {
    try {
        let { type, isGroup, sender, from } = m
        let body = (type == "buttonsResponseMessage") ? m.message[type].selectedButtonId : (type == "listResponseMessage") ? m.message[type].singleSelectReply.selectedRowId : (type == "templateButtonReplyMessage") ? m.message[type].selectedId : m.text 
        let metadata = isGroup ? await zenon.groupMetadata(from) : {}
        let pushname = isGroup ? metadata.subject : m.pushName
        let participants = isGroup ? metadata.participants : [sender]
        let groupAdmin = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : []
        let isBotAdmin = isGroup ? groupAdmin.includes(zenon.user?.jid) : false
        let isAdmin = isGroup ? groupAdmin.includes(sender) : false
        let isOwner = [zenon.user?.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
        
        let isAdmins = isGroup ? getAdmins(participants) : ""
        global.cekAdmin = (i) => isAdmins.includes(i)
        global.isBotAdmins = zenon.user.id.split(":")[0] + "@s.whatsapp.net"

        function getAdmins(a) {
            let admins = [];
            for (let ids of a) {
                !ids.admin ? "" : admins.push(ids.id);
            }
            return admins;
        }

        global.isPremium = user.checkPremiumUser(m.sender, _user)
        global.isAntidelete = group.cekAntidelete(m.from, _group)
        global.isOffline = group.cekOffline(from, _group)
        user.expiredCheck(zenon, m, _user);

        if (options.autoRead) (zenon.type == "legacy") ? await zenon.chatRead(m.key, 1) : await zenon.sendReadReceipt(from, sender, [m.id])
        if (options.mute && !isOwner) return
        if (options.self && !isOwner && !m.fromMe) return

        var prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi)[0] : Function.checkPrefix(prefa, body).prefix ?? "#"

        let isCmd = body.startsWith(prefix)
        let quoted = m.quoted ? m.quoted : m
        let mime = (quoted.msg || m.msg).mimetype
        let isMedia = /image|video|sticker|audio/.test(mime)
        let budy = (typeof m.text == "string" ? m.text : "")
        let args = body.trim().split(/ +/).slice(1)
        let text = q = args.join(" ")
        let cmdName = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const cmd = commands.get(cmdName) || Array.from(commands.values()).find((v) => v.alias.find((x) => x.toLowerCase() == cmdName)) || ""

        if (isOffline && cmdName && !isAdmin && !isOwner) return

        if (m.message && isGroup) {
            console.log("" + "\n" + chalk.black(chalk.bgWhite('[ GRUP ]')), chalk.black(chalk.bgBlueBright(isGroup ? metadata.subject : m.pushName)) + "\n" + chalk.black(chalk.bgWhite('[ TIME ]')), chalk.black(chalk.bgBlueBright(new Date)) + "\n" + chalk.black(chalk.bgWhite('[ FROM ]')), chalk.black(chalk.bgBlueBright(m.pushName + " @" + m.sender.split('@')[0])) + "\n" + chalk.black(chalk.bgWhite('[ BODY ]')), chalk.black(chalk.bgBlueBright(body || type)) + "\n" + "")
        }
        if (m.message && !isGroup) {    
            console.log("" + "\n" + chalk.black(chalk.bgWhite('[ PRIV ]')), chalk.black(chalk.bgRedBright('PRIVATE CHATT')) + "\n" + chalk.black(chalk.bgWhite('[ TIME ]')), chalk.black(chalk.bgRedBright(new Date)) + "\n" + chalk.black(chalk.bgWhite('[ FROM ]')), chalk.black(chalk.bgRedBright(m.pushName + " @" + m.sender.split('@')[0])) + "\n" + chalk.black(chalk.bgWhite('[ BODY ]')), chalk.black(chalk.bgRedBright(body || type)) + "\n" + "")
        }
       

        // Sticker Command
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString("hex") in global.db.sticker)) {
            let hash = global.db.sticker[m.msg.fileSha256.toString("hex")]
            let { text, mentions } = hash
            let messages = await generateWAMessage(m.from, { text, mentions }, {
                userJid: zenon.user.jid,
                quoted: m.quoted && m.quoted.fakeObj
            })
            messages.key.fromMe = await areJidsSameUser(m.sender, zenon.user.jid)
            messages.key.id = m.id
            messages.pushName = m.pushName
            if (m.isGroup) messages.participant = m.sender
            let msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)],
                type: "append"
            }
            zenon.ev.emit("messages.upsert", msg)
        }

        // Database
        try {
            let chat = global.db.chats[m.from]
            if (typeof chat !== "object") global.db.chats = {}
            if (chat) {
                if (!('antidelete' in chat)) chat.antidelete = true
            } else global.db.chats[m.from] = {
                antidelete: true
            }
        } catch(e) {
            console.error(e)
        }

        // - Write
        setInterval(() => {
            fs.writeFileSync('./database/db.json', JSON.stringify(global.db, null, 2))
        }, 15 * 1000)

        // Anti Delete
        if (isAntidelete && m.message && m.message.protocolMessage && m.message.protocolMessage.type == 0) {
            if (!db.chats[m.from].antidelete) return
            let key = m.message.protocolMessage.key
            let msg = await zenon.serializeM(await Store.loadMessage(key.remoteJid, key.id))
            let teks = `「 Message Delete Detect 」\n\n⬡ Name : ${msg.pushName}\n⬡ User : @${msg.sender.split("@")[0]}\n⬡ Date : ${moment(msg.messageTimestamp * 1000).tz("Asia/Kolkata")}\n⬡ Type : ${msg.type}\n`
            let tekss = teks.replace("GMT+0530", "")
            zenon.relayMessage(m.from, msg.message, { messageId: msg.id })
            await zenon.sendText(m.from, tekss, msg, { mentions: [msg.sender] })
        }
        
        // Entertaiment
        try {
            let threshold = 0.72
            if (("game_" + m.from in family100)) {
                let id = "game_" + m.from
                let room = family100[id]
                let teks = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
                let isSurender = /^((me)?nyerah|surr?ender)$/i.test(m.text.toLowerCase())
                if (!isSurender) {
                    let index = room.jawaban.indexOf(teks)
                    if (index < 0) {
                        if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => correct(jawaban, [teks]))) >= threshold) m.reply("Almost Correct Answer")
                        return !0
                    }
                    if (room.terjawab[index]) return !0
                    room.terjawab[index] = sender
                    //global.db.users[sender].exp += room.winScore
                }
                let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
                let caption = `
*Question :* ${room.soal}

There is *${room.jawaban.length}* answers${room.jawaban.find(v => v.includes(' ')) ? `
(some answers have spaces)
`: ''}
${isWin ? `*All Answers Answered*` : isSurender ? '*Surrender!*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
            return isSurender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
        }).filter(v => v).join('\n')}
${isSurender ? '' : ``}
                `.trim()
                let msg = await zenon.sendMessage(m.from, { text: caption, mentions: zenon.parseMention(caption) }, { quoted: m })
                room.msg = msg
                if (isWin || isSurender) delete family100["game_" + m.from]

                return !0
            }

            // Cak Lontong
            if (("game_" + m.from in caklontog)) {
                let id = "game_" + m.from
                if (!(id in caklontog)) return m.reply("Cak Lontong game session has ended")
                if (m._data.quotedStanzaID == caklontog[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(caklontog[id][1]))
                    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\n${json.deskripsi}`)
                        clearTimeout(caklontog[id][3])
                        delete caklontog[id]
                    } else if (correct(m.text.toLowerCase(), [json.jawaban.toLowerCase().trim()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }

            // Tebak Gambar
            if (("game_" + m.from in tebakgambar)) {
                let id = "game_" + m.from
                if (!(id in tebakgambar)) return m.reply("tebak gambar game session has ended")
                if (m._data.quotedStanzaID === tebakgambar[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(tebakgambar[id][1]))
                    if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\n${json.jawaban}\n${json.deskripsi}`)
                        clearTimeout(tebakgambar[id][3])
                        delete tebakgambar[id]
                    } else if (correct(m.text.toLowerCase(), [json.jawaban.toLowerCase()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }

            // Asah Otak
            if (("game_" + m.from in asahotak)) {
                let id = "game_" + m.from
                if (!(id in asahotak)) return m.reply("Asah Otak game session has ended")
                if (m._data.quotedStanzaID == asahotak[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(asahotak[id][1]))
                    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\n${json.jawaban}`)
                        clearTimeout(asahotak[id][3])
                        delete asahotak[id]
                    } else if (correct(m.text.toLowerCase(), [json.jawaban.toLowerCase().trim()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }

            // SIapakah Aku
            if (("game_" + m.from in siapakahaku)) {
                let id = "game_" + m.from
                if (!(id in siapakahaku)) return m.reply("Siapakah Aku game session has ended")
                if (m._data.quotedStanzaID == siapakahaku[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(siapakahaku[id][1]))
                    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\n${json.jawaban}`)
                        clearTimeout(siapakahaku[id][3])
                        delete siapakahaku[id]
                    } else if (correct(m.text.toLowerCase(), [json.jawaban.toLowerCase().trim()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }

            // Susun Kata
            if (("game_" + m.from in susunkata)) {
                let id = "game_" + m.from
                if (!(id in susunkata)) return m.reply("Susun Kata game session has ended")
                if (m._data.quotedStanzaID == susunkata[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(susunkata[id][1]))
                    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\n${json.jawaban}`)
                        clearTimeout(susunkata[id][3])
                        delete susunkata[id]
                    } else if (correct(m.text.toLowerCase(), [json.jawaban.toLowerCase().trim()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }

            // Tebak Bendera
            if (("game_" + m.from in tebakbendera)) {
                let id = "game_" + m.from
                if (!(id in tebakbendera)) return m.reply("Tebak Bendera game session has ended")
                if (m._data.quotedStanzaID === tebakbendera[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(tebakbendera[id][1]))
                    if (m.text.toLowerCase() === json.name.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\n${json.name}`)
                        clearTimeout(tebakbendera[id][3])
                        delete tebakbendera[id]
                    } else if (correct(m.text.toLowerCase(), [json.name.toLowerCase()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }

            // Tebak Lagu
            if (("game_" + m.from in tebaklagu)) {
                let id = "game_" + m.from
                if (!(id in tebaklagu)) return m.reply("Tebak Bendera game session has ended")
                if (m._data.quotedStanzaID == tebaklagu[id][0].id.id) {
                    let json = JSON.parse(JSON.stringify(tebaklagu[id][1]))
                    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
                        //global.db.users[sender].exp += caklontong[id][2]
                        await m.reply(`Right Answer!\nTitle : ${json.jawaban}\nArtist : ${json.artist}`)
                        clearTimeout(tebaklagu[id][3])
                        delete tebaklagu[id]
                    } else if (correct(m.text.toLowerCase(), [json.jawaban.toLowerCase()]) >= threshold)
                        m.reply("Almost Right")
                    else
                        m.reply("Wrong Answer")
                }

                return !0
            }
        } catch (e) {
            console.error(e)
        }

    if (!isOffline && isCmd && !cmd) {
            var array = Array.from(commands.keys());
            Array.from(commands.values()).map((v) => v.alias).join(" ").replace(/ +/gi, ",").split(",").map((v) => array.push(v))

            var anu = correct(cmdName, array)
            var alias = commands.get(anu.result) || Array.from(commands.values()).find((v) => v.alias.find((x) => x.toLowerCase() == anu.result)) || ""
console.log(anu)
            teks = `
Command *Not Found!*
Maybe you mean is 

*_Command :_* ${prefix + anu.result}
*_Alias :_* ${alias.alias.join(", ")}

_Send command again if needed_
            `
            m.reply(teks)
        } else if (!cmd) return

        if (cmd.isPremium && !isPremium) {
			return global.mess("premium", m)
		}

     //if (cmd.isLimit && !isPremium) {
        //    if (user.isLimit(m.sender, isPremium, isOwner, limitCount, _user) && !m.fromMe)
        //    return m.reply(`Your limit has run out, please send ${prefix}limit to check the limit`);
        //    user.limitAdd(m.sender, isPremium, isOwner, _user);
        //}

        if (cmd.isMedia && !isMedia) {
            return global.mess("media", m)
        }

        if (cmd.isOwner && !isOwner) {
			return global.mess("owner", m)
		}

        if (cmd.isGroup && !isGroup) {
            return global.mess("group", m)
        }

        if (cmd.isPrivate && isGroup) {
            return global.mess("private", m)
        }

        if (cmd.isBotAdmin && !isBotAdmin) {
            return global.mess("botAdmin", m)
        }

        if (cmd.isAdmin && !isAdmin) {
            return global.mess("admin", m)
        }

        if (cmd.isBot && m.fromMe) {
            return global.mess("bot", m)
        }

        if (cmd.disable == true && cmd.disable == false) {
            return global.mess("dead", m)
        }

        if (cmd.desc && text.endsWith("--desc")) return m.reply(cmd.desc)
        if (cmd.example && text.endsWith("--use")) {
            return m.reply(`${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
        }

        if (cmd.isQuery && !text) {
            return m.reply(`${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
        }

        try {
			if (cmd && !cmd.noLimit) {
                if (isGroup) group.addGroup(m.from)
                user.addUser(m.sender, m.pushName, _user)
                if (user.isLimit(m.sender, isPremium, isOwner, limitCount, _user) && !m.fromMe)
				return m.reply(`Your limit has run out, please send ${prefix}limit to check the limit`);
				user.limitAdd(m.sender, isPremium, isOwner, _user);
			}
			cmd.start(zenon, m, {
                name: 'zenon',
                metadata,
                pushName: pushname,
                participants,
                body,
                args,
                text,
                quoted,
                mime,
                prefix,
                command: cmd.name,
                commands,
                Function: Func,
                toUpper: function toUpper(query) {
                    return query.replace(/^\w/, c => c.toUpperCase())
                }
            })
		} catch (e) {
			console.error(e);
		}
    } catch (e) {
        console.log(e)
    }
}

global.reloadFile(__filename)
