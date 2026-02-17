module.exports = {
  name: 'pov',
  aliases: [],
  category: 'fun',
  description: 'POV generator',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "📸 POV - Coming soon!" });
    } catch (error) {
      console.error('pov error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
