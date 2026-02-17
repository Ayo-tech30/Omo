module.exports = {
  // Bot Configuration
  OWNER_NUMBER: '2349049460676@s.whatsapp.net',
  BOT_NAME: 'Violet (Nexora)',
  PREFIX: '.',
  
  // Sticker Configuration
  DEFAULT_STICKER_PACK: 'Kumoko',
  DEFAULT_STICKER_AUTHOR: '𝚴𝚵𝚾𝚯𝚪𝚫',
  
  // Firebase Configuration (set these in .env or Replit Secrets)
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  
  // Bot Settings
  IGNORE_OLD_MESSAGES: true,
  MESSAGE_TIMEOUT: 300, // 5 minutes in seconds
  
  // API Keys (optional - for AI features)
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  
  // Permission Levels
  PERMISSION: {
    OWNER: 5,
    MOD: 4,
    GUARDIAN: 3,
    PREMIUM: 2,
    USER: 1
  }
};
