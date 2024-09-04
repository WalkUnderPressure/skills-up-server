import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  text: { type: String },
  postId: { type: Schema.ObjectId },
  userId: { type: Schema.ObjectId },

  // Use one of methods this or virtual
  // "profile": { type: Schema.Types.ObjectId, ref: 'profiles' },
  // then you should store profileId in "profile" field
});

// Define virtual for population
CommentSchema.virtual('profile', {
  ref: 'profiles',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});
CommentSchema.set('toObject', { virtuals: true });
CommentSchema.set('toJSON', { virtuals: true });

const CommentModel = model('comments', CommentSchema);

export { CommentModel };
