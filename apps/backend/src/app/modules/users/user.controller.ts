import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersDto } from './dto/user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('/')
  createUser(@Body() user: UsersDto) {
    return this.userService.create(user);
  }

  @Post('/update-location/:userId')
  updateLocation(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UsersDto
  ) {
    return this.userService.updateLocation(userId, user);
  }

  @Post('/login')
  login(@Body() loginData: LoginDto) {
    return this.userService.login(loginData);
  }
}
