import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import BaseEntity from './base.entity';

export class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) { }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: EntityId): Promise<T> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByIds(ids: [EntityId]): Promise<T[]> {
    return await this.repository.findByIds(ids);
  }

  async createData(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }

  async update(id: EntityId, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async deleteById(id: EntityId): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async store(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }
}
