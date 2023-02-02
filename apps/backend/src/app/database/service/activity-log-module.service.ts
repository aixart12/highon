import { Injectable } from '@nestjs/common';
import { Repository, Sequelize } from 'sequelize-typescript';

import { ActivityLog } from '../../../interfaces';
import { ActivityLogSchema } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class ActivityLogModelService extends BaseService<
  ActivityLogSchema,
  ActivityLog
> {
  repository: Repository<ActivityLogSchema>;

  constructor(public readonly sequelize: Sequelize) {
    super();
    this.repository = sequelize.getRepository(ActivityLogSchema);
  }
}
