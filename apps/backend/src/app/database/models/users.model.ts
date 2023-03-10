import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { DATABASE_TABLES } from '../constants/database-constraints.constants';
import { TextLengthColumn } from '../decorators/textLengthColumn';
import {
  LENGTH_255,
  POSTGRES_CURRENT_TIMESTAMP,
} from '../constants/database-time.constants';

import { User } from '../../../interfaces';

@Table({
  tableName: DATABASE_TABLES.USERS,
  modelName: DATABASE_TABLES.USERS,
  paranoid: true,
})
export class UserSchema extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @TextLengthColumn()
  name: string;

  @Column
  password: string;

  @Column
  uuid: string;

  @Column
  email: string;

  @Column
  location: string;

  @Column
  isAdmin: boolean;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  createdAt: string;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  updatedAt: string;

  @Column({ type: DataType.DATE })
  deletedAt: string;
}
