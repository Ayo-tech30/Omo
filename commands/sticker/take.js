const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const stickerHandler = require('../../sticker');
const config = require('../../config');

module.exports = {
  name: 'take',
  aliases: ['steal'],
  category: 'sticker',
  description: 'Change sticker pack name and author',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    try {
      // Check if replying to a sticker
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted?.stickerMessage) {
        return await sock.sendMessage(sender, {
          text: '❌ Reply to a sticker!\n\nUsage: .take <name>, <author>\nExample: .take MyPack, John'
        });
      }

      // Parse input
      const input = args.join(' ');
      if (!input.includes(',')) {
        return await sock.sendMessage(sender, {
          text: '❌ Usage: .take <name>, <author>\nExample: .take MyPack, John'
        });
      }

      const [packName, author] = input.split(',').map(s => s.trim());

      if (!packName || !author) {
        return await sock.sendMessage(sender, {
          text: '❌ Both pack name and author are required!\n\nUsage: .take <name>, <author>\nExample: .take MyPack, John'
        });
      }

      await sock.sendMessage(sender, { text: '⏳ Modifying sticker...' });

      // Download sticker
      const buffer = await downloadMediaMessage(
        { message: quoted },
        'buffer',
        {}
      );

      // Create new sticker with custom metadata
      const newSticker = await stickerHandler.createSticker(buffer, {
        pack: packName,
        author: author,
        type: 'full'
      });

      // Send modified sticker
      await sock.sendMessage(sender, { sticker: newSticker });
    } catch (error) {
      console.error('Take command error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to modify sticker!'
      });
    }
  }
};
