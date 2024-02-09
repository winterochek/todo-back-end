import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateListBody, UpdateListBody } from './request';
import { UserService } from '../users/users.service';
import { ListDto } from './dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    private userService: UserService,
  ) {}

  async create(userId: number, body: CreateListBody): Promise<ListDto> {
    const user = await this.userService.getById(userId);
    if (!Boolean(user)) {
      throw new UnauthorizedException();
    }
    const list = await this.listRepository.save({ userId, ...body });
    return ListDto.fromEntity(list);
  }

  async mine(userId: number): Promise<ListDto[]> {
    const lists = await this.listRepository.find({
      where: { userId },
      relations: ['tasks'],
    });
    return lists.map(ListDto.fromEntity);
  }

  async getOne(userId: number, listId: number): Promise<ListDto> {
    const list = await this.listRepository.findOne({
      where: { userId, id: listId },
      relations: ['tasks'],
    });
    if (!Boolean(list)) {
      throw new NotFoundException('No such list');
    }
    return ListDto.fromEntity(list);
  }

  async update(
    userId: number,
    listId: number,
    body: UpdateListBody,
  ): Promise<void> {
    const list = await this.listRepository.findOne({
      where: { userId, id: listId },
    });
    if (!Boolean(list)) {
      throw new NotFoundException();
    }
    await this.listRepository.update({ id: listId }, { ...body });
  }

  async delete(userId: number, listId: number): Promise<void> {
    const list = await this.listRepository.findOne({
      where: { userId, id: listId },
    });
    if (!Boolean(list)) {
      throw new NotFoundException();
    }
    await this.listRepository.delete({ id: listId });
  }
}
