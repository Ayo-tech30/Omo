const config = require('./config');
const db = require('./database');

// Permission Checks
const isOwner = (jid) => jid === config.OWNER_NUMBER;

const isMod = async (jid) => {
  const staff = await db.getStaff();
  return staff.mods.includes(jid);
};

const isGuardian = async (jid) => {
  const staff = await db.getStaff();
  return staff.guardians.includes(jid);
};

const isStaff = async (jid) => {
  if (isOwner(jid)) return true;
  return (await isMod(jid)) || (await isGuardian(jid));
};

// Extract mentions from message
const extractMentions = (message) => {
  const mentions = [];
  if (message?.extendedTextMessage?.contextInfo?.mentionedJid) {
    mentions.push(...message.extendedTextMessage.contextInfo.mentionedJid);
  }
  return mentions;
};

// Get quoted message
const getQuoted = (message) => {
  return message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
};

// Format number
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Random element from array
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get username
const getName = async (jid, sock) => {
  try {
    const contact = await sock.getContact(jid);
    return contact?.notify || contact?.name || jid.split('@')[0];
  } catch {
    return jid.split('@')[0];
  }
};

// Format JID
const formatJid = (jid) => {
  if (!jid) return '';
  return jid.replace(/:\d+/g, '').replace(/@.+/g, '') + '@s.whatsapp.net';
};

// Check if group admin
const isGroupAdmin = async (sock, groupJid, userJid) => {
  try {
    const groupMetadata = await sock.groupMetadata(groupJid);
    const participant = groupMetadata.participants.find(p => p.id === userJid);
    return participant?.admin === 'admin' || participant?.admin === 'superadmin';
  } catch {
    return false;
  }
};

// Check if bot is admin
const isBotAdmin = async (sock, groupJid) => {
  try {
    const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    return await isGroupAdmin(sock, groupJid, botJid);
  } catch {
    return false;
  }
};

// Get group admins
const getGroupAdmins = async (sock, groupJid) => {
  try {
    const groupMetadata = await sock.groupMetadata(groupJid);
    return groupMetadata.participants
      .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
      .map(p => p.id);
  } catch {
    return [];
  }
};

// Parse time string (e.g., "1d", "2h", "30m")
const parseTime = (timeStr) => {
  const match = timeStr.match(/^(\d+)([smhd])$/);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  const multipliers = {
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000
  };
  
  return value * multipliers[unit];
};

// Check if message is old
const isOldMessage = (timestamp) => {
  if (!config.IGNORE_OLD_MESSAGES) return false;
  const now = Date.now();
  const messageTime = timestamp * 1000;
  return (now - messageTime) > (config.MESSAGE_TIMEOUT * 1000);
};

module.exports = {
  isOwner,
  isMod,
  isGuardian,
  isStaff,
  extractMentions,
  getQuoted,
  formatNumber,
  random,
  sleep,
  getName,
  formatJid,
  isGroupAdmin,
  isBotAdmin,
  getGroupAdmins,
  parseTime,
  isOldMessage
};
