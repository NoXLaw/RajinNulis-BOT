/*
* "Wahai Orang - Orang Yang Beriman, Mengapakah Kamu Mengatakan Sesuatu Yang Tidak Kamu Kerjakan?
* Amat Besar Kebencian Di Sisi Allah Bahwa Kamu Mengatakan Apa - Apa Yang Tidak Kamu Kerjakan."
* (QS Ash - Shaff : 2-3).
*/
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const fetch = require('node-fetch')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const { menu, donate, listnulis, info } = require('./lib/cmd')
const { stdout } = require('process')

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = zahra = async (zahraaa, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('#')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }

        const menulis = {
            magernulissatu: 'Harap Tunggu, Bot Sedang Menulis Buku 1!~'
            }
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await zahraaa.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await zahraaa.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('#')) console.log('\x1b[1;31m—\x1b[1;37m›', '\x1b{    Subscribe MFarelS CH    \x1b[1;37m}', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('#')) console.log('\x1b[1;31m—\x1b[1;37m›', '\x1b{    Subscribe MFarelS CH    \x1b[1;37m}', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        switch(command) {
        //MENU//
        case '/help':
        case '/menu':
        case '#help':
        case '#menu':
            zahraaa.reply(from, menu, id)
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //DONATE//
        case '/donate':
        case '/donasi':
        case '#donate':
        case '#donasi':
            zahraaa.reply(from, donate, id)
            zahraaa.sendStickerfromUrl(from, 'https://i.ibb.co/KGncspR/Zahraaa.jpg', { method: 'get' })
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //LIST NULIS//
        case '#listnulis':
        case '#magernulis':
        case '/listnulis':
        case '/magernulis':
            zahraaa.reply(from, listnulis, id)
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //INFO//
        case '/info':
        case '#info':
            zahraaa.reply(from, info, id)
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        //MAGER NULIS//
        case '/magernulis1':
        case '#magernulis1':
            if (args.length === 1) return await zahraaa.reply(from, 'Kirim Perintah */magernulis1 [teks]* Atau *#magernulis1 [teks]*', id)
            const diTulis = body.slice(12)
            await zahraaa.reply(from, menulis.magernulissatu, id)
            const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
            const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const waktu = (day + ' ' + months[month] + ' ' + year)
            const hari = (thisDay)
            spawn('convert', [
                './mager/magernulis/magernulis1.jpg',
                '-font',
                'Indie-Flower',
                '-size',
                '700x960',
                '-pointsize',
                '20',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+78',
                hari,
                '-font',
                'Indie-Flower',
                '-size',
                '700x960',
                '-pointsize',
                '18',
                '-interline-spacing',
                '1',
                '-annotate',
                '+806+102',
                waktu,
                '-font',
                'Indie-Flower',
                '-size',
                '700x960',
                '-pointsize',
                '20',
                '-interline-spacing',
                '-7.5',
                '-annotate',
                '+344+142',
                panjangBaris,
                './mager/magernulis√/magernulis1√.jpg'
            ])
            .on('error', () => zahraaa.reply(from, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
            .on('exit', () => {
                zahraaa.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'Jarot.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© Powered By MagerNulis BOT✓*', id)
            })
        break
/*

Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan JavaScript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
MOHON UNTUK TIDAK MENGHAPUS SOURCE GITHUB

*/
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //zahraaa.kill().then(a => console.log(a))
    }
}
