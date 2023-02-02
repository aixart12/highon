import { Injectable } from '@nestjs/common';
import { Repository, Sequelize } from 'sequelize-typescript';

import { UserSchema } from '../models';
import { BaseService } from './base.service';
import { User } from '../../../interfaces';

@Injectable()
export class UserModelService extends BaseService<UserSchema, User> {
  repository: Repository<UserSchema>;

  constructor(public readonly sequelize: Sequelize) {
    super();
    this.repository = sequelize.getRepository(UserSchema);
  }
}
