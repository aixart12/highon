import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsOptional()
  readonly location: string;

  @IsOptional()
  readonly password: string;
}
