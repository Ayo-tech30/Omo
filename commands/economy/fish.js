const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'fish',
  aliases: [],
  category: 'economy',
  description: 'Go fishing',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);
      if (!user.registered) {
        return await sock.sendMessage(sender, { text: '❌ You are not registered! Use .reg to register first.' });
      }

      const now = Date.now();
      const cooldown = 120000; // 2 minutes

      if (user.lastFish && now - user.lastFish < cooldown) {
        const timeLeft = Math.ceil((cooldown - (now - user.lastFish)) / 1000);
        return await sock.sendMessage(sender, { text: `⏰ Wait ${timeLeft}s before fishing again!` });
      }

      const fishes = [
        { name: '🐟 Small Fish', value: 50 },
        { name: '🐠 Tropical Fish', value: 100 },
        { name: '🐡 Pufferfish', value: 150 },
        { name: '🦈 Shark', value: 500 },
        { name: '🐙 Octopus', value: 300 },
        { name: '🦞 Lobster', value: 400 }
      ];

      const caught = fishes[Math.floor(Math.random() * fishes.length)];
      
      user.balance += caught.value;
      user.lastFish = now;

      await db.setUser(userJid, user);

      await sock.sendMessage(sender, {
        text: `🎣 You caught a ${caught.name}!\n\n💰 Earned: $${formatNumber(caught.value)}\n💵 Balance: $${formatNumber(user.balance)}`
      });
    } catch (error) {
      console.error('Fish error:', error);
      await sock.sendMessage(sender, { text: '❌ Failed to fish!' });
    }
  }
};
