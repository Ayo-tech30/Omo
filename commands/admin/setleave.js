module.exports = {
  name: 'setleave',
  aliases: [],
  category: 'admin',
  description: 'Set leave message',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "✅ Leave message set!" });
    } catch (error) {
      console.error('setleave error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
