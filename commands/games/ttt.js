module.exports = {
  name: 'ttt',
  aliases: ["tictactoe"],
  category: 'games',
  description: 'Tic Tac Toe',
  async execute(sock, msg, args) {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: "❌⭕ Tic Tac Toe - Coming soon!" });
    } catch (error) {
      console.error('ttt error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed!' });
    }
  }
};
