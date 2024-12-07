module.exports = {
  /**
   * @type {import('migrate-mongo').up}
  */
  async up(db, client) {
    await db.collection('users').updateMany({}, { $unset: { 'id': "" } });
    await db.collection('posts').updateMany({}, { $unset: { 'id': "" } });
  },

  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    await db.collection('users').findOne({});
  }
};
