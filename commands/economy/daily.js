const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'daily',
  aliases: [],
  category: 'economy',
  description: 'Claim your daily reward',
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
      const lastDaily = user.lastDaily || 0;
      const cooldown = 24 * 60 * 60 * 1000; // 24 hours

      if (now - lastDaily < cooldown) {
        const timeLeft = cooldown - (now - lastDaily);
        const hours = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

        return await sock.sendMessage(sender, {
          text: `⏰ You already claimed your daily reward!\n\nCome back in ${hours}h ${minutes}m`
        });
      }

      // Calculate reward (random between 500-1500)
      const reward = Math.floor(Math.random() * 1000) + 500;

      user.balance += reward;
      user.lastDaily = now;

      await db.setUser(userJid, user);

      await sock.sendMessage(sender, {
        text: `🎁 *Daily Reward Claimed!*

💰 You received: $${formatNumber(reward)}
💵 New balance: $${formatNumber(user.balance)}

Come back tomorrow for more!`
      });
    } catch (error) {
      console.error('Daily error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to claim daily reward!'
      });
    }
  }
};
