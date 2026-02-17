const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'withdraw',
  aliases: ['wd'],
  category: 'economy',
  description: 'Withdraw money from bank',
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
          text: '❌ Specify amount!\n\nUsage: .withdraw <amount>\nExample: .withdraw 1000\n.withdraw all'
        });
      }

      let amount;
      if (args[0].toLowerCase() === 'all') {
        amount = user.bankBalance;
      } else {
        amount = parseInt(args[0]);
      }

      if (isNaN(amount) || amount <= 0) {
        return await sock.sendMessage(sender, {
          text: '❌ Invalid amount!'
        });
      }

      if (amount > user.bankBalance) {
        return await sock.sendMessage(sender, {
          text: `❌ Insufficient bank balance!\n\n🏦 Bank: $${formatNumber(user.bankBalance)}`
        });
      }

      user.bankBalance -= amount;
      user.balance += amount;

      await db.setUser(userJid, user);

      await sock.sendMessage(sender, {
        text: `✅ *Withdrawal Successful!*

💵 Withdrew: $${formatNumber(amount)}
👛 Wallet: $${formatNumber(user.balance)}
🏦 Bank: $${formatNumber(user.bankBalance)}`
      });
    } catch (error) {
      console.error('Withdraw error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to withdraw!'
      });
    }
  }
};
