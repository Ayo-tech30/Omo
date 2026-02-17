const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const stickerHandler = require('../../sticker');

module.exports = {
  name: 'sticker',
  aliases: ['s'],
  category: 'sticker',
  description: 'Convert image/video/gif to sticker',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    try {
      // Get media from quoted message or current message
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const imageMessage = quoted?.imageMessage || msg.message?.imageMessage;
      const videoMessage = quoted?.videoMessage || msg.message?.videoMessage;
      
      if (!imageMessage && !videoMessage) {
        return await sock.sendMessage(sender, {
          text: '❌ Reply to an image/video/gif or send with caption!'
        });
      }

      await sock.sendMessage(sender, { text: '⏳ Creating sticker...' });

      // Download media
      const buffer = await downloadMediaMessage(
        { message: quoted || msg.message },
        'buffer',
        {}
      );

      // Create sticker
      const sticker = await stickerHandler.createSticker(buffer, {
        type: 'full'
      });

      // Send sticker
      await sock.sendMessage(sender, { sticker: sticker });
    } catch (error) {
      console.error('Sticker command error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to create sticker. Make sure the file is an image/video/gif!'
      });
    }
  }
};
