import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Diego',
      email: 'diego@rocketseat.com.br',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Guga',
      email: 'gustavo@gmail.com',
      password: '123456',
    });
    expect(
      createUserService.execute({
        name: 'Luleira',
        email: 'gustavo@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
