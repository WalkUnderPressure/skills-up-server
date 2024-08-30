type User = {
  id: string;
  username: string;
};

type UserSchema = { password: string } & User;

function getUsers(): { users: Array<UserSchema> } {
  const data = {
    users: [
      {
        id: '1',
        username: 'admin',
        password: 'admin',
        role: 'ADMIN',
      },
      {
        id: '2',
        username: 'user',
        password: 'user',
        role: 'USER',
      },
    ],
  };

  return data;
}

export { getUsers, UserSchema };
