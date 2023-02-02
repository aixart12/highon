import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { UserModelService } from '../../database/service/user-module.service';
import { UsersDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModelService: UserModelService) {}

  getAllUsers(transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModelService.getAll(transaction);
      }
    );
  }

  getUserById(id: number, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModelService.getOneWhere({ id }, transaction);
      }
    );
  }
  create(user: UsersDto, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const checkUser = await this.userModelService.getOneWhere(
          { uuid: user.uuid },
          transaction
        );
        if (checkUser) {
          throw new BadRequestException('User All ready Exists');
        }
        const newUser = await this.userModelService.add(user, transaction);
        return newUser;
      }
    );
  }
  updateLocation(id: number, user: UsersDto, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const newUser = await this.userModelService.updateWhere(
          { id: id },
          { location: user.location },
          transaction
        );
        return newUser;
      }
    );
  }

  login(loginData: LoginDto, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const user = await this.userModelService.getOneWhere(
          { uuid: loginData.uuid },
          transaction
        );
        if (!user) {
          throw new BadRequestException('User does not Exist');
        }
        if (user.password !== loginData.password) {
          throw new UnauthorizedException('Password Does not Match');
        }
        return user;
      }
    );
  }
}
