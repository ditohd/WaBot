const fetch = require('node-fetch')
const path = require('path')
const axios = require('axios')
const cfonts = require('cfonts')
const spin = require('spinnies')
const Crypto = require('crypto')
const { fetchBase64 } = require('./fetcher')
const { fromBuffer } = require('file-type')
const translatte = require('translatte')
const striptags = require('striptags')
const moment = require("moment-timezone")

function curlyRemover(chat) {
  if (chat !== undefined) {
      let sr = /{(.*?)}/g;
      let ket = chat.toString().replace(sr, '');
      return ket;
  }
  return chat;
}

async function customText(imageUrl, top, bottom) {
  return new Promise((resolve, reject) => {
      let fix = str => str.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
      fetchBase64(`https://api.memegen.link/images/custom/${fix(top)}/${fix(bottom)}.png?background=${imageUrl}`, 'image/png')
          .then(result => resolve(result))
          .catch(err => {
              console.error(err)
              reject(err)
          })
  })
}

function uploadImages(buffData, type) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
      const {
          ext
      } = await fromBuffer(buffData)
      let temp = './temp'
      let name = new Date() * 1
      let filePath = path.join(temp, 'image', `${name}.${ext}`)
      const _buffData = type ? await resizeImage(buffData, false) : buffData
      fs.writeFile(filePath, _buffData, {
          encoding: 'base64'
      }, (err) => {
          if (err) return reject(err)
          console.log('Uploading image to telegra.ph server...')
          const fileData = fs.readFileSync(filePath)
          const form = new FormData()
          form.append('file', fileData, 'tmp.' + ext)
          fetch('https://telegra.ph/upload', {
              method: 'POST',
              body: form
          })
              .then(res => res.json())
              .then(res => {
                  if (res.error) return reject(res.error)
                  resolve('https://telegra.ph' + res[0].src)
              })
              .then(() => fs.unlinkSync(filePath))
              .catch(err => reject(err))
      })
  })
}

