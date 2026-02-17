module.exports = {
  name: 'jihad',
  aliases: [],
  category: 'interaction',
  description: 'Jihad',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "💣 Jihad - Coming soon!" });
    } catch (error) {
      console.error('jihad error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
