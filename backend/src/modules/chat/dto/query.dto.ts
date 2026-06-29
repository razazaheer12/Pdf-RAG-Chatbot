import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  question: string;

  @IsString()
  @IsNotEmpty()
  namespace: string;

  @IsString()
  @IsOptional()
  model?: string;
}