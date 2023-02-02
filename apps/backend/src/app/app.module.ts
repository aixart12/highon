import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityLogModule } from './modules/activityLog/activityLog.module';
import { UserModule } from './modules/users/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule.forRoot(), UserModule, ActivityLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
