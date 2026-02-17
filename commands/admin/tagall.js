const { isGroupAdmin, isBotAdmin } = require('../../utils');

module.exports = {
  name: 'tagall',
  aliases: ['tag'],
  category: 'admin',
  description: 'Tag all group members',
  groupOnly: true,
  adminOnly: true,
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      // Check if user is admin
      const isAdmin = await isGroupAdmin(sock, sender, userJid);
      if (!isAdmin) {
        return await sock.sendMessage(sender, {
          text: '❌ This command is only for group admins!'
        });
      }

      // Get group metadata
      const groupMetadata = await sock.groupMetadata(sender);
      const participants = groupMetadata.participants.map(p => p.id);
      const groupName = groupMetadata.subject;

      const message = args.join(' ') || 'Attention!';
      const userName = msg.pushName || 'Admin';

      const tagText = `🌍⃝⃘̉̉̉━⋆─⋆──❂
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚㋛ ⋆｡ ❀
┊ ☠︎︎
✧ ${message}𓂃✍︎𝄞
╰────────────────❂
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ɴᴇxᴏʀᴀ ᴛᴀɢᴀʟʟ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━「 👥 ᴍᴇᴍʙᴇʀꜱ 」
${participants.map(p => `┃ @${p.split('@')[0]}`).join('\n')}
┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃ ɢʀᴏᴜᴘ - ${groupName}
┃ ᴍᴇᴍʙᴇʀꜱ - ${participants.length}
┃ ᴛᴀɢɢᴇᴅ ʙʏ - ${userName}
┗━━━━━━━━━━━━━❥❥❥`;

      await sock.sendMessage(sender, {
        text: tagText,
        mentions: participants
      });
    } catch (error) {
      console.error('Tagall error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to tag members!'
      });
    }
  }
};
