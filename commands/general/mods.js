const db = require('../../database');
const config = require('../../config');

module.exports = {
  name: 'mods',
  aliases: ['staff'],
  category: 'general',
  description: 'View bot staff members',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    try {
      const staff = await db.getStaff();

      const modsText = `🌍⃝⃘̉̉̉━⋆─⋆──❂
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚㋛ ⋆｡ ❀
┊ ☠︎︎
✧ ɴᴇxᴏʀᴀ ꜱᴛᴀꜰꜰ𓂃✍︎𝄞
╰────────────────❂
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ᴏᴡɴᴇʀ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━「 👑 」
┃ @${config.OWNER_NUMBER.split('@')[0]}
┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ᴍᴏᴅᴇʀᴀᴛᴏʀꜱ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━「 🛡️ 」
${staff.mods.length > 0 ? staff.mods.map(m => `┃ @${m.split('@')[0]}`).join('\n') : '┃ No moderators yet'}
┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ɢᴜᴀʀᴅɪᴀɴꜱ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━「 ⚔️ 」
${staff.guardians.length > 0 ? staff.guardians.map(g => `┃ @${g.split('@')[0]}`).join('\n') : '┃ No guardians yet'}
┗━━━━━━━━━━━━━❥❥❥

nexora </> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴᴇxᴏʀᴀ • ꨄ︎ 𝙆𝙔𝙉𝙓 ꨄ︎`;

      const mentions = [config.OWNER_NUMBER, ...staff.mods, ...staff.guardians];

      await sock.sendMessage(sender, {
        text: modsText,
        mentions: mentions
      });
    } catch (error) {
      console.error('Mods command error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to fetch staff list!'
      });
    }
  }
};
