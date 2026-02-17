module.exports = {
  name: 'lesbian',
  aliases: [],
  category: 'fun',
  description: 'Lesbian meter',
  async execute(sock, msg, args) {
    try {
      const p = Math.floor(Math.random() * 101); await sock.sendMessage(msg.key.remoteJid, { text: `🏳️‍🌈 ${p}% Lesbian` });
    } catch (error) {
      console.error('lesbian error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
