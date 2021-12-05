/*
*
*         BASE : MhankBarbar
*         Remodifikasi : Zebri Junitu
*
*/

// MODULE
const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const canvas = require('./src/welcome/index')
const moment = require("moment-timezone")
const fs = require("fs")
let util = require('util')
let path = require('path')
const speed = require('performance-now')
const { Utils_1, decryptWA } = require('./node_modules/@adiwajshing/baileys/lib/WAConnection/Utils')
const tiktod = require('tiktok-scraper')
const axios = require("axios")
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const imageToBase64 = require('image-to-base64');
const { removeBackgroundFromImageFile } = require('remove.bg')
const { spawn, exec, execSync } = require("child_process")
const fetchs = require("node-superfetch");
const ms = require('parse-ms')
const toMs = require('ms')
const db = require('quick.db')
const pokemon = require('pokemontcgsdk')
const prompt = require('prompt')

/* CALLBACK */
const { menu, menu1, menu2, menu3, menu4, menu5, menuself, listsurah, bahasa, bahasatranslate } = require('./lib/help', { encoding: 'utf-8' })
const { corona, wait, surah, uploadImages, customText, quotemaker, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const urlShortener = require('./lib/shortener')
const getLocationData = require('./lib/location')
const yts = require('yt-search')
const get = require('got')
const google = require('google-it')
const genshin = require('genshin')
const afk = require('./lib/afk')
const { yta, ytv } = require('./lib/y2mate')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { error } = require("qrcode-terminal")
const { exif } = require('./lib/exif')
const { brotliDecompress } = require("zlib")

/* DATABASE */
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const publikchat = JSON.parse(fs.readFileSync('./src/publik.json'))
const afkdatabase = JSON.parse(fs.readFileSync('./src/afk-taggc.json'))
let { afkkontak, afktag, isSelfOnlys, publik } = JSON.parse(fs.readFileSync('./config.json'))
const setiker = JSON.parse(fs.readFileSync('./src/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./src/video.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./src/image.json'))
const truth = JSON.parse(fs.readFileSync('./src/truth.json'))
const dare = JSON.parse(fs.readFileSync('./src/dare.json'))
const config = JSON.parse(fs.readFileSync('./config.json'))
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const _nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))

if (!db.has('dito.prefix')) {
	db.set('dito.prefix', 'd')
}

prefix = db.get('dito.prefix')
publik = false
fake = '*Junito Milk*'
numbernye = '0'
targetprivate = '6289523258649'
ghoibsu = 'tes'
myteks = 'okeh nyala'
welcome = 'Semoga betah!'
left = 'Latom!'
blocked = []
pokemon.configure({ apikey: '6992d975-85e1-4d4c-a7c3-ccdaecfa2c88' })

// FUNCTION
function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);
	return `「 *RUNTIME* 」\n${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`
}

function clean(text) {
	if (typeof (text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

function isSelfOnly(sender) {
	if (isSelfOnlys == true) {
		return false
	} else {
		return true
	}
}

function convertBalanceToString(angka) {
	var balancenyeini = '';
	var angkarev = angka.toString().split('').reverse().join('');
	for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
	return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
}

function addMetadata(packname, author) {
	if (!packname) packname = `${config.packname}`; if (!author) author = ` ${config.author}`;
	author = author.replace(/[^a-zA-Z0-9]/g, '');
	let name = `${author}_${packname}`

	if (fs.existsSync(`./src/sticker/${name}.exif`)) {
		return `./src/sticker/${name}.exif`
	}
	const json = {
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}

	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]

	let len = JSON.stringify(json).length
	let last

	if (len > 256) {
		len = len - 256
		bytes.unshift(0x01)
	} else {
		bytes.unshift(0x00)
	}

	if (len < 16) {
		last = len.toString(16)
		last = "0" + len
	} else {
		last = len.toString(16)
	}

	const buf2 = Buffer.from(last, "hex")
	const buf3 = Buffer.from(bytes)
	const buf4 = Buffer.from(JSON.stringify(json))

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])

	fs.writeFile(`./src/sticker/${name}.exif`, buffer, (err) => {
		return `./src/sticker/${name}.exif`
	}
	)
}

function sendImageFromUrl(f, u, c = '', id) {
	imageToBase64(u)
		.then(data => {
			var options = {
				quoted: id,
				caption: c
			}
			var buffer = Buffer.from(data, 'base64')
			client.sendMessage(f, buffer, MessageType.image, options)
		})
}

const liriklagu = async (lagu) => {
	const response = await fetch(`http://scrap.terhambar.com/lirik?word=${lagu}`)
	if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
	const json = await response.json()
	if (json.status === true) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
	return `[ Error ] Lirik Lagu ${lagu} tidak di temukan!`
}

function serialize(chat) {
	m = JSON.parse(JSON.stringify(chat))
	content = m.message
	//.text = m.message.conversation 
	m.isGroup = m.key.remoteJid.endsWith('@g.us')
	try {
		const berak = Object.keys(content)[0]
		m.type = berak
	} catch {
		m.type = null
	}
	try {
		const context = m.message.extendedTextMessage.contextInfo.quotedMessage
		m.quoted = context
	} catch {
		m.quoted = null
	}

	try {
		const mention = m.message[m.type].contextInfo.mentionedJid
		m.mentionedJid = mention
	} catch {
		m.mentionedJid = null
	}

	if (m.isGroup) {
		m.sender = m.participant
	} else {
		m.sender = m.key.remoteJid
	}
	if (m.key.fromMe) {
		m.sender = client.user.jid
	}
	txt = (m.type === 'conversation' && m.message.conversation) ? m.message.conversation : (m.type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.type == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : ""
	m.text = txt
	return m
}

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const client = new WAConnection()

client.on('qr', qr => {
	qrcode.generate(qr, { small: true })
	console.log(`[ ${time} ] QR code is ready`)
})

fs.existsSync('./auth_info.json') && client.loadAuthInfo('./auth_info.json')

client.connect();

client.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
		blocked.push(i.replace('c.us', 's.whatsapp.net'))
	}
})

// FUNCTION ANTI DELETE
client.on('message-update', async (geps) => {
	try {
		const from = geps.key.remoteJid
		const messageStubType = WA_MESSAGE_STUB_TYPES[geps.messageStubType] || 'MESSAGE'
		const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
		const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
		const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
		let sender = geps.key.fromMe ? client.user.jid : geps.key.remoteJid.endsWith('@g.us') ? geps.participant : geps.key.remoteJid
		const isRevoke = geps.key.remoteJid.endsWith('@s.whatsapp.net') ? true : geps.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
		const isCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
		const isBanCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
		if (messageStubType == 'REVOKE') {
			console.log(`Status untuk grup : ${!isRevoke}\nStatus semua kontak : ${!isCtRevoke}\nStatus kontak dikecualikan : ${!isBanCtRevoke}`)
			if (!isRevoke) return
			if (!isCtRevoke) return
			if (!isBanCtRevoke) return
			const from = geps.key.remoteJid
			const isGroup = geps.key.remoteJid.endsWith('@g.us') ? true : false
			let int
			let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
			const id_deleted = geps.key.id
			const conts = geps.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
			const pushname = geps.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
			const opt4tag = {
				contextInfo: { mentionedJid: [sender] }
			}
			for (let i = 0; i < infoMSG.length; i++) {
				if (infoMSG[i].key.id == id_deleted) {
					const dataInfo = infoMSG[i]
					const type = Object.keys(infoMSG[i].message)[0]
					const timestamp = infoMSG[i].messageTimestamp
					int = {
						no: i,
						type: type,
						timestamp: timestamp,
						data: dataInfo
					}
				}
			}
			const index = Number(int.no)
			const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
			const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
			var itsme = `${numbernye}@s.whatsapp.net`
			var split = `${fake}`
			// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
			var selepbot72 = {
				contextInfo: {
					participant: itsme,
					quotedMessage: {
						extendedTextMessage: {
							text: split,
						}
					},
					mentionedJid: [sender]
				}
			}
			if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
				const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Text
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
				client.sendMessage(from, strConversation, MessageType.text, selepbot72)
			} else if (int.type == 'stickerMessage') {
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				const pingbro23 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await client.downloadAndSaveMediaMessage(int.data, `./media/sticker/${filename}`);
				const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Sticker
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
`

				const buff = fs.readFileSync(savedFilename)
				client.sendMessage(from, strConversation, MessageType.text, opt4tag)
				client.sendMessage(from, buff, MessageType.sticker, pingbro23)
				// console.log(stdout)
				fs.unlinkSync(savedFilename)

			} else if (int.type == 'imageMessage') {
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				const pingbro22 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await client.downloadAndSaveMediaMessage(int.data, `./media/image/${filename}`);
				const buff = fs.readFileSync(savedFilename)
				const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Image
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}\`\`\`
`
				client.sendMessage(from, buff, MessageType.image, { contextInfo: { mentionedJid: [sender] }, caption: strConversation })
				fs.unlinkSync(savedFilename)
			}
		}
	} catch (e) {
		console.log('Message : %s', color(e, 'green'))
		// console.log(e)
	}
})

client.on('group-participants-update', async (anu) => {
	if (!welkom.includes(anu.jid)) return
	let v = anu.participants[0] === client.user.jid ? client.user : client.contacts[anu.participants[0]]
	try {
		const mdata = await client.groupMetadata(anu.jid)
		if (anu.action == 'add') {
			num = anu.participants[0]
			try {
				ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
			} catch {
				ppimg = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
			}
			console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32mRECEIVED\x1b[1;37m]\n',
				` Date: ${time}\n`,
				color(' Type : Welcome\n'),
				' From :', color(`${anu.participants[0].split('@')[0]}\n`),
				' Action :', color('add'),
			)
			try {
				ppgrup = await client.getProfilePicture(anu.jid)
			} catch {
				ppgrup = 'https://1.bp.blogspot.com/-2AvLT6XF2Bc/Xj0kfIIOu8I/AAAAAAAAAQ4/jFMCuF9eY60nCM0LQRaCMYj6JYyAYbLpQCLcBGAsYHQ/s1600/c2fd8c1a50c6f7e91c7aab508ba85cb6--manga-girl-manga-anime.jpg'
			}
			const welcomer = await new canvas.Welcome()
				.setUsername(v.notify)
				.setDiscriminator(anu.jid.split('-')[1].substring(6, 10))
				.setMemberCount(mdata.participants.length)
				.setGuildName(mdata.subject)
				.setAvatar(ppimg)
				.setColor('border', '#000033')
				.setColor('username-box', '#000066')
				.setColor('discriminator-box', '#000066')
				.setColor('message-box', '#000066')
				.setColor('title', '#9900ff')
				.setBackground(ppgrup)
				.toAttachment()
			teks = `MEMBER BARU DI GROUP\n*${mdata.subject}*\n============================\nUser : @${num.split('@')[0]}\n============================\n${welcome}`
			client.sendMessage(mdata.id, welcomer.toBuffer(), MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
		} else if (anu.action == 'remove') {
			num = anu.participants[0]
			try {
				ppimg = await client.getProfilePicture(`${num.split('@')[0]}`)
			} catch {
				ppimg = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
			}
			console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32mRECEIVED\x1b[1;37m]\n',
				` Date: ${time}\n`,
				color(' Type : Welcome\n'),
				' From :', color(`${anu.participants[0].split('@')[0]}\n`),
				' Action :', color('remove'),
			)
			try {
				ppgrup = await client.getProfilePicture(anu.jid)
			} catch {
				ppgrup = 'https://1.bp.blogspot.com/-2AvLT6XF2Bc/Xj0kfIIOu8I/AAAAAAAAAQ4/jFMCuF9eY60nCM0LQRaCMYj6JYyAYbLpQCLcBGAsYHQ/s1600/c2fd8c1a50c6f7e91c7aab508ba85cb6--manga-girl-manga-anime.jpg'
			}
			const par = anu.participants
			const goodbyer = await new canvas.Goodbye()
				.setUsername(v.notify)
				.setDiscriminator(anu.jid.split('-')[1].substring(6, 10))
				.setMemberCount(mdata.participants.length)
				.setGuildName(mdata.subject)
				.setAvatar(ppimg)
				.setColor('border', '#000033')
				.setColor('username-box', '#000066')
				.setColor('discriminator-box', '#000066')
				.setColor('message-box', '#000066')
				.setColor('title', '#9900ff')
				.setBackground(ppgrup)
				.toAttachment()
			teks = `MEMBER YANG OUT/REMOVED DARI GROUP\n*${mdata.subject}*\n============================\nUser : @${num.split('@')[0]}\n============================\n${left}`
			let buff = await getBuffer(ppimg)
			client.sendMessage(mdata.id, goodbyer.toBuffer(), MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
		}
	} catch (e) {
		console.log('Error : %s', color(e, 'red'))
	}
})

