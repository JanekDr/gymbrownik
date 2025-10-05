import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { AuthRole } from '@prisma/client';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    authRole?: AuthRole;
}
