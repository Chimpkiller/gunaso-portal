import { Controller, Body, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Prisma } from '@prisma/client';
import { AuthUser } from '../auth/types/auth.types.js';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post()
    register(@Body() userData: Prisma.UserCreateInput): Promise<AuthUser> {
        return this.authService.register(userData);
    }


    @Post('login')
    login(@Body() body: {email: string, password: string}): Promise<AuthUser> {
        return this.authService.login(body.email, body.password);
    }
}
