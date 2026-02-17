const db = require('../../database');

module.exports = {
  name: 'reg',
  aliases: ['register'],
  category: 'economy',
  description: 'Register to use economy features',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const userJid = msg.key.participant || msg.key.remoteJid;

    try {
      const user = await db.getUser(userJid);

      if (user.registered) {
        return await sock.sendMessage(sender, {
          text: '✅ You are already registered!'
        });
      }

      // Register user
      user.registered = true;
      user.registeredAt = Date.now();
      user.name = msg.pushName || 'User';
      user.balance = 1000;
      user.bankBalance = 0;

      await db.setUser(userJid, user);

      const welcomeText = `✅ *Registration Successful!*

Welcome to Nexora, ${user.name}!

🎁 Starting Balance: $1,000
💎 You can now use all economy features

Use .menu to see all available commands!`;

      await sock.sendMessage(sender, { text: welcomeText });
    } catch (error) {
      console.error('Registration error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Registration failed! Please try again.'
      });
    }
  }
};
