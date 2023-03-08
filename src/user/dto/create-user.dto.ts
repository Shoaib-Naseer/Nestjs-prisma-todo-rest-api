import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
@IsString()
@IsOptional()

firstName:string;

@IsString()
@IsOptional()

lastName:string;

@IsEmail()
@IsNotEmpty()
email:string;

@IsString()
@IsNotEmpty()
password:string; 


@IsString()
@IsOptional()
role:Role;


}
