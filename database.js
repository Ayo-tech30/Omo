const admin = require('firebase-admin');
const config = require('./config');

class Database {
  constructor() {
    this.db = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      const serviceAccount = {
        type: "service_account",
        project_id: config.FIREBASE_PROJECT_ID,
        client_email: config.FIREBASE_CLIENT_EMAIL,
        private_key: config.FIREBASE_PRIVATE_KEY
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${config.FIREBASE_PROJECT_ID}.firebaseio.com`
      });

      this.db = admin.firestore();
      this.initialized = true;
      console.log('✅ Firebase initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization failed:', error);
      // Fallback to local storage
      this.db = null;
    }
  }

  // User Functions
  async getUser(jid) {
    try {
      if (!this.db) return this.getDefaultUser(jid);
      const doc = await this.db.collection('users').doc(jid).get();
      return doc.exists ? doc.data() : this.getDefaultUser(jid);
    } catch (error) {
      console.error('Get user error:', error);
      return this.getDefaultUser(jid);
    }
  }

  async setUser(jid, data) {
    try {
      if (!this.db) return;
      await this.db.collection('users').doc(jid).set(data, { merge: true });
    } catch (error) {
      console.error('Set user error:', error);
    }
  }

  getDefaultUser(jid) {
    return {
      jid,
      name: '',
      age: 0,
      bio: '',
      balance: 1000,
      bankBalance: 0,
      orbs: 0,
      inventory: [],
      cards: [],
      deck: [],
      registered: false,
      registeredAt: null,
      lastDaily: 0,
      warnings: 0,
      permission: 1
    };
  }

  // Group Functions
  async getGroup(jid) {
    try {
      if (!this.db) return this.getDefaultGroup(jid);
      const doc = await this.db.collection('groups').doc(jid).get();
      return doc.exists ? doc.data() : this.getDefaultGroup(jid);
    } catch (error) {
      console.error('Get group error:', error);
      return this.getDefaultGroup(jid);
    }
  }

  async setGroup(jid, data) {
    try {
      if (!this.db) return;
      await this.db.collection('groups').doc(jid).set(data, { merge: true });
    } catch (error) {
      console.error('Set group error:', error);
    }
  }

  getDefaultGroup(jid) {
    return {
      jid,
      welcome: false,
      welcomeMessage: '',
      leave: false,
      leaveMessage: '',
      antilink: false,
      antilinkAction: 'kick',
      antiSm: false,
      nsfw: false,
      cards: true,
      muted: [],
      warnings: {},
      activity: {}
    };
  }

  // Staff Functions
  async getStaff() {
    try {
      if (!this.db) return { mods: [], guardians: [] };
      const doc = await this.db.collection('config').doc('staff').get();
      return doc.exists ? doc.data() : { mods: [], guardians: [] };
    } catch (error) {
      console.error('Get staff error:', error);
      return { mods: [], guardians: [] };
    }
  }

  async addMod(jid) {
    try {
      if (!this.db) return;
      const staff = await this.getStaff();
      if (!staff.mods.includes(jid)) {
        staff.mods.push(jid);
        await this.db.collection('config').doc('staff').set(staff);
      }
    } catch (error) {
      console.error('Add mod error:', error);
    }
  }

  async removeMod(jid) {
    try {
      if (!this.db) return;
      const staff = await this.getStaff();
      staff.mods = staff.mods.filter(m => m !== jid);
      await this.db.collection('config').doc('staff').set(staff);
    } catch (error) {
      console.error('Remove mod error:', error);
    }
  }

  async addGuardian(jid) {
    try {
      if (!this.db) return;
      const staff = await this.getStaff();
      if (!staff.guardians.includes(jid)) {
        staff.guardians.push(jid);
        await this.db.collection('config').doc('staff').set(staff);
      }
    } catch (error) {
      console.error('Add guardian error:', error);
    }
  }

  async removeGuardian(jid) {
    try {
      if (!this.db) return;
      const staff = await this.getStaff();
      staff.guardians = staff.guardians.filter(g => g !== jid);
      await this.db.collection('config').doc('staff').set(staff);
    } catch (error) {
      console.error('Remove guardian error:', error);
    }
  }

  // Card Functions
  async getCardSpawn(groupJid) {
    try {
      if (!this.db) return null;
      const doc = await this.db.collection('cardSpawns').doc(groupJid).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error('Get card spawn error:', error);
      return null;
    }
  }

  async setCardSpawn(groupJid, data) {
    try {
      if (!this.db) return;
      await this.db.collection('cardSpawns').doc(groupJid).set(data);
    } catch (error) {
      console.error('Set card spawn error:', error);
    }
  }

  async deleteCardSpawn(groupJid) {
    try {
      if (!this.db) return;
      await this.db.collection('cardSpawns').doc(groupJid).delete();
    } catch (error) {
      console.error('Delete card spawn error:', error);
    }
  }
}

module.exports = new Database();
