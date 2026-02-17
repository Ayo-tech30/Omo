const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  Browsers,
  delay
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');
const config = require('./config');
const db = require('./database');
const commandHandler = require('./commandHandler');
const { isOldMessage } = require('./utils');
const fs = require('fs-extra');
const path = require('path');

// Ensure directories exist
fs.ensureDirSync('./auth');
fs.ensureDirSync('./temp');

// Readline interface for pairing code
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
  // Initialize database
  await db.initialize();

  // Load commands
  commandHandler.loadCommands();

  // Auth state
  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  // Get latest version
  const { version } = await fetchLatestBaileysVersion();

  // Create socket
  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false, // Disabled QR code
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
    },
    browser: Browsers.ubuntu('Chrome'),
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    getMessage: async (key) => {
      return { conversation: '' };
    }
  });

  // Handle pairing code
  if (!state.creds.registered) {
    const phoneNumber = await question('Enter your phone number (with country code, e.g., 2349049460676): ');
    const code = await sock.requestPairingCode(phoneNumber.trim());
    console.log(`\n🔐 Your Pairing Code: ${code}\n`);
    console.log('Enter this code in WhatsApp:');
    console.log('1. Open WhatsApp on your phone');
    console.log('2. Tap Menu (⋮) > Linked Devices');
    console.log('3. Tap "Link a Device"');
    console.log(`4. Enter the code: ${code}\n`);
  }

  // Save credentials
  sock.ev.on('creds.update', saveCreds);

  // Connection update
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      
      console.log('Connection closed. Reconnecting:', shouldReconnect);
      
      if (shouldReconnect) {
        setTimeout(() => startBot(), 5000);
      }
    } else if (connection === 'open') {
      console.log('✅ Connected successfully!');
      console.log('Bot Name:', config.BOT_NAME);
      console.log('Prefix:', config.PREFIX);
      rl.close(); // Close readline after connection
    }
  });

  // Message handler
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      try {
        // Ignore own messages
        if (msg.key.fromMe) continue;

        // Ignore status updates
        if (msg.key.remoteJid === 'status@broadcast') continue;

        // Check if message is old
        if (isOldMessage(msg.messageTimestamp)) {
          console.log('Ignoring old message');
          continue;
        }

        // Extract text from message
        const text = 
          msg.message?.conversation ||
          msg.message?.extendedTextMessage?.text ||
          msg.message?.imageMessage?.caption ||
          msg.message?.videoMessage?.caption ||
          '';

        // CRITICAL: Only process messages that start with prefix
        if (!text.startsWith(config.PREFIX)) {
          continue; // Ignore media without commands
        }

        // Parse command
        const args = text.slice(config.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!commandName) continue;

        console.log(`Command received: ${commandName} from ${msg.key.remoteJid}`);

        // Handle command
        await commandHandler.handleCommand(sock, msg, commandName, args);

      } catch (error) {
        console.error('Message handler error:', error);
        // Don't send error messages for non-command messages
      }
    }
  });

  // Group participants update
  sock.ev.on('group-participants.update', async (update) => {
    try {
      const { id, participants, action } = update;
      const groupData = await db.getGroup(id);

      if (action === 'add' && groupData.welcome) {
        for (const participant of participants) {
          const welcomeMsg = groupData.welcomeMessage || `Welcome to the group @${participant.split('@')[0]}!`;
          
          await sock.sendMessage(id, {
            text: welcomeMsg,
            mentions: [participant]
          });
        }
      }

      if (action === 'remove' && groupData.leave) {
        for (const participant of participants) {
          const leaveMsg = groupData.leaveMessage || `Goodbye @${participant.split('@')[0]}!`;
          
          await sock.sendMessage(id, {
            text: leaveMsg,
            mentions: [participant]
          });
        }
      }
    } catch (error) {
      console.error('Group participants update error:', error);
    }
  });

  return sock;
}

// Start bot
startBot().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});
