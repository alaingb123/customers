
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ArrayUnique, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCustomerDto {


  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({value})=>value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  billing_address: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;

  @IsArray()
  @ArrayNotEmpty()
  favorite_products: ObjectId[];
}