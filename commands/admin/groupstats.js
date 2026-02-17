module.exports = {
  name: 'groupstats',
  aliases: ["gs"],
  category: 'admin',
  description: 'Group stats',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📊 Group stats - Coming soon!" });
    } catch (error) {
      console.error('groupstats error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
