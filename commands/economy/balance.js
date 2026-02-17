const db = require('../../database');
const { formatNumber } = require('../../utils');

module.exports = {
  name: 'balance',
  aliases: ['bal', 'money'],
  category: 'economy',
  description: 'Check your balance',
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

      const balanceText = `💰 *Your Balance*

👛 Wallet: $${formatNumber(user.balance)}
🏦 Bank: $${formatNumber(user.bankBalance)}
💎 Total: $${formatNumber(user.balance + user.bankBalance)}`;

      await sock.sendMessage(sender, { text: balanceText });
    } catch (error) {
      console.error('Balance error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Failed to fetch balance!'
      });
    }
  }
};
