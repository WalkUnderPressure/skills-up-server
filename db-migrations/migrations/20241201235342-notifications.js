const notifications = require('../mocks/notifications');

module.exports = {
  /**
   * @type {import('migrate-mongo').up}
   */
  async up(db, client) {
    const NOTIFICATIONS = [...notifications];

    await Promise.allSettled(NOTIFICATIONS.map(async (notification) => {
      const user = await db.collection('users').findOne({ id: notification.userId });
      notification.userId = user._id;
    }));

    await db.collection('notifications').insertMany(NOTIFICATIONS);
  },

  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    db.collection('notifications').deleteMany({});
  },
};
