module.exports = {
  name: 'simp',
  aliases: [],
  category: 'fun',
  description: 'Simp meter',
  async execute(sock, msg, args) {
    try {
      const p = Math.floor(Math.random() * 101); await sock.sendMessage(msg.key.remoteJid, { text: `😍 ${p}% Simp` });
    } catch (error) {
      console.error('simp error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
