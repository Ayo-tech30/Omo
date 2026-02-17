const db = require('../../database');
const { isOwner, extractMentions } = require('../../utils');
const config = require('../../config');

module.exports = {
  name: 'addmod',
  aliases: [],
  category: 'admin',
  description: 'Add a moderator (Owner only)',
  ownerOnly: true,
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    // Check if owner
    if (!isOwner(userJid)) {
      return; // Don't send error to owner
    }

    try {
      const mentions = extractMentions(msg.message);

      if (mentions.length === 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Please mention a user to add as moderator!\n\nUsage: .addmod @user'
        });
      }

      const targetJid = mentions[0];

      // Check if already mod
      const staff = await db.getStaff();
      if (staff.mods.includes(targetJid)) {
        return await sock.sendMessage(sender, {
          text: '❌ This user is already a moderator!'
        });
      }

      // Add mod
      await db.addMod(targetJid);

      await sock.sendMessage(sender, {
        text: `✅ Successfully added @${targetJid.split('@')[0]} as a moderator!`,
        mentions: [targetJid]
      });
    } catch (error) {
      console.error('Add mod error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to add moderator!'
      });
    }
  }
};
