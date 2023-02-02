import { Module } from '@nestjs/common';
import { ActivityLogController } from './activityLog.controller';
import { ActivityLogModelService } from '../../database/service/activity-log-module.service';
import { ActivityLogService } from './activityLog.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule.forFeature([ActivityLogModelService])],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  exports: [],
})
export class ActivityLogModule {}
