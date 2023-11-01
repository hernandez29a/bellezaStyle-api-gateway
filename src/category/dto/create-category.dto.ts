import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsArray()
  @IsOptional()
  products: string[];
}
