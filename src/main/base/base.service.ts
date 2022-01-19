import { LoggerService } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import BaseEntity from './base.entity';

export class BaseService<T extends BaseEntity, R extends Repository<T>> {
  protected readonly repository: R;
  protected readonly logger: LoggerService;

  constructor(repository: R, logger: LoggerService) {
    this.repository = repository;
    this.logger = logger;
  }

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

  async updata(id: EntityId, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async deleteById(id: EntityId): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
