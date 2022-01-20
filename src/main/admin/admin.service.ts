import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Admin from './admin.entity';

@Injectable()
export class AdminService extends BaseService<Admin> {}