client.on('chat-update', async (mek) => {
	try {
		if (!mek.hasNewMessage) return
		if (!mek.messages && !mek.count) return

		mek = mek.messages.all()[0]

		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		//if (!mek.key.fromMe) return
		let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
		infoMSG.push(JSON.parse(JSON.stringify(mek)))
		fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
		const urutan_pesan = infoMSG.length
		if (urutan_pesan === 5000) {
			infoMSG.splice(0, 4300)
			fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
		}

		global.blocked
		const content = JSON.stringify(mek.message)
		const messageContent = mek.message
		const msg = serialize(mek)
		const from = mek.key.remoteJid
		const isPublikChat = mek.key.fromMe == false
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		const type = Object.keys(messageContent)[0]
		body = (type === MessageType.text && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
		budy = (type === MessageType.text) ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')


		mess = {
			yt: (title, filesize) => `*Judul:* ${title}\n*Filesize:* ${filesize}`,
			sizeExceed: size => `*Filesize:* ${size}\n*Limit:* 40 MB`,
			wait: 'Meluncur ~',
			success: 'Berhasil!',
			afkalready: 'AFK sudah diaktifkan sebelumnya...',
			afkgroupalready: 'AFK digroup ini sudah diaktifkan sebelumnya',
			wrongFormat: 'Format salah, coba liat lagi di menu',
			afkdisable: 'Afk berhasil di matikan!',
			afkenable: 'AFK berhasil diaktifkan!',
			publikdisable: 'Publik mode berhasil di matikan!',
			publikenable: 'Publik mode berhasil diaktifkan!',
			publiksaha: 'Kamu Siapa ?!',
			sedangafk: 'Maaf saya sedang offline, silahkan coba beberapa saat lagi\n\n_SELF-BOT_',
			error: {
				stick: 'bukan sticker itu:v',
				Iv: 'Linknya mokad:v'
			},
			only: {
				group: 'Khusus grup ngab',
				ownerG: 'Khusus owner grup ngab',
				ownerB: 'Lahh?',
				admin: 'Mimin grup only bruh...',
				Badmin: 'Jadiin gw admin dlu:v'
			}
		}

		const botNumber = client.user.jid
		const botNumberss = client.user.jid + '@c.us'
		const isGroup = from.endsWith('@g.us')
		let sender = isGroup ? mek.participant : mek.key.remoteJid
		// const isSelfNumber = config.NomorSELF
		// const isOwner = sender.id === isSelfNumber
		const IDGroup = from.replace('@g.us', '')
		const totalchat = await client.chats.all()
		const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isAFKTAG = isGroup ? afkdatabase.includes(from) : false
		const isPersonAFK = db.has(`${IDGroup}.afk.${sender ? sender.split('@')[0] : botNumber.split('@')[0]}`)
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const groupId = isGroup ? groupMetadata.jid : ''
		const bamburuncing = sender ? sender.split("@")[0] : botNumber
		const isWelkom = isGroup ? welkom.includes(from) : false
		const isNsfw = isGroup ? _nsfw.includes(groupId) : false
		const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
		const usernamer = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
		const numberphone = sender.split('@')[0]
		const NamePeople = db.get(`${numberphone}.Name`)
		const TagPeople = db.get(`${numberphone}.Tag`)
		const InstaPeople = db.get(`${numberphone}.Instagram`)
		const PremiPeople = db.get(`${numberphone}.Premium`)
		const isPremMember = db.get(`${sender.split('@')[0]}.premium`) === true
		const afkPerson = db.get(`${IDGroup}.afk`)

		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}

		const reply = (teks) => {
			client.sendMessage(from, teks, text, { quoted: mek, detectLinks: false })
		}

		const sendMess = (hehe, teks) => {
			client.sendMessage(hehe, teks, text)
		}

		const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
		}

		const sendPtt = (audio) => {
			client.sendMessage(from, audio, mp3, { quoted: mek })
		}

		async function fakestatus(teks, fake) {
			abg = await getBuffer(client.getProfilePicture())
			client.sendMessage(from, teks, text, {
				quoted: {
					key: {
						fromMe: false,
						participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
					},
					message: {
						"imageMessage": {
							"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
							"mimetype": "image/jpeg",
							"caption": fake,
							"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
							"fileLength": "28777",
							"height": 1080,
							"width": 1079,
							"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
							"fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
							"directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
							"mediaKeyTimestamp": "1610993486",
							"jpegThumbnail": abg,
							"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
						}
					}
				}
			})
		}

		const fakegroup = (teks) => {
			client.sendMessage(from, teks, text, {
				quoted: {
					key: {
						fromMe: false,
						participant: `6281111111111@s.whatsapp.net`, ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
					},
					message: {
						conversation: fake
					}
				}
			})
		}

		// FUNCTION ANTI SPAM SAAT AFK
		const addChatAFK = (isPublikChat, expired) => {
			let obi = { id: isPublikChat, expired: Date.now() + toMs(`${expired}s`) }
			publikchat.push(obi)
			fs.writeFileSync('./src/publik.json', JSON.stringify(publikchat))
		}

		const cekWaktuAFKCHAT = (_dir, isPublikChat) => {
			setInterval(() => {
				let position = null
				Object.keys(publikchat).forEach((i) => {
					if (Date.now() >= publikchat[i].expired) {
						position = i
					}
				})
				if (position !== null) {
					publikchat.splice(position, 1)
					fs.writeFileSync('./src/publik.json', JSON.stringify(publikchat))
				}
			}, 1000)
		}

		const isAntiSpamAFK = (isPublikChat) => {
			let status = false
			Object.keys(publikchat).forEach((i) => {
				if (publikchat[i].id === isPublikChat) {
					status = true
				}
			})
			return status
		}

		if (!isGroup && afkkontak == true && isPublikChat) {
			if (isAntiSpamAFK(isPublikChat)) { return false; }
			reply(mess.sedangafk)
			addChatAFK(isPublikChat, 10)
			cekWaktuAFKCHAT(isPublikChat)
		} else if (isGroup) {
			if (msg.mentionedJid && !mek.key.fromMe) {
				for (let ment of msg.mentionedJid) {
					if (afk.checkAfkUser(ment, afkdatabase)) {
						const getId = afk.getAfkId(ment, afkdatabase)
						const getReason = afk.getAfkReason(getId, afkdatabase)
						const getTime = afk.getAfkTime(getId, afkdatabase)
						coli = `${ment.split('@')[0]}`
						mentions(mess.sedangafktag(getReason, getTime, coli), mentioned, true)
					}
				}
			} if (mek.key.fromMe) {
				if (afk.checkAfkUser(`${bamburuncing}`, afkdatabase) && body.startsWith('')) {
					afkdatabase.splice(afk.getAfkPosition(`${bamburuncing}`, afkdatabase), 1)
					fs.writeFileSync('./src/afk-taggc.json', JSON.stringify(afkdatabase))
					await reply(mess.afkdisable)
				}
			} else if (!mek.key.fromMe && afk.checkAfkUser(`${sender.split("@")[0]}@s.whatsapp.net`, afkdatabase) && body.startsWith('')) {
				afkdatabase.splice(afk.getAfkPosition(`${sender.split("@")[0]}@s.whatsapp.net`, afkdatabase), 1)
				fs.writeFileSync('./src/afk-taggc.json', JSON.stringify(afkdatabase))
				await reply(mess.afkdisable)
			}
		}

		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		if (!isGroup && isCmd) console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32m\x1b[4;31mEXECUTION\x1b[0m\x1b[1;37m]\n',
			` Date : ${time}\n`,
			' Command :', color(command, 'red'),
			'\n From :', color(sender.split('@')[0] + ` (${usernamer})\n`),
			' Args :', color(args.length))

		if (!isGroup && !isCmd) console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32mRECEIVED\x1b[1;37m]\n',
			` Date: ${time}\n`,
			' Type :', color('Message\n'),
			' From :', color(sender.split('@')[0] + ` (${usernamer})\n`),
			' Args :', color(args.length)
		)

		if (isCmd && isGroup) console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32m\x1b[4;31mEXECUTION\x1b[0m\x1b[1;37m]\n',
			` Date : ${time}\n`,
			' Command :', color(command, 'red'),
			'\n From :', color(sender.split('@')[0] + ` (${usernamer})\n`),
			' In :', color(`${groupName}\n`),
			' Args :', color(args.length))

		if (!isCmd && isGroup) console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32mRECEIVED\x1b[1;37m]\n',
			` Date : ${time}\n`,
			' Type :', color('Message\n'),
			' From :', color(sender.split('@')[0] + ` (${usernamer})\n`),
			' In :', color(`${groupName}\n`),
			' Args :', color(args.length)
		)
		if (mek.key.fromMe || !mek.key.fromMe && db.get('Dito.public') === true || db.get(`${numberphone}.owner`) === true) {
			if (true) {
				if (command) {
					if (!db.has(`${numberphone}.Premium`)) {
						db.set(`${numberphone}.Name`, `${usernamer}`)
						db.set(`${numberphone}.Premium`, false)
						db.set(`${numberphone}.Tag`, `${numberphone.substr(-4)}`)
						db.set(`${numberphone}.Instagram`, 'Nothing...')
						db.set(`${numberphone}.Wallet`, 500)
						db.set(`${numberphone}.Level`, 1)
						reply(`Nomor Terdaftar secara Otomatis!, cek ${prefix}status`)
						console.log('\n\x1b[1;31m=>\x1b[1;37m>', '[\x1b[1;32mQUICK DB\x1b[1;37m]\n', color(`${usernamer} ${sender.split('@')[0]} NEW`))
					}
					db.add(`${numberphone}.commands`, 1)
				}


				switch (command) {
					case 'public':
					case 'publik':
						if (!db.has(`${numberphone}.owner`)) return reply('Maaf, owner bot only...')
						if (args[0] === 'enable') {
							db.set('Dito.public', true)
							await fakegroup('Done!\nNow bot is on Public...')
						} else if (args[0] === 'disable') {
							db.set('Dito.public', false)
							await fakegroup('Done!\nNow bot is on Private...')
						} else {
							await fakegroup('Format salah, gunakan "enable / disable" untuk case "public"!')
						}
						break
					case 'hidetag':
						if (isPremMember) {
							funcpremi(premi)
						}
						if (!isGroup) return reply(mess.only.group)
						var value = body.slice(9)
						var group = await client.groupMetadata(from)
						var member = group['participants']
						var mem = []
						member.map(async adm => {
							mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
						})
						var optionshidetag = {
							text: value,
							contextInfo: { mentionedJid: mem },
							quoted: mek
						}
						client.sendMessage(from, optionshidetag, text)
						break
					case 'hackgrup':
						await client.toggleDisappearingMessages(
							from,
							WA_DEFAULT_EPHEMERAL
						)
						fakegroup('sukses hack grup')
						await client.toggleDisappearingMessages(from, 0)
						break
					case 'downsw':
						client.updatePresence(from, Presence.composing)
						if (isQuotedImage) {
							const swsw = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							cihcih = await client.downloadMediaMessage(swsw)
							client.sendMessage(from,
								cihcih,
								image,
								{ caption: 'Berhasil Mendownload Status Whatsapp.' })
						}
						else if (isQuotedVideo) {
							client.updatePresence(from, Presence.composing)
							const dwdwdw = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							dihdih = await client.downloadMediaMessage(dwdwdw)
							client.sendMessage(from,
								dihdih,
								video,
								{ caption: `Berhasil Mendownload Video Status Whatsapp.` }
							)
						}
						break
					case 'upswteks':
						if (!db.has(`${numberphone}.owner`)) {
							db.push(`${numberphone}.report`, 'upswteks!')
							return await reply(mess.publiksaha)
						}
						var upswteks = body.slice(10)
						var thetext = upswteks.split("|")[0];
						var code_bg = '0xff' + upswteks.split("|")[1];
						var code_text = '0xff' + upswteks.split("|")[2];
						var choosefont = upswteks.split("|")[3];

						client.sendMessage('status@broadcast', {
							text: `${thetext} `,
							backgroundArgb: `${code_bg} `,
							textArgb: `${code_text} `,
							font: `${choosefont} `
						}, 'extendedTextMessage')
						fakestatus(`Suskes Up Story Whatsapp\nText: ${thetext} \nbackground: ${code_bg} \nText Background: ${code_text} \nFont: ${choosefont}.`, 'Status Updated!')
						break
					case 'fakestatus':
						if (!q) return reply(mess.wrongFormat)
						fakestatus(`${body.slice(12).split("|")[0]}`, `${body.slice(12).split("|")[1]}`)
						break
					case 'fakedeface':
						var nn = body.slice(12)
						var urlnye = nn.split("|")[0];
						var titlenye = nn.split("|")[1];
						var descnye = nn.split("|")[2];
						imgbbb = require('imgbb-uploader')
						run = getRandom('.jpeg')
						encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ddatae = await imageToBase64(JSON.stringify(media).replace(/\"/gi, ''))

						client.sendMessage(from, {

							text: `${urlnye} `,

							matchedText: `${urlnye} `,

							canonicalUrl: `${urlnye} `,

							description: `${descnye} `,

							title: `${titlenye} `,

							jpegThumbnail: ddatae
						}, 'extendedTextMessage', { detectLinks: false })
						break
					case 'slowmo':
						encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.mp3')
						exec(`ffmpeg - i ${media} -filter: a "atempo=0.7,asetrate=44100" ${ran} `, (err, stderr, stdout) => {
							fs.unlinkSync(media)
							if (err) return fakegroup(`Error: ${err} `)
							hah = fs.readFileSync(ran)
							client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
							fs.unlinkSync(ran)
						})
						break
					case 'setname':
						if (!mek.key.fromMe) {
							db.push(`${sender.replace('@s.whatsapp.net', '')}.report`, 'setname!')
							return await reply(mess.publiksaha)
						}
						client.updatePresence(from, Presence.composing)
						if (!q) return fakegroup(wrongFormat)
						await client.updateProfileName(q)
						fakegroup(`Success ganti nama menjadi ${q} `)
						break
					case 'setpp':
						if (!mek.key.fromMe) {
							db.push(`${sender.replace('@s.whatsapp.net', '')}.report`, 'setpp!')
							return await reply(mess.publiksaha)
						}
						client.updatePresence(from, Presence.composing)
						if (!isQuotedImage) return fakegroup(mess.wrongFormat)
						enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						media = await client.downloadAndSaveMediaMessage(enmedia)
						await client.updateProfilePicture(botNumber, media)
						fakegroup('Success Mengganti Poto Profile')
						break
					case 'tovideo':
						if (!isQuotedSticker) return fakegroup(mess.wrongFormat)
						fakegroup(mess.wait)
						anumedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						anum = await client.downloadAndSaveMediaMessage(anumedia)
						ran = getRandom('.webp')
						exec(`ffmpeg - i ${anum} ${ran} `, (err) => {
							fs.unlinkSync(anum)
							if (err) return fakegroup(`Error: ${err} `)
							buffers = fs.readFileSync(ran)
							client.sendMessage(from, buffers, video, { quoted: mek, caption: 'DONE...' })
							fs.unlinkSync(ran)
						})
						break
					case 'shota':
						var itsme = `${numbernye} @s.whatsapp.net`
						var split = `${fake} `
						var selepbot = {
							contextInfo: {
								participant: itsme,
								quotedMessage: {
									extendedTextMessage: {
										text: split,
									}
								}
							}
						}
						{
							var items = ['shota anime', 'anime shota'];
							var nime = items[Math.floor(Math.random() * items.length)];
							var url = "https://api.fdci.se/rep.php?gambar=" + nime;

							axios.get(url)
								.then((result) => {
									var n = JSON.parse(JSON.stringify(result.data));
									var nimek = n[Math.floor(Math.random() * n.length)];
									imageToBase64(nimek)
										.then(
											(response) => {
												var buf = Buffer.from(response, 'base64');
												client.sendMessage(from, mess.wait, MessageType.text, selepbot)
												client.sendMessage(from, buf, MessageType.image, { caption: `SHOTA!`, quoted: mek })

											}
										)
										.catch(
											(error) => {
												console.log(error);
											}
										)

								});
						}
						break
					case 'ceklokasi': {
						if (!isQuotedLocation) return fakegroup('Kirim lokasi kamu lalu reply tag lokasimu dengan caption *!ceklokasi*')
						const lati = JSON.parse(JSON.stringify(mek.message.extendedTextMessage.contextInfo.quotedMessage.locationMessage.degreesLatitude))
						const longi = JSON.parse(JSON.stringify(mek.message.extendedTextMessage.contextInfo.quotedMessage.locationMessage.degreesLongitude))
						console.log(`Request Status Zona Penyebaran Covid - 19(${lati}, ${longi}).`)
						const zoneStatus = await getLocationData(lati, longi)
						if (zoneStatus.kode !== 200) fakegroup('Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
						let data = ''
						for (let i = 0; i < zoneStatus.data.length; i++) {
							const { zone, region } = zoneStatus.data[i]
							const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
							data += `${i + 1}.Kel. * ${region}* Berstatus * Zona ${_zone} `
						}
						const textx = `* CEK LOKASI PENYEBARAN COVID - 19 *\nHasil pemeriksaan dari lokasi yang anda kirim adalah * ${zoneStatus.status}* ${zoneStatus.optional} \n\nInformasi lokasi terdampak disekitar anda: \n${data} `
						fakegroup(textx)
					}
						break;
					case 'corona': {
						function intl(str) {
							var nf = Intl.NumberFormat();
							return nf.format(str);
						}
						if (args[0]) {
							if (args[0] === 'prov') {
								const province = body.slice(13).toLowerCase()
								axios.get('https://indonesia-covid-19.mathdro.id/api/provinsi/').then(({ data }) => {
									var founded = false
									data.data.find(i => {
										if (i.provinsi.toLowerCase() == province) {
											founded = true
											client.sendMessage(from, `_ * Kasus COVID19 di ${i.provinsi}* _
							😷 Positif: ${intl(i.kasusPosi)} kasus
							😇 Sembuh: ${intl(i.kasusSemb)} kasus
							😭 Meninggal: ${intl(i.kasusMeni)} kasus
==============================
======{ _*Tips kesehatan*_ }=======
✅Mencuci tangan dengan benar
✅Menggunakan masker
✅Menjaga daya tahan tubuh
✅Menerapkan physical distancing
======{ _*ZJ-Bot Information*_ }======
	`, text, { quoted: mek })
										}
									})
									if (founded == false) return client.sendMessage(from, `Provinsi ${province} tidak valid, gunakan format formal seperti : DKI Jakarta`, text, { quoted: mek })
								})
							}
						} else {
							corona().then(hasilCorona => {
								client.sendMessage(from, hasilCorona, text, { quoted: mek })
							}).catch(err => {
								console.log(err)
							})
						}
					}
						break
					case 'lyric':
					case 'lirik':
						if (!q) return fakestatus(mess.wrongFormat, "Lirik Apa Yang Mau Dicari?")
						const lagu = body.slice(7)
						console.log(lagu)
						const lirik = await liriklagu(lagu)
						reply(lirik)
						break
					case 'brainly':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							axios.get(`https://api.vhtear.com/branly?query=${args}&apikey=${config.VhtearKey}`).then((res) => {
								const resultbrainly = `͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏*「 Brainly 」*\n\n• ${res.data.result.data}`;
								fakegroup(resultbrainly)
							})
						} catch (err) {
							fakegroup(`Err: ${err}`)
						}
						break
					case 'grup':
						if (!isGroup) return fakegroup(mess.only.group)
						if (!isBotGroupAdmins) return fakegroup(mess.only.Badmin)
						if (args[0] === 'open') {
							client.groupSettingChange(from, GroupSettingChange.messageSend, false)
							await sleep(2000)
							fakegroup(`*SUCCES OPEN GRUP*`)
						} else if (args[0] === 'close') {
							await client.groupSettingChange(from, GroupSettingChange.messageSend, true)
							await sleep(2000)
							fakegroup(`*SUCCES CLOSE GRUP*`)
						}
						break
					case 'gcname':
						if (!q) return fakegroup(mess.wrongFormat)
						if (!isBotGroupAdmins) return fakegroup(`Jadi mimin dlu baru ubah`)
						await client.groupUpdateSubject(from, `${q}`)
						await sleep(2000)
						fakegroup(`*Success ganti nama grup ke ${q}*`)
						break
					case 'gcdesk':
						if (!q) return fakegroup(mess.wrongFormat)
						if (!isBotGroupAdmins) return fakegroup(`Jadi mimin dlu baru ubah`)
						await client.groupUpdateDescription(from, `${q}`)
						await sleep(2000)
						fakegroup(`*Success ganti deskripsi grup ke ${q}*`)
						break
					case 'runtime':
						runtime = process.uptime()
						teks = `${kyun(runtime)}`
						fakegroup(teks)
						break
					case 'yts':
						let tek1 = body.split(" ")
						tek12 = tek1.splice(1).join(" ")
						const r1 = await yts(tek12)
						const videos1 = r1.videos.slice(0, 5)
						i = 0
						pesan1 = `_*Reply tag pesan ini dengan cara*_\n_*${prefix}mp3/${prefix}mp4 [nomor]*_\n_*contoh: ${prefix}mp3 1*_\n\n`
						for (const isii of videos1) {
							i++
							var citrus = isii.title.split(" ");
							var der = citrus.slice(1, 10);
							var fa = citrus.length < 10 ? citrus : der + "..."
							var soto = fa.join(" ");
							pesan1 = pesan1 + `*(${i})*\n` + '*📜 Title* : _' + soto + '_' + '\n *👀 Views*: _' + convertBalanceToString(isii.views) + '_' + '\n*⏱️ Duration* : _' + isii.timestamp + '_' + '\n*🔗 Link* : _' + `>${isii.url}` + '_' + '\n\n'
							if (i <= videos1) {
								pesen1 = pesan1 + '\n\n'
							} else if (i > videos1) {
								break;
							}
						}
						const thumbyts = await getBuffer(r1.videos[0].thumbnail)
						await client.sendMessage(from, thumbyts, image, { quoted: mek, caption: pesan1 })
						break
					case 'mp3':
						try {
							if (isQuotedImage) {
								if (args.length === 0) return client.sendMessage(from, `*Format*: ${prefix}mp3 [nomor]\nContoh:\n${prefix}mp3 1`)
								const dataDownmp3 = text ? mek.message.extendedTextMessage.contextInfo.quotedMessage : image ? caption : ''
								const datamp3 = JSON.parse(JSON.stringify(dataDownmp3.imageMessage.caption))
								const pilur = datamp3.split('>')
								const mp3 = await yta(pilur[args[0]])
								const { thumb, title, filesize, filesizeF, dl_link } = mp3
								thumbmp3 = await getBuffer(thumb)
								const shortmp3 = await urlShortener(dl_link)
								if (filesize > '40' * 1000) return client.sendMessage(from, thumbmp3, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download:* ' + shortmp3 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + mess.sizeExceed(filesizeF) })
								client.sendMessage(from, thumbmp3, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download :*\n' + shortmp3 + '\n\n_*Tunggu sebentar bot sedang mengirim audio tersebut*_' })
								buffmp3 = await getBuffer(dl_link)
								client.sendMessage(from, buffmp3, audio, { mimetype: 'audio/mp4', filename: `${title}.mp3`, quoted: mek })
							}
						} catch (err) {
							client.sendMessage(from, `Ada kesalahan mungkin disebabkan oleh sistem`, text, { quoted: mek })
							console.log(err)
						}
						break
					case 'mp4':
						try {
							if (isQuotedImage) {
								if (args.length === 0) return client.sendMessage(from, `*Format*: ${prefix}mp4 [nomor]\nContoh:\n${prefix}mp4 1`)
								const dataDownmp3 = text ? mek.message.extendedTextMessage.contextInfo.quotedMessage : image ? caption : ''
								const datamp3 = JSON.parse(JSON.stringify(dataDownmp3.imageMessage.caption))
								const pilur = datamp3.split('>')
								const mp4 = await ytv(pilur[args[0]])
								const { thumb, title, filesize, filesizeF, dl_link } = mp4
								thumbmp4 = await getBuffer(thumb)
								const shortmp4 = await urlShortener(dl_link)
								if (filesize > '40' * 1000) return client.sendMessage(from, thumbmp4, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download:* ' + shortmp4 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + mess.sizeExceed(filesizeF) })
								client.sendMessage(from, thumbmp4, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download :*\n' + shortmp4 + '\n\n_*Tunggu sebentar bot sedang mengirim video tersebut*_' })
								buffmp4 = await getBuffer(dl_link)
								client.sendMessage(from, buffmp4, video, { quoted: mek, caption: mess.yt(title, filesizeF) })

							}
						} catch (err) {
							client.sendMessage(from, `Ada kesalahan mungkin disebabkan oleh sistem`, text, { quoted: mek })
							console.log(err)
						}
						break
					case 'play': {
						fakegroup(mess.wait)
						let konts = body.split(" ")
						if (!q) {
							client.sendMessage(from, `Mohon masukan query !!\nFormat: ${prefix}play [optional]\nContoh: ${prefix}play Hikaru Nara`, text, { quoted: mek })
						} else {
							konts = konts.splice(1).join(" ")
							const kontl = await yts(konts)
							const video = kontl.all.find((value) => value.seconds <= 600)
							if (!video) {
								client.sendMessage(from, "Musik tidak ditemukan :(", text, { quoted: mek })
							} else {
								const play = await yta(video.url)
								const { thumb, title, filesize, filesizeF, dl_link } = play
								thumbplay = await getBuffer(thumb)
								const shortplay = await urlShortener(dl_link)
								if (filesize > '40' * 1000) return client.sendMessage(from, thumbplay, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download:* ' + shortplay + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + mess.sizeExceed(filesizeF) })
								client.sendMessage(from, thumbplay, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download :*\n' + shortplay + '\n\n_*Tunggu sebentar bot sedang mengirim audio tersebut*_' })
								buffplay = await getBuffer(dl_link)
								client.sendMessage(from, buffplay, audio, { mimetype: 'audio/mp4', filename: `${title}.mp3`, quoted: mek })
							}
						}
					}
						break
					case 'ytmp3': {
						if (!q) return fakegroup(mess.wrongFormat)
						const yt3 = await yta(q)
						const { thumb, title, filesize, filesizeF, dl_link } = yt3
						thumbytmp3 = await getBuffer(thumb)
						const shortyt3 = await urlShortener(dl_link)
						if (filesize > '40' * 1000) return client.sendMessage(from, thumbytmp3, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download:* ' + shortyt3 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + mess.sizeExceed(filesizeF) })
						client.sendMessage(from, thumbytmp3, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download :*\n' + shortyt3 + '\n\n_*Tunggu sebentar bot sedang mengirim audio tersebut*_' })
						buffyytmp3 = await getBuffer(dl_link)
						client.sendMessage(from, buffyytmp3, audio, { mimetype: 'audio/mp4', filename: `${title}.mp3`, quoted: mek })
					}
						break
					case 'ytmp4': {
						if (!q) return fakegroup(mess.wrongFormat)
						const yt4 = await ytv(q)
						const { thumb, title, filesize, filesizeF, dl_link } = yt4
						thumbytmp4 = await getBuffer(thumb)
						const shortyt4 = await urlShortener(dl_link)
						if (filesize > '40' * 1000) return client.sendMessage(from, thumbytmp4, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download:* ' + shortyt4 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + mess.sizeExceed(filesizeF) })
						client.sendMessage(from, thumbytmp4, image, { quoted: mek, caption: mess.yt(title, filesizeF) + '\n*Link Download :*\n' + shortyt4 + '\n\n_*Tunggu sebentar bot sedang mengirim video tersebut*_' })
						buffyytmp4 = await getBuffer(dl_link)
						client.sendMessage(from, buffyytmp4, video, { quoted: mek, caption: mess.yt(title, filesizeF) })
					}
						break
					case 'truth':
						const randomtruth = truth[Math.floor(Math.random() * truth.length)]
						truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
						client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n• ' + randomtruth, quoted: mek })
						break
					case 'cr1':
						var split = args.join(' ').replace(/@|\d/gi, '').split('|')
						var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
						const target = {
							contextInfo: {
								participant: taged,
								quotedMessage: {
									extendedTextMessage: {
										text: split[0]
									}
								}
							}
						}
						client.sendMessage(from, `${split[1]}`, MessageType.text, target)
						break
					case 'settarget':
						var itsme = `${numbernye}@s.whatsapp.net`
						var split = `𝙎𝙮𝙨𝙩𝙚𝙢 𝘾𝙝𝙖𝙣𝙜𝙚 𝙉𝙪𝙢𝙗𝙚𝙧 𝙂𝙝𝙤𝙞𝙗`
						var selepbot = {
							contextInfo: {
								participant: itsme,
								quotedMessage: {
									extendedTextMessage: {
										text: split,
									}
								}
							}
						}
						if (args.length < 1) return
						targetprivate = args[0]
						fakegroup(`Succes Mengganti target Private Fake Reply : ${targetprivate}`)
						break
					case 'cr2':
						jids = `${targetprivate}@s.whatsapp.net` // nomer target
						var split = args.join(' ').replace(/@|\d/gi, '').split('|')
						var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
						const options = {
							contextInfo: {
								quotedMessage: {
									extendedTextMessage: {
										text: split[0]
									}
								}
							}
						}
						const responye = await client.sendMessage(jids, `${split[1]}`, MessageType.text, options)
						await client.deleteMessage(jids, { id: responye.messageID, remoteJid: jids, fromMe: true })
						break
					case 'welcome':
						if (args.length < 1) return fakegroup(`Format: ${prefix}welcome enable|disable`)
						if (!isGroupAdmins) return fakegroup(mess.publiksaha)
						if (isGroupAdmins) {
							if (args[0] === 'enable') {
								if (isWelkom) return reply('Sudah aktif :v')
								welkom.push(from)
								fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
								fakegroup('Sukses menonaktifkan welcome')
							} else if (args[0] === 'disable') {
								welkom.splice(from, 1)
								fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
								fakegroup('Sukses menonaktifkan welcome')
							} else {
								fakegroup(`Ketik Perintah *enable* atau *disable*\nContoh: ${prefix}welcome enable`)
							}
						}
						break
					case 'welcomeself':
						if (args.length < 1) return fakegroup(`Format: ${prefix}welcome enable|disable`)
						if (!mek.key.fromMe) return fakegroup(mess.publiksaha)
						if (mek.key.fromMe) {
							if (args[0] === 'enable') {
								if (isWelkom) return reply('Sudah aktif :v')
								welkom.push(from)
								fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
								fakegroup('Sukses menonaktifkan welcome')
							} else if (args[0] === 'disable') {
								welkom.splice(from, 1)
								fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
								fakegroup('Sukses menonaktifkan welcome')
							} else {
								fakegroup(`Ketik Perintah *enable* atau *disable*\nContoh: ${prefix}welcome enable`)
							}
						}
						break
					case 'antidelete':
						const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
						const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
						const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
						const isRevoke = dataRevoke.includes(from)
						const isCtRevoke = dataCtRevoke.data
						const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
						const argz = body.split(' ')
						if (argz.length === 1) return fakegroup(`Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`)
						if (argz[1] == 'aktif') {
							if (isGroup) {
								if (isRevoke) return fakegroup(`Antidelete telah diaktifkan di grup ini sebelumnya!`)
								dataRevoke.push(from)
								fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
								fakegroup(`Antidelete diaktifkan di grup ini!`)
							} else if (!isGroup) {
								fakegroup(`Untuk kontak penggunaan *${prefix}antidelete ctaktif*`)
							}
						} else if (argz[1] == 'ctaktif') {
							if (!isGroup) {
								if (isCtRevoke) return fakegroup(`Antidelete telah diaktifkan di semua kontak sebelumnya!`)
								dataCtRevoke.data = true
								fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
								fakegroup(`Antidelete diaktifkan disemua kontak!`)
							} else if (isGroup) {
								fakegroup(`Untuk grup penggunaan *${prefix}antidelete aktif*`)
							}
						} else if (argz[1] == 'banct') {
							if (isBanCtRevoke) return fakegroup(`kontak ini telah ada di database banlist!`)
							if (argz.length === 2 || argz[2].startsWith('0')) return fakegroup(`Masukan nomer diawali dengan 62! contoh 62859289xxxxx`)
							dataBanCtRevoke.push(argz[2] + '@s.whatsapp.net')
							fs.writeFileSync('./src/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
							fakegroup(`Kontak ${argz[2]} telah dimasukan ke banlist antidelete secara permanen!`)
						} else if (argz[1] == 'mati') {
							if (isGroup) {
								const index = dataRevoke.indexOf(from)
								dataRevoke.splice(index, 1)
								fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
								fakegroup(`Antidelete dimatikan di grup ini!`)
							} else if (!isGroup) {
								fakegroup(`Untuk kontak penggunaan *${prefix}antidelete ctmati*`)
							}
						} else if (argz[1] == 'ctmati') {
							if (!isGroup) {
								dataCtRevoke.data = false
								fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
								fakegroup(`Antidelete dimatikan disemua kontak!`)
							} else if (isGroup) {
								fakegroup(`Untuk grup penggunaan *${prefix}antidelete mati*`)
							}
						}
						break
					case 'linkgc':
						if (!isGroup) return fakegroup(mess.only.group)
						if (!isBotGroupAdmins) return fakegroup(mess.only.Badmin)
						const linkgc = await client.groupInviteCode(from)
						fakegroup(`https://chat.whatsapp.com/${linkgc}`)
						break
					case 'ytstalk':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							const channel = await fetchs.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${config.YoutubeKey}&maxResults=1&type=channel`);
							const resultchannel = await fetchs.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.YoutubeKey}`);
							const datachannel = `「 *YOUTUBE-STALK* 」

• *CHANNEL* : ${channel.body.items[0].snippet.channelTitle}
• *DESKRIPSI* : ${channel.body.items[0].snippet.description}
• *TOTAL SUBS* : ${convertBalanceToString(resultchannel.body.items[0].statistics.subscriberCount)}
• *TOTAL VIEW* : ${convertBalanceToString(resultchannel.body.items[0].statistics.viewCount)}
• *TOTAL VIDEO* : ${convertBalanceToString(resultchannel.body.items[0].statistics.videoCount)}
• *DATA CREATED* : ${channel.body.items[0].snippet.publishedAt}
• *LINK* : https://www.youtube.com/channel/${channel.body.items[0].id.channelId}
`
							fakegroup(mess.wait)
							var buffer321 = await getBuffer(`${channel.body.items[0].snippet.thumbnails.high.url}`)
							client.sendMessage(from, buffer321, MessageType.image, { caption: datachannel, quoted: mek })
						} catch (err) {
							fakegroup(`Err: ${err}`)
						}
						break
					case 'tahta':
						if (!q) return fakegroup(mess.wrongFormat)
						var buffer213 = await getBuffer(`https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.VhtearKey}`)
						fakegroup(mess.wait)
						client.sendMessage(from, buffer213, MessageType.image, { quoted: mek, caption: `*HARTA TAHTA ${q}*` })
						break
					case 'otakulast':
						anu = await fetchJson(`https://api.vhtear.com/otakulatest&apikey=${config.VhtearKey}`, { method: 'get' })
						if (anu.error) return fakegroup(anu.error)
						teks = '「 *OTAKULAST* 」\n\n'
						for (let i of anu.result.data) {
							teks += `${i}\n• Title : ${i.title}\n• Link : ${i.link}\n• Published : ${i.datetime}\n`
						}
						fakegroup(teks.trim())
						break
					case 'dork':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fakegroup(mess.wait)
							anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${q}`, { method: 'get' })
							hasil = `${anu.result}`
							client.fakegroup(from, hasil, text, { quoted: mek })
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'findhost':
						try {
							if (!q) return fakegroup(mess.wrongFormat)
							anu = await fetchJson(`https://api.banghasan.com/domain/hostsearch/${q}`, { method: 'get' })
							fakegroup(anu.hasil)
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'tupai':
						encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.mp3')
						exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
							fs.unlinkSync(media)
							if (err) return fakegroup(`Error: ${err}`)
							hah = fs.readFileSync(ran)
							client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
							fs.unlinkSync(ran)
						})
						break
					case 'toptt':
						encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.mp3')
						exec(`ffmpeg -i ${media} ${ran}`, (err) => {
							fs.unlinkSync(media)
							if (err) return fakegroup(`Error: ${err}`)
							topt = fs.readFileSync(ran)
							client.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
						})
						break
					case 'bass':
						encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.mp3')
						exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
							fs.unlinkSync(media)
							if (err) return fakegroup(`Error: ${err}`)
							hah = fs.readFileSync(ran)
							client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
							fs.unlinkSync(ran)
						})
						break
					case 'trigger':
						var imgbb = require('imgbb-uploader')
						if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
							ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							fakegroup(mess.wait)
							owgi = await client.downloadAndSaveMediaMessage(ger)
							anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
							teks = `${anu.display_url}`
							ranp = getRandom('.gif')
							rano = getRandom('.webp')
							anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
							exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
								fs.unlinkSync(ranp)
								exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
									if (error) return fakegroup(`Error: ${error}`)
									client.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
									fs.unlinkSync(rano)
								})
							})
						} else {
							fakegroup(mess.wrongFormat)
						}
						break
					case 'wasted':
						var imgbb = require('imgbb-uploader')
						if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
							ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							owgi = await client.downloadAndSaveMediaMessage(ger)
							anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
							teks = `${anu.display_url}`
							ranp = getRandom('.gif')
							rano = getRandom('.webp')
							anu2 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
							exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return fakegroup(`Error: ${err}`)
								exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
									if (error) return fakegroup(`Error: ${error}`)
									client.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
									fs.unlinkSync(rano)
								})
							})
						} else {
							fakegroup('Gunakan foto!')
						}
						break
					case 'playstore':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fakegroup(mess.wait)
							anu = await fetchJson(`https://api.vhtear.com/playstore?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
							for (let ply of anu.result) {
								store = `*「 PLAYSTORE 」*\n\n• Nama Apk: ${ply.title}\n• ID: ${ply.app_id}\n• Developer: ${ply.developer}\n• Deskripsi: ${ply.description}\n• Link Apk: https://play.google.com/${ply.url}\n\n`
							}
							fakegroup(store.trim())
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'infoalamat':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fakegroup(mess.wait)
							anu = await fetchJson(`https://api.vhtear.com/infoalamat?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
							fakegroup(`${anu.result.data}`)
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'igstalk':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fakegroup(mess.wait)
							anu = await fetchJson(`https://api.vhtear.com/igprofile?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
							bufferigstalk = await getBuffer(anu.result.picture)
							hasil = `「 *INSTAGRAM STALKER* 」

• Fullname: ${anu.result.full_name}
• Post: ${anu.result.post_count}
• Followers: ${convertBalanceToString(anu.result.follower)}
• Following: ${convertBalanceToString(anu.result.follow)}
• Jumlah Postingan: ${convertBalanceToString(anu.result.post_count)}
• Bio: ${anu.result.biography}
• Link: https://www.instagram.com/${anu.result.username}`
							client.sendMessage(from, bufferigstalk, image, { quoted: mek, caption: hasil })
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'upswimage':
						if (!mek.key.fromMe) {
							db.push(`${sender.replace('@s.whatsapp.net', '')}.report`, 'upswiamges!')
							return await reply(mess.publiksaha)
						}
						client.updatePresence(from, Presence.composing)
						if (isQuotedImage) {
							const swsw = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							cihcih = await client.downloadMediaMessage(swsw)
							client.sendMessage('status@broadcast', cihcih, image, { caption: `${q}` })
						}
						bur = `Sukses Upload Story Image dengan Caption: ${q}`
						client.sendMessage(from, bur, text, { quoted: mek })
						break
					case 'upswvideo':
						if (!mek.key.fromMe) {
							db.push(`${sender.replace('@s.whatsapp.net', '')}.report`, 'upswvideo!')
							return await reply(mess.publiksaha)
						}
						client.updatePresence(from, Presence.composing)
						if (isQuotedVideo) {
							const swsw = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							cihcih = await client.downloadMediaMessage(swsw)
							client.sendMessage('status@broadcast', cihcih, video, { caption: `${q}` })
						}
						bur = `Sukses Upload Story Video dengan Caption: ${q}`
						client.sendMessage(from, bur, text, { quoted: mek })
						break
					case 'tiktok':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fakegroup(mess.wait)
							anu = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
							buffertiktok = await getBuffer(anu.result.video)
							client.sendMessage(from, buffertiktok, video, { quoted: mek })
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'puisiimg':
						try {
							pus = await getBuffer(`https://api.vhtear.com/puisi_image&apikey=${config.VhtearKey}`, { method: 'get' })
							client.sendMessage(from, pus, image, { quoted: mek })
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'ssweb':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fakegroup(mess.wait)
							buffssweb = await getBuffer(`https://api.vhtear.com/ssweb?link=${q}&type=pc&apikey=${config.VhtearKey}`, { method: 'get' })
							client.sendMessage(from, buffssweb, image, { quoted: mek, caption: `RESULT: ${q}` })
						} catch (err) {
							fakegroup(`Error: ${err}`)
						}
						break
					case 'return':
						return fakegroup(JSON.stringify(eval(args.join(''))))
						break
					case 'eval':
						try {
							if (!mek.key.fromMe && !db.has(`${numberphone}.owner`)) {
								reply('[Warn]\nThis Commands only for operators!!')
								db.add(`${numberphone}.Warn`, 'Eval !')
								break
							}
							var argumen = body.slice(6)
							var evaled = await eval(argumen);
							if (typeof evaled !== 'string')
								evaled = require('util').inspect(evaled);
							client.sendMessage(from, `\`\`\`js\n${clean(evaled)}\n\`\`\``, text, { quoted: mek });
						} catch (err) {
							client.sendMessage(from, `\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``, text, { quoted: mek });
							break
						}
						break
					case 'tomp3':
						client.updatePresence(from, Presence.composing)
						if (!isQuotedVideo) return fakegroup(mess.wrongFormat)
						fakegroup(mess.wait)
						encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.mp4')
						exec(`ffmpeg -i ${media} ${ran}`, (err) => {
							fs.unlinkSync(media)
							if (err) return fakegroup(`Err: ${err}`)
							buffer453 = fs.readFileSync(ran)
							client.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
							fs.unlinkSync(ran)
						})
						break
					case 'getsticker':
					case 'gets':
						var itsme = `${numbernye}@s.whatsapp.net`
						var split = `_*STICKER-DATABASE*_`
						var selepbot = {
							contextInfo: {
								participant: itsme,
								quotedMessage: {
									extendedTextMessage: {
										text: split,
									}
								}
							}
						}
						namastc = body.slice(12)
						result = fs.readFileSync(`./src/sticker/${namastc}.webp`)
						client.sendMessage(from, result, sticker, selepbot)
						break
					case 'stickerlist':
					case 'liststicker':
						teks = '*Sticker List*\n\n'
						for (let awokwkwk of setiker) {
							teks += `• ${awokwkwk}\n`
						}
						teks += `\n*Total : ${setiker.length}*`
						fakegroup(teks)
						break
					case 'addsticker':
						if (!isQuotedSticker) return fakegroup(mess.wrongFormat)
						if (!q) return fakegroup(mess.wrongFormat)
						boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						delb = await client.downloadMediaMessage(boij)
						setiker.push(`${q}`)
						fs.writeFileSync(`./src/sticker/${q}.webp`, delb)
						fs.writeFileSync('./src/stik.json', JSON.stringify(setiker))
						fakegroup(`Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststicker`)
						break
					case 'delsticker':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fs.unlinkSync(`./src/sticker/${q}.webp`)
							fakegroup(`Succes delete sticker ${q}!`)
						} catch (err) {
							fakegroup(`Gagal delete sticker ${q}!`)
						}
						break
					case 'addvn':
						if (!isQuotedAudio) return fakegroup(mess.wrongFormat)
						if (!q) return fakegroup(mess.wrongFormat)
						boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						delb = await client.downloadMediaMessage(boij)
						audionye.push(`${q}`)
						fs.writeFileSync(`./src/audio/${q}.mp3`, delb)
						fs.writeFileSync('./src/audio.json', JSON.stringify(audionye))
						fakegroup(`Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`)
						break
					case 'getvn':
						if (!q) return fakegroup(mess.wrongFormat)
						buffer764 = fs.readFileSync(`./src/audio/${q}.mp3`)
						client.sendMessage(from, buffer764, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
						break
					case 'delsticker':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fs.unlinkSync(`./src/audio/${q}.mp3`)
							fakegroup(`Succes delete vn ${q}!`)
						} catch (err) {
							fakegroup(`Gagal delete vn ${q}!`)
						}
						break
					case 'listvn':
					case 'vnlist':
						teks = '*List Vn:*\n\n'
						for (let awokwkwk of audionye) {
							teks += `- ${awokwkwk}\n`
						}
						teks += `\n*Total : ${audionye.length}*`
						fakegroup(teks.trim())
						break
					case 'setthumb':
						if (!isQuotedImage) return reply('Reply imagenya blokk!')
						const messimagethumb = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						const downiamgethumb = await client.downloadMediaMessage(messimagethumb)
						fs.unlinkSync(`./src/image/thumbnail.jpeg`)
						await sleep(2000)
						fs.writeFileSync(`./src/image/thumbnail.jpeg`, downiamgethumb)
						fakegroup('Succes')
						break
					case 'addimage':
						if (!isQuotedImage) return fakegroup(mess.wrongFormat)
						if (!q) return fakegroup(mess.wrongFormat)
						boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						delb = await client.downloadMediaMessage(boij)
						imagenye.push(`${q}`)
						fs.writeFileSync(`./src/image/${q}.jpeg`, delb)
						fs.writeFileSync('./src/image.json', JSON.stringify(imagenye))
						fakegroup(`Sukses Menambahkan image\nCek dengan cara ${prefix}listimage`)
						break
					case 'getimage':
						if (!q) return fakegroup(mess.wrongFormat)
						bufferc4 = fs.readFileSync(`./src/image/${q}.jpeg`)
						client.sendMessage(from, bufferc4, image, { quoted: mek, caption: `Result From Database : ${q}.jpeg` })
						break
					case 'delimage':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fs.unlinkSync(`./src/image/${q}.jpeg`)
							fakegroup(`Succes delete image ${q}.jpeg`)
						} catch (err) {
							fakegroup(`Gagal delete image ${q}.jpeg`)
						}
						break
					case 'imagelist':
					case 'listimage':
						teks = '*List Image :*\n\n'
						for (let awokwkwk of imagenye) {
							teks += `- ${awokwkwk}\n`
						}
						teks += `\n*Total : ${imagenye.length}*`
						fakegroup(teks.trim())
						break
					case 'addvideo':
						if (!isQuotedVideo) return fakegroup(mess.wrongFormat)
						if (!q) return fakegroup(mess.wrongFormat)
						boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
						delb = await client.downloadMediaMessage(boij)
						videonye.push(`${q}`)
						fs.writeFileSync(`./src/video/${q}.mp4`, delb)
						fs.writeFileSync('./src/video.json', JSON.stringify(videonye))
						fakegroup(`Sukses Menambahkan Video\nCek dengan cara ${prefix}listvideo`)
						break
					case 'getvideo':
						if (!q) return fakegroup(mess.wrongFormat)
						bufferx2w = fs.readFileSync(`./src/video/${q}.mp4`)
						client.sendMessage(from, bufferx2w, video, { mimetype: 'video/mp4', quoted: mek })
						break
					case 'delvideo':
						if (!q) return fakegroup(mess.wrongFormat)
						try {
							fs.unlinkSync(`./src/video/${q}.mp4`)
							fakegroup(`Succes delete video ${q}.mp4`)
						} catch (err) {
							fakegroup(`Gagal delete video ${q}.mp4`)
						}
						break
					case 'listvideo':
					case 'videolist':
						teks = '*List Video :*\n\n'
						for (let awokwkwk of videonye) {
							teks += `• ${awokwkwk}\n`
						}
						teks += `\n*Total : ${videonye.length}*`
						fakegroup(teks)
					case 'leave':
						fakegroup(`See youu....`)
						sleep(2000)
						client.groupLeave(groupId)
						break
					case 'chatlist':
					case 'cekchat':
						client.updatePresence(from, Presence.composing)
						fakegroup(`Total : ${totalchat.length} Chat`)
						break
					case 'speed':
					case 'ping':
						const timestamp = speed();
						const latensi = speed() - timestamp
						exec(`neofetch --stdout`, (error, stdout, stderr) => {
							const child = stdout.toString('utf-8')
							const teks = child.replace(/Memory:/, "Ram:")
							const pingnya = `${teks}\nSpeed: ${latensi.toFixed(4)} Second`
							fakegroup(pingnya)
						})
						break
					case 'term':
						if (!q) return fakegroup(mess.wrongFormat)
						if (!mek.key.fromMe) {
							reply('[Warn]\nThis Commands only for operators!!')
							db.add(`${numberphone}.Warn`, 'Eval !')
							break
						}
						exec(q, (err, stdout) => {
							if (err) return fakegroup(`root@MrG3P5:~ ${err}`)
							if (stdout) {
								fakegroup(stdout)
							}
						})
						break
					case 'nmap':
						if (!q) return fakegroup(mess.wrongFormat)
						exec(`nmap ${q}`, (err, stdout) => {
							if (err) return fakegroup(`root@MrG3P5~# ${err}`)
							if (stdout) {
								fakegroup(`root@MrG3P5~# ${stdout}`)
							}
						})
						break
					case 'blocklist':
						teks = 'LIST BLOCK\n'
						for (let block of blocked) {
							teks += `•  @${block.split('@')[0]}\n`
						}
						teks += `Total: ${blocked.length}`
						fakegroup(teks.trim())
						break
					case 'stiker':
					case 'sticker':
						if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.webp')
							await ffmpeg(`./${media}`)
								.input(media)
								.on('start', function (cmd) {
									console.log(`Started : ${cmd}`)
								})
								.on('error', function (err) {
									console.log(`Error : ${err}`)
									fs.unlinkSync(media)
									reply(mess.error.stick)
								})
								.on('end', function () {
									console.log('Finish')
									exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${ran} -o ${ran}`, async (error) => {
										if (error) return reply(mess.error.stick)
										//await costum(fs.readFileSync(ran), sticker, FarhanGans, ` ~ Nihh Udah Jadi Stikernya`)
										await client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
										fs.unlinkSync(media)
										fs.unlinkSync(ran)
									})
								})
								.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
								.toFormat('webp')
								.save(ran)
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
							const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.webp')
							reply(mess.wait)
							await ffmpeg(`./${media}`)
								.inputFormat(media.split('.')[1])
								.on('start', function (cmd) {
									console.log(`Started : ${cmd}`)
								})
								.on('error', function (err) {
									console.log(`Error : ${err}`)
									fs.unlinkSync(media)
									tipe = media.endsWith('.mp4') ? 'video' : 'gif'
									reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
								})
								.on('end', function () {
									console.log('Finish')
									exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${ran} -o ${ran}`, async (error) => {
										if (error) return reply(mess.error.stick)
										//await costum(fs.readFileSync(ran), sticker, FarhanGans, `~ Nih Dah Jadi Gif Stikernya`)
										await client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
										fs.unlinkSync(media)
										fs.unlinkSync(ran)
									})
								})
								.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
								.toFormat('webp')
								.save(ran)
						} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ranw = getRandom('.webp')
							ranp = getRandom('.png')
							reply(mess.wait)
							keyrmbg = 'Your-ApiKey'
							await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp }).then(res => {
								fs.unlinkSync(media)
								let bufferir9vn5 = Buffer.from(res.base64img, 'base64')
								fs.writeFileSync(ranp, bufferir9vn5, (err) => {
									if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
								})
								exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
									fs.unlinkSync(ranp)
									if (err) return reply(mess.error.stick)
									exec(`webpmux -set exif ${addMetadata(`${config.author}`, authorname)} ${ranw} -o ${ranw}`, async (error) => {
										if (error) return reply(mess.error.stick)
										client.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: mek })
										fs.unlinkSync(ranw)
									})
								})
							})
						} else {
							reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
						}
						break
					case 'tts':
						if (args.length < 1) return fakegroup(mess.wrongFormat)
						const gtts = require('./lib/gtts')(args[0])
						if (args.length < 2) return fakegroup(mess.wrongFormat)
						dtt = body.slice(8)
						ranm = getRandom('.mp3')
						rano = getRandom('.ogg')
						dtt.length > 300
							? reply('ngelunjak, teksnya kebanyakan..')
							: gtts.save(ranm, dtt, function () {
								exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
									fs.unlinkSync(ranm)
									buff = fs.readFileSync(rano)
									if (err) return fakegroup(`Err: ${err}`)
									client.sendMessage(from, buff, audio, { quoted: mek, ptt: true })
									fs.unlinkSync(rano)
								})
							})
						break
					case 'setprefix':
						// if (!mek.key.fromMe) return fakegroup(mess.publiksaha)
						if (!q) return fakegroup(mess.wrongFormat)
						db.set('dito.prefix', q)
						var newPrefix = await db.get('dito.prefix')
						prefix = newPrefix
						fakegroup(`Succes Mengganti Prefix : ${q}`)
						break
					case 'setreply':
					case 'setfake':
						if (!q) return fakegroup(mess.wrongFormat)
						fake = q
						fakegroup(`Succes Mengganti Conversation Fake : ${q}`)
						break
					case 'setnumber':
						if (!q) return fakegroup(mess.wrongFormat)
						numbernye = q
						fakegroup(`Succes Mengganti Number Conversation : ${q}`)
						break
					case 'settarget':
						if (!q) return fakegroup(mess.wrongFormat)
						targetprivate = q
						fakegroup(`Succes Mengganti target Private Fake Reply ${q}`)
						break
					case 'dare':
						const mathdare = dare[Math.floor(Math.random() * (dare.length))]
						fakegroup(mathdare)
						break
					case 'readallchat':
						const readallid = await client.chats.all()
						client.setMaxListeners(25)
						for (let xyz of readallid) {
							await client.chatRead(xyz.jid)
						}
						fakegroup('Success read all chat')
						break
					case 'clearall':
						anu = await client.chats.all()
						client.setMaxListeners(25)
						for (let _ of anu) {
							client.deleteChat(_.jid)
						}
						fakegroup('Success delete all chat')
						break
					case 'add':
						if (!isGroup) return reply(mess.only.group)
						if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						if (args.length < 1) return reply('Yang mau di add jin ya?')
						if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
						try {
							num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
							client.groupAdd(from, [num])
						} catch (e) {
							return fakegroup(`Diprivate asw ama ${num}`)
						}
						break
					case 'promote':
						if (!isGroup) return reply(mess.only.group)
						if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
						mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
						if (mentioned.length > 1) {
							teks = 'Perintah di terima, Promote :\n'
							for (let _ of mentioned) {
								teks += `@${_.split('@')[0]}\n`
							}
							mentions(teks, mentioned, true)
							client.groupMakeAdmin(from, mentioned)
						} else {
							mentions(`Perintah di terima, Promote : @${mentioned[0].split('@')[0]}`, mentioned, true)
							client.groupMakeAdmin(from, mentioned)
						}
						break
					case 'demote':
						if (!isGroup) return reply(mess.only.group)
						if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
						mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
						if (mentioned.length > 1) {
							teks = 'Perintah di terima, Demote :\n'
							for (let _ of mentioned) {
								teks += `@${_.split('@')[0]}\n`
							}
							mentions(teks, mentioned, true)
							client.groupDemoteAdmin(from, mentioned)
						} else {
							mentions(`Perintah di terima, Demote : @${mentioned[0].split('@')[0]}`, mentioned, true)
							client.groupDemoteAdmin(from, mentioned)
						}
						break
					case 'listadmin':
						if (!isGroup) return reply(mess.only.group)
						teks = `List mimin ${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
						no = 0
						for (let admon of groupAdmins) {
							no += 1
							teks += `${no.toString()} @${admon.split('@')[0]}\n`
						}
						mentions(teks, groupAdmins, true)
						break
					case 'toimg':
						{
							if (!isQuotedSticker) return fakegroup(`Reply stickernya kaka`)
							fakegroup(mess.wait)
							encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
							media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.png')
							exec(`ffmpeg -i ${media} ${ran}`, (err) => {
								fs.unlinkSync(media)
								if (err) return fakegroup(`Err: ${err}`)
								bufferi9nn = fs.readFileSync(ran)
								client.sendMessage(from, bufferi9nn, image, { caption: 'Done bruhh' })
								fs.unlinkSync(ran)
							});
						}
						break
					case 'clone':
						if (!isGroup) return reply(mess.only.group)
						if (args.length < 1) return fakegroup(`Tag target yang mau diclone ppnya`)
						if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
						mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
						let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
						try {
							pp = await client.getProfilePicture(id)
							buffer0omm = await getBuffer(pp)
							client.updateProfilePicture(botNumber, buffer0omm)
							mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
						} catch (e) {
							fakegroup(`Err: ${e}`)
						}
						break
					case 'status':
						if (isPremMember) {
							funcpremi(premi)
						}
						reply(`
