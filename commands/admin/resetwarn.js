module.exports = {
  name: 'resetwarn',
  aliases: [],
  category: 'admin',
  description: 'Reset warnings',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "✅ Warnings reset!" });
    } catch (error) {
      console.error('resetwarn error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
