import { ProfileSchema, Profile } from "./profiles";

type Commentary = {
  id: string;
  text?: string;
  profile: ProfileSchema;
  postId?: string;
  userId?: string;
};

type CommentSchema = Omit<Commentary, 'profile'> & { profile?: Profile };

function getComments(): { comments: Array<CommentSchema> } {
  const data = {
    comments: [
      {
        id: '1',
        text: 'Cool post about modern JS',
        postId: '1',
        userId: '1',
        profileId: '1',
      },
      {
        id: '2',
        text: 'Great job! Thanks!',
        postId: '1',
        userId: '2',
        profileId: '2',
      },
    ],
  };

  return data;
}

export { getComments, CommentSchema };