const wait = async (media) => new Promise(async (resolve, reject) => {
    const attachmentData = `data:image/jpeg;base64,${media.toString('base64')}`
    const response = await fetch("https://trace.moe/api/search",{method: "POST",body: JSON.stringify({ image: attachmentData }),headers: { "Content-Type": "application/json" }});
    if (!response.ok) reject(`Gambar tidak ditemukan!`);
    const result = await response.json()
    try {
    	const { is_adult, title, title_chinese, title_romaji, title_english, episode, season, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
    	let belief = () => similarity < 0.89 ? "Saya memiliki keyakinan rendah dalam hal ini : " : ""
    	let ecch = () => is_adult ? "Iya" : "Tidak"
    	resolve({video: await getBuffer(`https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`), teks: `${belief()}
~> Ecchi : *${ecch()}*
~> Judul Jepang : *${title}*
~> Ejaan Judul : *${title_romaji}*
~> Judul Inggris : *${title_english}*
~> Episode : *${episode}*
~> Season  : *${season}*`});
	} catch (e) {
		console.log(e)
		reject(`Saya tidak tau ini anime apa`)
	}
})

const quotemaker = async (quotes, author = 'EmditorBerkelas', type = 'random') => {
  var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
  const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  const json = await response.json()
  if (json.status) {
      if (json.result !== '') {
        const base64 = await getBuffer(json.result)
          return base64
      }
  }
}

const surah = async (surah, ayat) => new Promise(async (resolve,reject) => {
  if (!isNaN(surah) && surah <= 114) {
      if (ayat !== undefined) {
          axios.get(`https://api.banghasan.com/quran/format/json/surat/${surah}/ayat/${ayat}`).then((res) => {
              if (!(res.data.ayat.error)) {
                  let hasil = `_*Surah ${res.data.surat.nama} ayat ${ayat}*_\n==============================\n`;
                  let indexs = res.data.ayat.data.ar;
                  let a = res.data.ayat.data.idt;
                  let b = res.data.ayat.data.id;
                  Object.keys(indexs).forEach(function (i) {
                      hasil += `*[ ${indexs[i].ayat} ]*  ${indexs[i].teks}\n`;
                      hasil += `\n${striptags(a[i].teks)}\n`;
                      hasil += `\n_*Artinya*_ : ${curlyRemover(b[i].teks)}\n`;
                  })
                  resolve(hasil+'==============================\n=={ _*Processing Sukses # ZJ-Bot*_ }==')
              } else {
                  reject(`Error, ayat ${ayat} dari surah ${surah} tidak valid!`)
              }
          })
      } else {
          axios.get(`https://api.banghasan.com/quran/format/json/surat/${surah}`).then((res) => {
              const sr = /<(.*?)>/gi;
              const hs = res.data.hasil[0];
              const ket = `${hs.keterangan}`.replace(sr, '');
              resolve(`
========{ _*Surah ${hs.nama}*_ }========
📌 Nomor : ${hs.nomor}
📌 Asma : ${hs.asma}
📌 Tipe : ${hs.type}
📌 Urut : ${hs.urut}
📌 Ruku : ${hs.rukuk}
📌 Arti : ${hs.arti}
📌 Jumlah Ayat : ${hs.ayat}
==============================
${ket}\n=={ _*Processing Sukses # ZJ-Bot*_ }==
  `)
          })
      }
  } else {
      reject(`Error, nomor surah ${surah} tidak valid\n*!list surah* 📌 menampilkan list surah`)
  }
})

const corona = async () => new Promise(async (resolve, reject) => {
  axios.all([
      axios.get('https://covid19.mathdro.id/api'),
      axios.get('https://covid19.mathdro.id/api/countries/id')
  ]).then((res) => {
      var hasil = res[0].data;
      var id = res[1].data;
      function intl(str) {
          var nf = Intl.NumberFormat();
          return nf.format(str);
      }
      var date = new Date(id.lastUpdate);
      date = moment(date).fromNow();
      translatte(date, {to: 'id'}).then(res => {
          date = res.text
          return resolve(`
===={ _*Kasus COVID19 di Dunia*_ }====
😷Positif : ${intl(hasil.confirmed.value)} kasus
😇Sembuh : ${intl(hasil.recovered.value)} kasus
😭 Meninggal : ${intl(hasil.deaths.value)} kasus
==============================
=={ _*Kasus COVID19 di Indonesia*_ }==
😷Positif : ${intl(id.confirmed.value)} kasus
😇Sembuh : ${intl(id.recovered.value)} kasus
😭 Meninggal : ${intl(id.deaths.value)} kasus
==============================
======{ _*Tips kesehatan*_ }=======
✅Mencuci tangan dengan benar
✅Menggunakan masker
✅Menjaga daya tahan tubuh
✅Menerapkan physical distancing
==============================
Update terakhir ${date}
======{ _*ZJ-Bot Information*_ }======
`)
      })
  }).catch((err) => {
      return reject(err)
  })
})

const h2k = (number) => {
    var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

const randomBytes = (length) => {
    return Crypto.randomBytes(length)
}

const generateMessageID = () => {
    return randomBytes(10).toString('hex').toUpperCase()
}

const getGroupAdmins = (participants) => {
	admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const spinner = { 
  "interval": 120,
  "frames": [
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
    "🕛"
  ]}

let globalSpinner;


const getGlobalSpinner = (disableSpins = false) => {
  if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
  return globalSpinner;
}

spins = getGlobalSpinner(false)

const start = (id, text) => {
	spins.add(id, {text: text})
		/*setTimeout(() => {
			spins.succeed('load-spin', {text: 'Suksess'})
		}, Number(wait) * 1000)*/
	}
const info = (id, text) => {
	spins.update(id, {text: text})
}
const success = (id, text) => {
	spins.succeed(id, {text: text})

	}

const close = (id, text) => {
	spins.fail(id, {text: text})
}

const banner = cfonts.render(('SELF|BOT'), {
    font: 'chrome',
    color: 'candy',
    align: 'center',
    gradient: ["red","yellow"],
    lineHeight: 3
  });


module.exports = { wait, getBuffer, surah, quotemaker, customText, uploadImages, corona, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, banner, close }
