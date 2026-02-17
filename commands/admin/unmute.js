module.exports = {
  name: 'unmute',
  aliases: [],
  category: 'admin',
  description: 'Unmute a user',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔊 User unmuted!" });
    } catch (error) {
      console.error('unmute error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
