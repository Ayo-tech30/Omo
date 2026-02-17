module.exports = {
  name: 'greekgod',
  aliases: ["gg"],
  category: 'games',
  description: 'Greek God game',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "⚡ Greek God - Coming soon!" });
    } catch (error) {
      console.error('greekgod error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
