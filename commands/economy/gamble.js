const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'gamble',
  aliases: ['bet'],
  category: 'economy',
  description: 'Gamble your money',
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

      if (args.length === 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Please specify an amount!\n\nUsage: .gamble <amount>\nExample: .gamble 100'
        });
      }

      let amount;
      if (args[0].toLowerCase() === 'all') {
        amount = user.balance;
      } else {
        amount = parseInt(args[0]);
      }

      if (isNaN(amount) || amount <= 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Please enter a valid amount!'
        });
      }

      if (amount > user.balance) {
        return await sock.sendMessage(sender, {
          text: `❌ You don't have enough money!\n\nYour balance: $${formatNumber(user.balance)}`
        });
      }

      // Gamble logic (50% chance)
      const won = Math.random() > 0.5;

      if (won) {
        const winAmount = Math.floor(amount * 1.5);
        user.balance += winAmount;
        
        await db.setUser(userJid, user);

        await sock.sendMessage(sender, {
          text: `🎰 *GAMBLE WON!*

💰 Bet: $${formatNumber(amount)}
✅ Won: $${formatNumber(winAmount)}
💵 New balance: $${formatNumber(user.balance)}`
        });
      } else {
        user.balance -= amount;
        
        await db.setUser(userJid, user);

        await sock.sendMessage(sender, {
          text: `🎰 *GAMBLE LOST!*

💰 Bet: $${formatNumber(amount)}
❌ Lost: $${formatNumber(amount)}
💵 New balance: $${formatNumber(user.balance)}`
        });
      }
    } catch (error) {
      console.error('Gamble error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to gamble!'
      });
    }
  }
};
