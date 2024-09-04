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
        "role": "ADMIN"
      },
      {
        "id": "2",
        "username": "user",
        "password": bcrypt.hashSync('user', salt),
        "role": "USER"
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
