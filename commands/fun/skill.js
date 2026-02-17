module.exports = {
  name: 'skill',
  aliases: [],
  category: 'fun',
  description: 'Skill meter',
  async execute(sock, msg, args) {
    try {
      const p = Math.floor(Math.random() * 101); await sock.sendMessage(msg.key.remoteJid, { text: `💪 ${p}% Skilled` });
    } catch (error) {
      console.error('skill error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
