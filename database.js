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
{
  "type": "service_account",
  "project_id": "nexo-violet",
  "private_key_id": "3c086cb9130dfeb397b6f1e832f475dac3344237",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQConAz9yzX5Vsie\nr6sNBzcCjQnOgKyllVw0ktE8x0cZGZk+BCNgbcqrtmW/eygcHboic3xVOyoPn/RV\nAeKXx9GQTS+gNMtbKk1JN6op02sKM/yMf0QiS6RF2TAYnZWDfSRMjkUidlOLKYZX\n+wxBFzGvlOkJK8RsapqPwx0KKcCVqLm3yqKNKvFVPM4QppgW96zL68NwirWQlicJ\nWt2CsLx3yOQZrB0aNgJN9enk9QLFRB9mY5CTnYxHNz7bmfUZYHGUcX7E3rJO+0nV\nknLVi3r13p8/su3iaHz3WC1lNixdjBvCQ+RypHElAhkOtAJ4RNKfYYWmalPbUqYw\nfl2unfM/AgMBAAECggEAFMDgeHytcBCr25xpGXlsiUvYNoAawBGE/+jyXYt0cjUh\nv5hoIlO2lobPj09sEx81l01PsyNNJ2SGK9ByQOxqHFuOeScGa3o8I7748Eetl9vo\n7KzdiLshb9eD1q55hhhpLLh2RKpRLi02SViv8XMWvTM/Bnn0phjuXV5OvL7W4uoR\nKhD9E8uK9UpjyQUojQF8x4Krlg3aJCD6L6Ldv6Nbotdq6H5f0qkMMvT/Gk+sRbf1\nEHJeP/DVTGQDYcDWyKv4tT18FWC9jWRYVJuxeyZDn0Al30PDYzAcAV2grVKqTzFC\nbPw3CrpU9PjYte0LhaZb7xrYwVBrsnFbJwaFkpFkgQKBgQDZX8MJ/k2QpGsbw4H7\nS/qldS5WMBv6ut47P3Sm8aqZOimzk+PObMOtqjQVEO9SuqDWo+BwSAVs3yMF61A3\nhAAd9xAAsXD0f462e1TMXAIqICRYdUl+tZMzrVacNjJ6f2HndCzuUDXkvpdidWQ6\nsaANEkjCv8Cn821U2AzRtBFlxwKBgQDGkgQnQiwJaaV8ifXuupcqFtz6uhUEkVMZ\nC5RgSxYHSTQfLTiDnzOSoS4ssbO6XUUW5qqarcq7t9d3dw0hOjqfkoVq2+3GgGfo\noJu7lXjEhAbJeZ/va4QnTnCIy+S7ioYPH9dc0mooZElGKsYhDsWOn5WXm9Bw/5m8\njqMT21qmyQKBgGH7ZWoKxCHPyyvvm5aPsAKG6IUXGHWTZ/ri5o0d391Dt2pn3ka9\nBhMw5lsckBQFZdx6b/+Mp01k41+Wq0jq6jaXmBIH6bd8C/M7coTPcHZWmKt66s7/\nv8OKfcDaOTS4WIRA/MPLSg+6zXgnHC/Mwy1BMaT/VDMgagbVgCnCdhkfAoGBAL3C\nak+uD/FK0YeLO8fQ7oadZL4CN/Wufy/u/fNrrfh2f2XPzDMUX6+fckXp5+yQF2dE\nNgMtVBFCJZmX3qdDQySdW/x7geXxbdtEKK8Br3B1DxtYrHubTqZVcnt4BfUm8uff\nMOsWdbZ16AQy+jY7LJYYcVd54p8p1Bv6X2Opex7pAoGBAMw4bH9gCxnfWqqgIiFs\n5SSqOMk5XlYaNwSfnnYYRMQlfROyB+jfgnWuz76hB+tNpg6RQGN3jOW6gyQr0iE0\nHXtVBTwF2BiUrZ3mM11Zgrx/1Rn0Wlkx4HmVM5MECJwPwbwZpV1cbPKS2Q/Ln/yn\nQQDsfxvcq6mDaobltjTgUkOf\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@nexo-violet.iam.gserviceaccount.com",
  "client_id": "108955771584722856465",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nexo-violet.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${config.nexo-violet}.firebaseio.com`
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
