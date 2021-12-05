const {
    WAConnection,
    MessageType,
    Mimetype
} = require('@adiwajshing/baileys')
const os = require('os')
const xteam = '6b5efe7d3fe37eb2'
const getBuffer = require('./lib/function')
const util = require('util')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const qrcode = require('qrcode-terminal')
const syntaxerror = require('syntax-error')
const brainly = require('brainly-scraper-v2')
const conn = new WAConnection()
const ansi = '\x1b['
fs.existsSync(`./${process.argv[2] || 'session'}.data.json`) && conn.loadAuthInfo(`./${process.argv[2] || 'session'}.data.json`)

global.config = {
    unvoke: false,
    unvokeMe: false,
    require: false
}

conn.on('qr', qr => {
    qrcode.generate(qr, {
        small: false
    })
})

conn.on('credentials-updated', () => {
    const authInfo = conn.base64EncodedAuthInfo()
    fs.writeFileSync(`./${process.argv[2] || 'session'}.data.json`, JSON.stringify(authInfo))
})

canvas().then(a => {
    fs.writeFileSync('/sdcard/canvas.png', a)
    global.img = fs.readFileSync('/sdcard/mandelbrot.png')
})


if (!Array.isArray(conn._events['CB:action,add:relay,message'])) conn._events['CB:action,add:relay,message'] = [conn._events['CB:action,add:relay,message']]
else conn._events['CB:action,add:relay,message'] = [conn._events['CB:action,add:relay,message'].pop()]
conn._events['CB:action,add:relay,message'].unshift(async json => {
    try {
        if (!global.config.unvoke) return
        let m = json[2][0][2]
        if (m.message && m.message.protocolMessage && m.message.protocolMessage.type == 0) {
            let key = m.message.protocolMessage.key
            if (key.fromMe && !global.config.unvokeMe) return
            let c = conn.chats.get(key.remoteJid)
            let a = c.messages.dict[`${key.id}|${key.fromMe ? 1 : 0}`]
            let participant = key.fromMe ? conn.user.jid : a.participant ? a.participant : key.remoteJid
            conn.sendMessage(key.remoteJid, `[Bot]\nTerdeteksi @${(participant).replace(/@.+/, '')} telah menghapus pesan:v`, MessageType.extendedText, {
                contextInfo: {
                    mentionedJid: [participant],
                    quotedMessage: a.message
                }
            })

            let content = conn.generateForwardMessageContent(a, false)

            let ctype = Object.keys(content)[0]
            let atype = Object.keys(a.message)[0]
            let context = {}
            if (atype != MessageType.text) context = a.message[atype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = conn.prepareMessageFromContent(key.remoteJid, content, {})
            await conn.relayWAMessage(waMessage)
        }
        // console.log('*deleted', key, `${key.id}|${key.fromMe ? 1 : 0}`, m, m.message, a, c, 'deleted*')
    } catch (e) {
        console.log(e)
    }
})

conn.on('message-new', handler)

async function handler(m, parentType, parentM) {
    let isCmd = false
    try {
        console.log(m)
        if (!m.message) return
        const messageType = Object.keys(m.message)[0]
        const message = m.message[messageType]
		var img = ''
        let text = ''
        let media = ''
        let quoted = {}
        let quotedType = ''
        switch (messageType) {
            case 'conversation':
                text = message
                break
            case 'extendedTextMessage':
                text = message.text
                if (message.contextInfo) {
                    quoted = message.contextInfo.quotedMessage
                    quotedType = Object.keys(quoted || {})[0]
                    quoted = quoted ? quoted[quotedType] : {}
                }
                break
            case 'ephemeralMessage':
                return handler({ ...m, ...message}, messageType, m)
                break
            case 'imageMessage':
            case 'videoMessage':
                text = message.caption
            default:
                if (text.startsWith('!')) {
                    media = await conn.downloadMediaMessage(m)
                    console.log(media)
                }
        }
        const id = m.key.remoteJid
        const sender = m.key.fromMe ? conn.user.jid : m.participant ? m.participant : id
        const name = pushname(sender)
        const gname = pushname(id)
        const formatMD = '\n' + text
            .replace(/(\s|^)((https?:\/\/)?.+\..+(\..+)?.*)(\s|$)/g, `${ansi}34m$2${ansi}39m`)
            .replace(/(^|\s)_(.+)?_($|\s)/g, `${ansi}3m$2${ansi}0m`)
            .replace(/(^|\s)\*(.+)?\*($|\s)/g, `${ansi}5m$2${ansi}0m`)
            .replace(/(^|\s)~(.+)?~($|\s)/g, `${ansi}9m$2${ansi}0m`)
        console.log(`[${new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp || new Date() / 1000)).toTimeString()}]\n[+${sender.split('@')[0]} ~${name}] to [${id} ~${gname}]${parentType ? parentType.replace(/(.+)Message$/, ' <$1>') : ''} <${(messageType||'').replace(/Message$/, '')}>\n${formatMD}`.trim())
        isCmd = true
        if (/^=?> /.test(text)) {
			if(!m.key.fromMe) return
          let syntaxerror = require('syntax-error')
          let util = require('util')
          let _return
          let _syntax = ''
          let _text = (/^=/.test(text) ? 'return ' : '') + text.replace(/^=?> /, '')
          let r = global.config.require ? require : (...args) => [...'global.config.require = true', args]
          try {
            let i = 15 // Limit print
            let f = {
              exports: {}
            }
            let type = Function
            if (/await/.test(text)) type = (async () => {}).constructor
            let exec = new type('print', 'm', 'conn', 'module', 'exports', 'id', 'MessageType', 'baileys', 'fetch', 'os', 'util', 'require', 'sender', _text)
            _return = await exec.call(conn, (...args) => {
              if (--i < 1) return
              console.log(...args)
              return conn.sendMessage(id, _syntax + util.format(...args), MessageType.extendedText, { quoted: m })
            }, m, conn, f, f.exports, MessageType, require('@adiwajshing/baileys'), fetch, os, util, r, sender)
          } catch (e) {
            let err = await syntaxerror(_text, 'Execution Function', {
              allowReturnOutsideFunction: true,
              allowAwaitOutsideFunction: true
            })
            if (err) _syntax = '```' + err + '```\n\n'
            _return = e
          } finally {
            conn.sendMessage(id, _syntax + util.format(_return), MessageType.extendedText, { quoted: m })
          }
        } else if (text.startsWith('!brainly ')) {
            // asking a question to brainly with API
            let soal = text.split(' ').slice(1).join(" ");
            brainly(soal, 1, "id").then(res => {
                let answer = res.data[0].jawaban[0].text;
                conn.sendMessage(id, answer, MessageType.text);
            })
		}	else if (/^!stic?ker/.test(text)) {
            console.log('check')
            if (/image|video/.test(messageType)) {
                console.log(true)
                // media = quoted ? await conn.downloadMediaMessage(message.contextInfo) : media
                let sticker = await temp(media, (i, o, y, n) => {
                    ffmpeg(i)
                        .inputOptions(['-t', '10'])
                        .complexFilter(['scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'])
                        .outputOptions([
                            '-q:v', '25',
                            '-fs', '1M',
                            '-loop', '0',
                            '-an', '-vsync', '0', '-vcodec', 'libwebp'
                        ])
                        .format('webp')
                        .on('start', commandLine => console.log(color('[FFmpeg]'), commandLine))
                        .on('progress', progress => console.log(color('[FFmpeg]'), progress))
                        .on('end', () => console.log(color('[FFmpeg]'), 'Processing finished!') && y())
                        .save(o)
                }, message.mimetype.replace(/.+\//, '.'), '.webp')
                conn.sendMessage(id, sticker, MessageType.sticker, {
                    mimetype: 'image/webp',
                    width: 512,
                    height: 512,
                    animated: /video/.test(message.mimetype)
                })
            }
        } else if (/^!(mager)?nulis/.test(text)) {
            let str = text.split ` `.slice(1).join ` `
            let img = await nulis(str)
            console.log(img)
            //conn.sendMessage(id, img.to, MessageType.text)
            conn.sendMessage(id, img, MessageType.image, {
                quoted: m
            })
        } else if (text == '.') {
            conn.sendMessage(id, randStick(), MessageType.sticker, {
                animated: true,
                quoted: m
            })
        } else if (/^!ss(web)?/.test(text)) {
            let link = text.split ` ` [1]
            if (!link) return
            if (!/^(http|ftp)/.test(link)) link = 'https://' + link
            let res = await fetch('https://nurutomo.herokuapp.com/api/ssweb?url=' + encodeURIComponent(link))
            let img = await res.buffer()
            if (/error/i.test(img.toString())) conn.sendMessage(id, img.toString(), MessageType.extendedText, {
                quoted: m
            })
            else conn.sendMessage(id, img, MessageType.image, {
                caption: link,
                quoted: m

            })
        } else if (/minta/i.test(text) && /sc(ript)?/i.test(text)) {
            conn.sendMessage(id, fs.readFileSync(__filename), MessageType.document, {
                filename: 'index.js',
		title: 'index.js',
                mimetype: 'application/octet-stream',
		quoted: m
            })
        } else isCmd = false
    } catch (e) {
        console.error(e)
        conn.sendMessage(id, util.format(e), MessageType.extendedText, {
            quoted: m
        })
    }
}

conn.connect()

function color(s) {
    return s
}

function temp(inBuf, cb, iext, oext) {
    return new Promise(async (resolve, reject) => {
        let dir = 'temp'
        let date = new Date() * 1
        fs.mkdirSync(dir, {
            recursive: true
        })
        let tempI = path.resolve(path.format({
            dir,
            name: date + '_i',
            ext: iext
        }))
        let tempO = path.resolve(path.format({
            dir,
            name: date + '_o',
            ext: oext
        }))
        fs.writeFileSync(tempI, inBuf)
        cb(tempI, tempO, () => resolve(fs.readFileSync(tempO)), reject)
        //        fs.unlinkSync(tempI)
        //        fs.unlinkSynx(tempO)
        console.log('%s -> %s', tempI, tempO)
    })
}

function pushname(id) {
    let d = conn.contacts[id] || {
        notify: id.replace(/\@.+/, '')
    }
    if (id == conn.user.jid) d = conn.user
    return d.vnamw || d.name || d.notify
}

async function fnulis(ctx, buku, text = '') {
    img = await loadImg(buku)
    c.width = img.width
    c.height = img.height
    //ctx.fillStyle = 'white'
    //ctx.fillRect(0, 0, c.width, c.height)
    ctx.drawImage(img, 0, 0, img.width, img.height)
    ctx.fillStyle = 'black'
    text = text.replace(/\r\n|\n\r|\n/g, '\n')

    let kata = ''
    ctx.font = '50px Arial' //`24px`

    if (!Array.isArray(text)) {
        let tempkata = ''
        for (let i of [...text]) {
            if (i != '\n' && ctx.measureText(tempkata + i).width < 734) tempkata += i
            else {
                kata += tempkata + '\n'
                tempkata = ''
            }
        }
        if (tempkata) kata += tempkata
    } else kata = text.join('\n')

    let fixText = kata.split('\n').slice(0, 25).join('\n')
    let y = 222
    for (let line of fixText.split('\n')) {
        ctx.fillText(line, 170, y)
        y += 39.5
    }
}

function loadImg(url) {
    new Promise((resolve, reject) => {
	let img = new Image()
	img.src = url
	img.onload = () => resolve(img)
	img.onerror = e => reject(e)
    })
}

const escape = s => String.raw `${s}`
async function nulis(str) {
    let code = `${loadImg}\n${fnulis}\nfnulis(ctx, "data:image/jpg;base64,${fs.readFileSync('buku.jpg', 'base64')}", "${escape(str)}")`
    return await canvas(code)
}

async function canvas(code) {
    let res = await fetch('https://nurutomo.herokuapp.com/api/canvas?code=' + encodeURIComponent(code))
    let image = await res.buffer()
    return image
}

function randStick() {
    return fs.readFileSync('/sdcard/WhatsApp Business/Media/WhatsApp Business Stickers/' + pickRandom(fs.readdirSync('/sdcard/WhatsApp Business/Media/WhatsApp Business Stickers')))
}

function pickRandom(arr) {
    return arr[Math.random() * arr.length | 0]
}
