import { Transaction } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { ActivityLogModelService } from '../../database/service/activity-log-module.service';
import { LogsDto } from './dto/logs.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    private readonly activityLogModelService: ActivityLogModelService
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
}
