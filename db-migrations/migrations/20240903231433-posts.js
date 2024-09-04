const { faker } = require('@faker-js/faker');

const posts = require('../mocks/posts');

function randomInArray(values) {
  const index = parseInt(String(Math.random() * values.length));

  return values.at(index) ?? undefined;
}

module.exports = {
  /**
   * @type {import('migrate-mongo').up}
   */
  async up(db, client) {
    const POSTS = [...posts];

    const addPostsCount = 24;
    for (let i = 0; i < addPostsCount; i++) {
      const userId = randomInArray(['1', '2']);

      const randomImg = randomInArray([
        'https://images.pexels.com/photos/1033142/pexels-photo-1033142.jpeg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/MANNapoli_124545_plato%27s_academy_mosaic.jpg/920px-MANNapoli_124545_plato%27s_academy_mosaic.jpg',
      ])

      POSTS.push({
        id: faker.string.uuid().slice(0, 8),
        userId: userId,
        title: faker.word.words({ count: { min: 3, max: 15 } }),
        subtitle: faker.word.words({ count: { min: 3, max: 15 } }),
        img: randomImg,
        views: faker.number.int({ min: 20, max: 500_000 }),
        createdAt: new Date(faker.date.anytime()).getTime(),
        tags: [
          randomInArray(['SCIENCE', 'IT', 'ECONOMICS']) ??
            'SCIENCE',
        ],
        blocks: [
          {
            id: '1',
            type: 'TEXT',
            title: faker.word.words({ count: { min: 3, max: 15 } }),
            paragraphs: [
              faker.lorem.paragraph(),
              faker.lorem.paragraph(),
              faker.lorem.paragraph(),
              faker.lorem.paragraph(),
            ],
          },
        ],
      });
    }

    await Promise.allSettled(POSTS.map(async (post) => {
      const user = await db.collection('users').findOne({ id: post.userId });
      post.userId = user._id;
    }));

    await db.collection('posts').insertMany(POSTS);
  },

  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    db.collection('posts').deleteMany({});
  },
};
