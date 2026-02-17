const dares = [
  "Send a voice note singing a song",
  "Change your profile picture to something funny",
  "Text your crush",
  "Do 20 pushups",
  "Post an embarrassing photo",
  "Call a random contact and sing to them",
  "Dance for 1 minute",
  "Tell a joke",
  "Compliment everyone in the group",
  "Share your most embarrassing story"
];

module.exports = {
  name: 'dare',
  category: 'fun',
  async execute(sock, msg, args) {
    const dare = dares[Math.floor(Math.random() * dares.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🎯 *DARE*\n\n${dare}` });
  }
};
