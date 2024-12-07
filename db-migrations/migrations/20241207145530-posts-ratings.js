const postsRatings = require('../mocks/posts-ratings');

module.exports = {
  /**
   * @type {import('migrate-mongo').up}
   */
  async up(db, client) {
    const POSTS_RATINGS = [...postsRatings];

    await Promise.allSettled(POSTS_RATINGS.map(async (postRating) => {
      const user = await db.collection('users').findOne({ id: postRating.userId });
      postRating.userId = user._id;

      const post = await db.collection('posts').findOne({ id: postRating.postId });
      postRating.postId = post._id;
    }));

    await db.collection('posts-ratings').insertMany(POSTS_RATINGS);
  },

  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    db.collection('posts-ratings').deleteMany({});
  },
};
