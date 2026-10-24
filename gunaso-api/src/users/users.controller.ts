import { Controller, Body, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() userData: Prisma.UserCreateInput) {
        return this.usersService.create(userData);
    }


    @Get('')
    findAll() {
      return this.usersService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') userId : string) {
      return this.usersService.findOne(userId);
    }

    @Patch(':id')
    update(
        @Param() userId : string,
        @Body() userData : Prisma.UserUpdateInput
    ) {
        return this.usersService.update(userId, userData)
    }


    @Delete(':id')
    delete(
        @Param() userId : string,
    ) {
        return this.usersService.delete(userId)
    }
}
