import { Transaction } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { ActivityLogModelService } from '../../database/service/activity-log-module.service';
import { LogsDto } from './dto/logs.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class ActivityLogService {
  constructor(
    private readonly activityLogModelService: ActivityLogModelService,
    private readonly userService: UserService
  ) {}

  getAllLogs(transaction?: Transaction) {
    return this.activityLogModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.activityLogModelService.getAll(transaction);
      }
    );
  }
  create(logData: LogsDto, transaction?: Transaction) {
    return this.activityLogModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.activityLogModelService.add(logData, transaction);
      }
    );
  }

  createUsingUUID(uuid: string, transaction?: Transaction) {
    console.log(
      '🚀 ~ file: activityLog.service.ts:32 ~ ActivityLogService ~ createUsingUUID ~ uuid',
      uuid
    );
    return this.activityLogModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const user = await this.userService.findByUUID(uuid, transaction);

        return this.create(
          { UserId: user.id, location: user.location },
          transaction
        );
      }
    );
  }
}
