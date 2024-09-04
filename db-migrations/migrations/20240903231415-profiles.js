module.exports = {
  /**
   * @type {import('migrate-mongo').up}
   */
  async up(db, client) {
    const PROFILES = [
      {
        userId: '1',
        firstName: 'Oleksandr',
        lastName: 'Brynzei',
        age: 25,
        currency: 'USD',
        country: 'USA',
        city: 'Sacramento',
        username: 'admin',
        avatar: 'https://images.pexels.com/photos/1033142/pexels-photo-1033142.jpeg',
      },
      {
        userId: '2',
        firstName: 'Vincent',
        lastName: 'Roberts',
        age: 22,
        currency: 'EUR',
        country: 'Germany',
        city: 'Frankfurt',
        username: 'user',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
      }
    ]

    await Promise.allSettled(PROFILES.map(async (profile) => {
      const user = await db.collection('users').findOne({ id: profile.userId });
      profile.userId = user._id;
    }));

    await db.collection('profiles').insertMany(PROFILES);
  },

  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    db.collection('profiles').deleteMany({});
  },
};