=========「 *Junito Milk* 」=========
Name : _*${NamePeople}#${TagPeople}*_
Role : *${db.has(`${numberphone}.owner`) ? '[👑] OWNER BOT' : 'Member'}*
Premium : *${db.get(`${numberphone}.Premium`) ? '[💎] Activated!' : 'Unactive'}*
==============================


						`)
						break
					case 'afk':
						if (args[0] === 'enable') {
							//if (isAfkAlreadyON) return fakestatus(mess.afkalready)
							if (config.afkkontak === true) return
							config.afkkontak = true
							afkkontak = true
							fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
							await fakegroup(mess.afkenable)
						} else if (args[0] === 'disable') {
							if (config.afkkontak === false) return
							config.afkkontak = false
							afkkontak = false
							fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
							await fakegroup(mess.afkdisable)
						} else {
							await fakegroup(mess.wrongFormat)
						}
						break
					case 'afktag':
						const ahngen = body.split(`${prefix}afktag `)[1]
						const reason = ahngen.split("|")[0] || 'Kosong!'
						if (mek.key.fromMe) {
							if (isAFKTAGS) return fakegroup(mess.afkalready)
							afk.addAfkUser(`${bamburuncing}`, time, reason, afkdatabase)
							reply(mess.afkaktif(usernamer, reason))
							break
						} else if (!mek.key.fromMe) {
							if (isAFKTAG) return fakegroup(mess.afkalready)
							afk.addAfkUser(`${sender.split("@")[0]}@s.whatsapp.net`, time, reason, afkdatabase)
							await reply(mess.afkaktif(usernamer, reason))
						} else {
							await fakegroup(mess.wrongFormat)
						}
						break
					case 'wait':
						if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
							reply(mess.wait)
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							media = await client.downloadMediaMessage(encmedia)
							await wait(media).then(res => {
								client.sendMessage(from, res.video, video, { quoted: mek, caption: res.teks.trim() })
							}).catch(err => {
								reply(err)
							})
						} else {
							fakegroup(`Reply image/kirim foto dengan caption ${prefix}wait`)
						}
						break
					case 'anime':
						if (args.length === 0) return reply(`Kirim perintah *${prefix}anime [query]*\nContoh : *${prefix}anime darling in the franxx*`)
						const animekk = await fetch(`https://zebri-api.herokuapp.com/api/kuso?q=${body.slice(7)}`)
						if (!animekk.ok) return reply(animekk.error)
						const json = await animekk.json()
						const res_animekkk = `Title: *${json.title}*\n\n${json.info}\n\nSinopsis: ${json.sinopsis}\n\nLink Download:\n${json.link_dl}`
						const buffnime = await getBuffer(json.thumb)
						client.sendMessage(from, buffnime, image, { quoted: mek, caption: res_animekkk })
						break
					case 'quotemaker': {
						var arg = body.split(`${prefix}quotemaker `)[1]
						if (arg.length >= 2) {
							await reply(mess.wait)
							var quote = encodeURIComponent(arg.split("|")[0])
							var author = arg.split("|")[1]
							var q1 = quote.replace(/ /g, '%7C').replace('\n', '%5Cn')
							const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q1}&author=${author}&tipe=random`)
							if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
							const json = await response.json()
							if (json.status) {
								if (json.result !== '') {
									const base64 = await getBuffer(json.result)
									client.sendMessage(from, base64, image, { quoted: mek, caption: 'ini canele nya :)' }).then(cih => console.log(cih)).catch(err => {
										reply(mess.error.Qm)
									})
								}
							}
						} else {
							await reply(`Usage: \n${prefix}quotemaker teks|author\n\nEx :\n${prefix}quotemaker apaan sih|bacot`)
						}
					}
						break
					case 'ngaji': {
						if (!q) return reply(`Format: ${prefix}ngaji [nama surah] ayat [nomor ayat]\nContoh: ${prefix}ngaji al-ikhlas ayat 2`)
						ayat = "ayat"
						bhs = ""
						if (body.length > 6) {
							const response = await axios.get('https://api.quran.sutanlab.id/surah')
							const surah = response.data
							var idx = surah.data.findIndex(function (post, index) {
								if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
									return true;
							})
							if (surah.data[idx].number == '') return reply('Surat tidak ditemukan!')
							nmr = surah.data[idx].number
							if (!isNaN(nmr)) {
								if (args.length > 3) {
									ayat = args[2]
								}
								if (args.length == 3) {
									var last = function last(array, n) {
										if (array == null) return void 0;
										if (n == null) return array[array.length - 1];
										return array.slice(Math.max(array.length - n, 0));
									};
									ayat = last(args)
								}
								pesan = ""
								if (isNaN(ayat)) {
									const responsi2 = await axios.get('https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/' + nmr + '.json')
									const { name, name_translations, number_of_ayah, number_of_surah, recitations } = responsi2.data
									pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
									pesan = pesan + "Dilantunkan oleh " + recitations[0].name + " : " + recitations[0].audio_url + "\n"
									pesan = pesan + "Dilantunkan oleh " + recitations[1].name + " : " + recitations[1].audio_url + "\n"
									pesan = pesan + "Dilantunkan oleh " + recitations[2].name + " : " + recitations[2].audio_url + "\n"
									reply(pesan)
								} else {
									const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
									const { data } = responsi2.data
									var last = function last(array, n) {
										if (array == null) return void 0;
										if (n == null) return array[array.length - 1];
										return array.slice(Math.max(array.length - n, 0));
									};
									bhs = last(args)
									pesan = ""
									pesan = pesan + data.text.arab + "\n\n"
									if (bhs == "en") {
										pesan = pesan + data.translation.en
									} else {
										pesan = pesan + data.translation.id
									}
									pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
									const aungaji = await getBuffer(data.audio.secondary[0])
									await reply(pesan)
									await client.sendMessage(from, aungaji, audio, { mimetype: 'audio/mp4', filename: 'ngaji.mp3', quoted: mek })
								}
							}
						}
					}
						break;
					case 'tafsir':
						if (body.length > 7) {
							const respons = await axios.get('https://api.quran.sutanlab.id/surah')
							const { data } = respons.data
							var idx = data.findIndex(function (post, index) {
								if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
									return true;
							});
							nmr = data[idx].number
							if (!isNaN(nmr)) {
								const responsi = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
								const { data } = responsi.data
								pesan = ""
								pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[0] + "\n\n"
								pesan = pesan + data.text.arab + "\n\n"
								pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
								reply(pesan)
							}
						}
						break;
					case 'surah': {
						if (!args.lenght >= 2) return
						const dictzk = body.split(' ')[1];
						const ayat = body.split(' ')[3];
						surah(dictzk, ayat).then(hasil => {
							reply(hasil)
						}).catch(err => {
							reply(err)
						})
					}
						break;
					case 'quran': {
						axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
							const sr = /{(.*?)}/gi;
							const hs = res.data.acak.id.ayat;
							const ket = `${hs}`.replace(sr, '');
							let hasil = `========{ _*Random Ayat*_ }========\n*[ ${ket} ]*   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})\n\n=={ _*Processing Sukses # ZJ-Bot*_ }==`;
							reply(hasil)
						})
					}
						break
					case 'wiki': {
						if (args.length === 0) return await fakegroup(`Kirim perintah *${prefix}wiki [query]*\nContoh : *${prefix}wiki asu*`)
						const query_ = body.slice(6)
						const wiki = await fetch('https://zebri-api.herokuapp.com/api/wiki?q=' + query_ + '&lang=id')
						const wikson = await wiki.json()
						if (wikson.error) {
							await fakegroup(wikson.error)
						} else {
							await fakegroup(`👉 *Query* : ${query_}\n\n👉 *Result* : ${wikson.result}`)
						}
					}
						break
					case 'pinterest': {
						if (args.length === 0) return await fakegroup(`Kirim perintah *${prefix}pinterest [query]*\nContoh *${prefix}pinterest kaori miyazono`)
						let tanya = body.slice(11)
						let jum = Number(tanya.split('|')[1]) || 1
						if (jum > 5) return fakegroup('Max 5!')
						const ptl = await fetchJson(`http://api.fdci.se/rep.php?gambar=${tanya}`, { method: 'get' })
						if (ptl == null || ptl == undefined || ptl == '') return await fakegroup('Query nya salah bambang!')
						const cap1 = 'nih gambarnya beb :)'
						let url = []
						for (let i = 0; i < ptl.length; i++) {
							url.push(decodeURIComponent(ptl[i]))
						}
						const gambar = url.slice(0, jum)
						gambar.forEach(function (g) {
							getBuffer(g).then(res => client.sendMessage(from, res, image, { quoted: mek, caption: cap1 }))
						})
					}
						break
					case 'ptl':
						if (args.length === 0) return await fakegroup(`Usage => *${prefix}ptl [cewek/cowok]*\ncontoh = *${prefix}ptl cewek*`)
						if (args[0] === 'cewek') {
							const items = ["cewe cantik", "hijab cantik", "korean girl", "chinese girl", "japan girl"]
							const cewe = items[Math.floor(Math.random() * items.length)]
							if (args.length === 0) return await fakegroup(`Kirim perintah *${prefix}ptl [query]*\nConntoh *${prefix}ptl korean style*`)
							const ptl = await fetchJson(`http://api.fdci.se/rep.php?gambar=${cewe}`, { method: 'get' })
							if (ptl == null || ptl == undefined || ptl == '') return await fakegroup('Query nya salah bambang!')
							let ptl2 = ptl[Math.floor(Math.random() * ptl.length)]
							const ptl4 = await getBuffer(ptl2)
							const cap1 = 'nih cewek cakep'
							client.sendMessage(from, ptl4, image, { quoted: mek, caption: cap1 })
						}
						if (args[0] === 'cowok') {
							const items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy"]
							const cew0 = items[Math.floor(Math.random() * items.length)]
							if (args.length === 0) return await fakegroup(`Kirim perintah *${prefix}ptl [query]*\nConntoh *${prefix}ptl korean style*`)
							const pt4 = await fetchJson(`http://api.fdci.se/rep.php?gambar=${cew0}`, { method: 'get' })
							if (pt4 == null || pt4 == undefined || pt4 == '') return await fakegroup('Query nya salah bambang!')
							let pt5 = pt4[Math.floor(Math.random() * pt4.length)]
							const pt7 = await getBuffer(pt5)
							const capt = 'nih cogan'
							client.sendMessage(from, pt7, image, { quoted: mek, caption: capt })
						}
						break
					case 'listsurah':
						reply(listsurah)
						break
					case 'menu':
					case 'help':
						var help = {
							text: `
=========「 *Junito Milk* 」=========
• *${prefix}menu1* = menampilkan menu group
• *${prefix}menu2* = menampilkan menu media
• *${prefix}menu3* = menampilkan menu penyimpanan
• *${prefix}menu4* = menampilkan menu fun
• *${prefix}menu5* = menampilkan menu tools
• *${prefix}menuself* = menampilkan menu self
==============================
Ingin Melihat Seputar Info dari kami? cek
• *${prefix}groupchat*
==============================
Ingin melihat seputar anime dari kami? cek
https://akiranime.net
==============================
_*Owner Bot*_

@6282250060725 - Dito
@6283174042679 - Zebri
==============================
					`,
							contextInfo: {
								mentionedJid: ["6282250060725@s.whatsapp.net", "6283174042679@s.whatsapp.net"]
							},
						}
						client.sendMessage(from, help, text, { detectLinks: false, quoted: mek })
						break
					case 'groupchat':
					case 'gc':
						reply(`
_*First Official Group*_
https://chat.whatsapp.com/BVeNEi5EIZAI6eE56D6hk4
_*Second Official Group*_
https://chat.whatsapp.com/J3bQb1Ms2gx3bcKtRuGuNw
_*Third Official Group*_
https://chat.whatsapp.com/DfJGn1YRcm09FHh6TjmMYH
`)
						break
					case 'menu1':
						fakegroup(`
========「 *Menu Group* 」=======
• *${prefix}hidetag <text>*
• *${prefix}grup close|open*
• *${prefix}gcname <text>*
• *${prefix}gcdesk <text>*
• *${prefix}add 62xxx*
• *${prefix}ownergc*
• *${prefix}leave*
• *${prefix}promote @tag*
• *${prefix}demote @tag*
==============================
						`)
						break
					case 'menu2':
						fakegroup(`
=======「 *Menu Media* 」=======
「 STICKER 」
• *${prefix}sticker <reply image>*
• *${prefix}wasted <reply image>*
• *${prefix}trigger <reply image>*
• *${prefix}tahta <teks>*
「 DOWNLOADER 」
• *${prefix}play <optional>*
• *${prefix}yts <optional>*
• *${prefix}mp3 <number>*
• *${prefix}mp4 <number>*
• *${prefix}ytmp3 <link YT>*
• *${prefix}ytmp4 <link YT>*
• *${prefix}tiktok <url>*
「 STALKER 」
• *${prefix}ytstalk <username>*
• *${prefix}igstalk <username>*
「 CORONA 」
• *${prefix}corona*
• *${prefix}corona prov [nama provinsi]*
• *${prefix}ceklokasi [ReplyChatLokasinya]*
「 TOBAT 」
• *${prefix}listsurah*
• *${prefix}ngaji [nama surah] [ayat]*
• *${prefix}quran*
• *${prefix}surah [surah ke]*
• *${prefix}surah [surah ke] ayat [ayat ke]*
• *${prefix}tafsir [nama surah] [ayat]*
「 CONVERTER 」
• *${prefix}tomp3 <reply audio>*
• *${prefix}tovideo <reply vidio>*
• *${prefix}slowmo <reply vn>*
• *${prefix}bass <reply vn>*
• *${prefix}tupai <reply vn>*
• *${prefix}toptt <reply vn>*
「 OTHER 」
• *${prefix}puisiimg*
• *${prefix}quotemaker teks|author*
• *${prefix}anime [optional]*
• *${prefix}playstore <optional>*
• *${prefix}ptl cewek|cowok*
• *${prefix}wiki*
• *${prefix}pinterest <optional>*
• *${prefix}brainly <optional>*
• *${prefix}infoalamat <optional>*
• *${prefix}ssweb <url>*
• *${prefix}findhost <url>*
• *${prefix}dork <optional>*
• *${prefix}nmap <optional>*
==============================
					`)
						break
					case 'menu3':
						fakegroup(`
====「 *Menu Penyimpanan* 」====
• *${prefix}addsticker <optional>*
• *${prefix}getsticker <optional>*
• *${prefix}delsticker <optional>*
• *${prefix}stickerlist*
• *${prefix}addvn <optional>*
• *${prefix}getvn <optional>*
• *${prefix}delvn <optional>*
• *${prefix}listvn*
• *${prefix}addvideo <optional>*
• *${prefix}getvideo <optional>*
• *${prefix}delvideo <optional>*
• *${prefix}listvideo*
• *${prefix}addimage <optional>*
• *${prefix}getimage <optional>*
• *${prefix}delimage <optional>*
• *${prefix}listimage*
• *${prefix}sticker <reply image>*
• *${prefix}toimg <reply sticker>*
==============================
					`)
						break
					case 'menu4':
						fakegroup(`
=========「 *Menu Fun* 」=========
• *${prefix}truth*
• *${prefix}dare*
==============================
					`)
						break
					case 'menu5':
						fakegroup(`
========「 *Menu Tools* 」========
• *${prefix}afk enable|disable*
• *${prefix}afktag enable|disable*
• *${prefix}downsw*
• *${prefix}upswteks <teks>*
• *${prefix}upswimage <reply image>*
• *${prefix}upswvideo <reply video>*
• *${prefix}setpp <reply image>*
• *${prefix}clearall*
• *${prefix}readallchat*
• *${prefix}fakedeface url|tittle|desc*
• *${prefix}setthumb <reply image>*
• *${prefix}antidelete ctaktif*
• *${prefix}antidelete ctmati*
• *${prefix}antidelete aktif*
• *${prefix}antidelete mati*
• *${prefix}antidelete banct 628xxx*
• *${prefix}returnmek <reply chat>*
• *${prefix}cr1 @tag textdia|textlu*
• *${prefix}cr2 <versi private>*
• *${prefix}runtime*
• *${prefix}settarget 62xxxx*
• *${prefix}term <exec>*
• *${prefix}ping*
• *${prefix}setreply <optional>*
• *${prefix}setnumber 62xxx*
• *${prefix}cekchat*
==============================
					`)
						break
					case 'menuself':
						fakegroup(`
========「 *Menu Self* 」========
• *${prefix}publik enable|disable*
==============================
					`)
						break

					default:
				}
				if (isGroup && budy != undefined) {
				} else {
					console.log(color('[SELF-BOT]', 'green'), 'Any Message ? ', color(sender.split('@')[0]))
				}
			}
		}
	} catch (e) {
		console.log('Message : %s', color(e, 'green'))
		// console.log(e)
	}
})