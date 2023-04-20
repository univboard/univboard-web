import { PartialType } from '@nestjs/mapped-types';
import { CreateClipDto } from './create-clip.dto';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateClipDto extends PartialType(CreateClipDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  labels?: string[];

  @IsOptional()
  @IsArray()
  collaborators?: string[];

  @IsOptional()
  @IsBoolean()
  pinned?: boolean;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsString()
  backdrop?: string;
}
