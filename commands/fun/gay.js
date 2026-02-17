module.exports = {
  name: 'gay',
  category: 'fun',
  async execute(sock, msg, args) {
    const percentage = Math.floor(Math.random() * 101);
    const bar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🏳️‍🌈 *GAY METER*\n\n━━━━━━━━━━━━━━━\n${bar}\n━━━━━━━━━━━━━━━\n\n${percentage}% Gay`
    });
  }
};
