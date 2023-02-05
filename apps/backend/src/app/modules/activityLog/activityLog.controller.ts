import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityLogService } from './activityLog.service';
import { LogsDto } from './dto/logs.dto';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}
  @Get('/')
  getAll() {
    return this.activityLogService.getAllLogs();
  }

  @Post('/')
  create(@Body() logData: LogsDto) {
    return this.activityLogService.create(logData);
  }

  @Post('/add-log')
  addLog(@Body() data: { uuid: string }) {
    return this.activityLogService.createUsingUUID(data.uuid);
  }
}
