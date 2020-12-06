import { users } from '@prisma/client';

export default {
  render(user: users) {
    return {
      name: user.name,
      surname: user.surname,
      emailUsr: user.emailUsr,
      development: user.development,
      websites: user.websites,
      createdAt: user.createdAt
    };
  },

  renderMany(users: users[]) {
    return users.map(user => this.render(user));
  }
}