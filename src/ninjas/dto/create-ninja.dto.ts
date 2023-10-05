import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  readonly id: number;

  @MinLength(3)
  readonly name: string;

  readonly belt?: string;

  @IsEnum(['stars', 'sword', 'nunchucks'], { message: 'Invalid weapon' })
  readonly weapon: string;

  readonly status: boolean;
}
