const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp');

module.exports = {
  name: 'toimg',
  aliases: ['toimage'],
  category: 'converter',
  description: 'Convert sticker to image',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    try {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted?.stickerMessage) {
        return await sock.sendMessage(sender, { text: '❌ Reply to a sticker!' });
      }

      await sock.sendMessage(sender, { text: '⏳ Converting...' });

      const buffer = await downloadMediaMessage({ message: quoted }, 'buffer', {});
      
      // Convert to PNG
      const image = await sharp(buffer).png().toBuffer();

      await sock.sendMessage(sender, {
        image: image,
        caption: '✅ Converted to image!'
      });
    } catch (error) {
      console.error('Toimg error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed to convert!' });
    }
  }
};
