import { IsNotEmpty, IsString } from 'class-validator';

export class LogsDto {
  @IsString()
  @IsNotEmpty()
  readonly UserId: number;

  @IsString()
  @IsNotEmpty()
  readonly location: string;
}
