const { extractMentions } = require('../../utils');

// Generic interaction command creator
function createInteractionCommand(name, emoji, action, aliases = []) {
  return {
    name,
    aliases,
    category: 'interaction',
    description: `${action} someone`,
    async execute(sock, msg, args) {
      const sender = msg.key.remoteJid;
      const userJid = msg.key.participant || msg.key.remoteJid;
      const userName = msg.pushName || 'Someone';

      try {
        const mentions = extractMentions(msg.message);

        if (mentions.length === 0) {
          return await sock.sendMessage(sender, {
            text: `❌ Mention someone to ${action.toLowerCase()}!\n\nUsage: .${name} @user`
          });
        }

        const targetJid = mentions[0];
        const targetName = `@${targetJid.split('@')[0]}`;

        await sock.sendMessage(sender, {
          text: `${emoji} ${userName} ${action.toLowerCase()}s ${targetName}!`,
          mentions: [targetJid]
        });
      } catch (error) {
        console.error(`${name} error:`, error);
        await sock.sendMessage(sender, { text: '❌ Failed!' });
      }
    }
  };
}

module.exports = createInteractionCommand;
