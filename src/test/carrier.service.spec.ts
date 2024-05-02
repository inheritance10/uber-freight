import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarrierService } from "../services/carrier.service";
import { Carrier } from "../entities/carrier.entity";
import { RegisterCarrierDto } from "../dtos/carrier/register-carrier.dto";


describe('CarrierService', () => {
  let service: CarrierService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarrierService,
        {
          provide: getRepositoryToken(Carrier),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<CarrierService>(CarrierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    // arrange
    const createUserDto = {
      name: 'Chadwick Boseman',
      username: 'chadwickboseman',
      password: 'password',
      km_price: 10,
      email: 'chadwickboseman@email.com',
    } as RegisterCarrierDto;

    const user = {
       id: Date.now(),
      username: 'chadwickboseman',
      password: 'password',
      km_price: 10,
      email: 'chadwickboseman@email.com',
    } as Carrier;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act
    const result = await service.register(createUserDto);

    // assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    //arrange
    const user = {
      id: Date.now(),
      name: 'Chadwick Boseman',
      username: 'chadwickboseman',
      password: 'password',
      km_price: 10,
      email: 'chadwickboseman@email.com',
    };
    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toBeCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const user = {
      id: 1,
      name: 'Chadwick Boseman',
      username: 'chadwickboseman',
      password: 'password',
      km_price: 10,
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    //act
    const result = await service.findOneById(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;

    const user = {
      id: 1,
      name: 'Chadwick Boseman',
      username: 'chadwickboseman',
      password: 'password',
      km_price: 10,
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);

    //act
    const result = await service.remove(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toBeCalled();
    expect(mockUserRepository.delete).toBeCalledWith(id);
  });
});
