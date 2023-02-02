import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { DATABASE_TABLES } from '../constants/database-constraints.constants';
import { POSTGRES_CURRENT_TIMESTAMP } from '../constants/database-time.constants';

import { ActivityLog } from '../../../interfaces';
import { UserSchema } from './users.model';

@Table({
  tableName: DATABASE_TABLES.ACTIVITY_LOG,
  modelName: DATABASE_TABLES.ACTIVITY_LOG,
  paranoid: true,
})
export class ActivityLogSchema extends Model<ActivityLog> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => UserSchema)
  @PrimaryKey
  @Column
  UserId: string;

  @Column
  location: string;

  @Column
  isSuperAdmin: boolean;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  createdAt: string;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  updatedAt: string;

  @Column({ type: DataType.DATE })
  deletedAt: string;
}
