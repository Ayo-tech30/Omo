const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'deposit',
  aliases: ['dep'],
  category: 'economy',
  description: 'Deposit money to bank',
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
          text: '❌ Specify amount!\n\nUsage: .deposit <amount>\nExample: .deposit 1000\n.deposit all'
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
          text: '❌ Invalid amount!'
        });
      }

      if (amount > user.balance) {
        return await sock.sendMessage(sender, {
          text: `❌ Insufficient balance!\n\n👛 Wallet: $${formatNumber(user.balance)}`
        });
      }

      user.balance -= amount;
      user.bankBalance += amount;

      await db.setUser(userJid, user);

      await sock.sendMessage(sender, {
        text: `✅ *Deposit Successful!*

💵 Deposited: $${formatNumber(amount)}
👛 Wallet: $${formatNumber(user.balance)}
🏦 Bank: $${formatNumber(user.bankBalance)}`
      });
    } catch (error) {
      console.error('Deposit error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to deposit!'
      });
    }
  }
};
