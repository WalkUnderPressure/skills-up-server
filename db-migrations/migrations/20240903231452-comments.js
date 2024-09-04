module.exports = {
  /**
   * @type {import('migrate-mongo').up}
   */
  async up(db, client) {
    const COMMENTS = [
      {
        text: 'Cool post about modern JS',
        postId: '1',
        userId: '1',
      },
      {
        text: 'Great job! Thanks!',
        postId: '1',
        userId: '2',
      },
      {
        text: 'Great job! Thanks!',
        postId: '2',
        userId: '1',
      },
    ];

    await Promise.allSettled(COMMENTS.map(async (comment) => {
      const user = await db.collection('users').findOne({ id: comment.userId });
      comment.userId = user._id;

      const post = await db.collection('posts').findOne({ id: comment.postId });
      comment.postId = post._id;
    }));

    await db.collection('comments').insertMany(COMMENTS);
  },

  /**
   * @type {import('migrate-mongo').down}
  */
  async down(db, client) {
    db.collection('comments').deleteMany({});
  },
};
