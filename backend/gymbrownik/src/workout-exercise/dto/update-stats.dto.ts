import { IsInt, IsNumber, Min } from 'class-validator';

export class UpdateStatsDto {
  @IsInt()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(0)
  weight: number;
}
