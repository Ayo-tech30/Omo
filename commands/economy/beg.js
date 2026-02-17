const db = require('../../database');
const { formatNumber } = require('../../utils');

const begResponses = [
  { text: 'A kind stranger gave you', min: 50, max: 200 },
  { text: 'Someone dropped', min: 30, max: 150 },
  { text: 'You found', min: 40, max: 180 },
  { text: 'A generous person donated', min: 60, max: 250 },
  { text: 'You received', min: 20, max: 100 }
];

module.exports = {
  name: 'beg',
  aliases: [],
  category: 'economy',
  description: 'Beg for money',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);

      if (!user.registered) {
        return await sock.sendMessage(sender, {
          text: '❌ You are not registered! Use .reg to register first.'
        });
      }

      const now = Date.now();
      const cooldown = 60000; // 1 minute

      if (user.lastBeg && now - user.lastBeg < cooldown) {
        const timeLeft = Math.ceil((cooldown - (now - user.lastBeg)) / 1000);
        return await sock.sendMessage(sender, {
          text: `⏰ Please wait ${timeLeft}s before begging again!`
        });
      }

      const response = begResponses[Math.floor(Math.random() * begResponses.length)];
      const amount = Math.floor(Math.random() * (response.max - response.min + 1)) + response.min;

      user.balance += amount;
      user.lastBeg = now;

      await db.setUser(userJid, user);

      await sock.sendMessage(sender, {
        text: `🤲 ${response.text} $${formatNumber(amount)}!\n\n💰 New balance: $${formatNumber(user.balance)}`
      });
    } catch (error) {
      console.error('Beg error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to beg!'
      });
    }
  }
};
