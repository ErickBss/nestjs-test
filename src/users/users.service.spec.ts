import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const dto = { id: 1, name: 'John Doe', email: 'john@email.com' };

  const prismaMock = {
    user: {
      create: jest.fn().mockReturnValue(dto),

      findMany: jest.fn().mockReturnValue([dto]),

      findUnique: jest.fn().mockReturnValue(dto),

      update: jest.fn().mockReturnValue(dto),

      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      const response = await service.create({
        name: 'John Doe',
        email: 'john@email.com',
      });

      expect(response).toEqual({
        id: expect.any(Number),
        name: 'John Doe',
        email: 'john@email.com',
      });
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john@email.com',
        },
      });
    });
  });

  it('should return all users', async () => {
    const response = await service.findAll();

    expect(response).toEqual([
      { id: 1, name: 'John Doe', email: 'john@email.com' },
    ]);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.user.findMany).toHaveBeenCalledWith();
  });

  it('should return an user', async () => {
    const response = await service.findOne(1);

    expect(response).toEqual(dto);
    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update an user', async () => {
    const response = await service.update(1, { name: 'John' });

    expect(response).toEqual({ id: 1, name: 'John', ...dto });
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'John' },
    });
  });

  it('should delete an user', async () => {
    await service.remove(1);

    expect(prisma.user.delete).toHaveBeenCalledTimes(1);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
