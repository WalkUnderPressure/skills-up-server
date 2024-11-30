const bcrypt = require('bcrypt');

const salt = 10;

module.exports = {
  /**
   * @type {import('migrate-mongo').up}
  */
  async up(db, client) {
    const USERS = [
      {
        "id": "1",
        "username": "admin",
        "password": bcrypt.hashSync('admin', salt),
        "roles": ["ADMIN"],
      },
      {
        "id": "2",
        "username": "user",
        "password": bcrypt.hashSync('user', salt),
        "roles": ["USER"],
      }
    ];

    await db.collection('users').insertMany(USERS);
  },

  // TODO: remove id
  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    await db.collection('users').deleteMany({});
  },
};
