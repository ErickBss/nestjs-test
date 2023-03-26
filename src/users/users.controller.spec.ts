import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const userDto = { id: 1, name: 'John Doe', email: 'john@test.com' };

  const mockUsersService = {
    create: jest.fn((dto) => {
      return { id: 1, ...dto };
    }),

    findOne: jest.fn((id) => {
      return { id: +id, ...userDto };
    }),

    update: jest.fn((id, dto) => {
      return { ...userDto, id: +id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an user', () => {
    expect(
      controller.create({ name: 'John Doe', email: 'john@email.com' }),
    ).toEqual({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'john@email.com',
    });

    expect(mockUsersService.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@email.com',
    });
  });

  it('should return an user', () => {
    const id = '1';

    expect(controller.findOne(id)).toEqual({
      id: +id,
      ...userDto,
    });
  });

  it('should update an user', () => {
    const id = '1';
    const name = 'John Doe';

    expect(controller.update(id, { name })).toEqual({
      ...userDto,
      id: +id,
      name,
    });

    expect(mockUsersService.update).toHaveBeenCalledWith(+id, { name });
  });
});
