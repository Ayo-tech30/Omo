module.exports = {
  name: 'mute',
  aliases: [],
  category: 'admin',
  description: 'Mute a user',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "🔇 User muted!" });
    } catch (error) {
      console.error('mute error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
