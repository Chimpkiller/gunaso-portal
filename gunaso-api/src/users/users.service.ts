import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js'
import { Prisma, User } from '@prisma/client';
import { AuthUser } from '../auth/types/auth.types.js';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService ) {}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
          data,
        });
      }


    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }


    async findOne(id : string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where : { id },
        });

        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user;
    }


    async update(id : string, data: Prisma.UserUpdateInput): Promise<User> {
        await this.findOne(id);
        return this.prisma.user.update({
            where : { id },
            data,
        });
    }


    async remove(id : string) : Promise<User> {
        await this.findOne(id);
        return this.prisma.user.delete({
            where : { id },
        })
    }
}
    public sanitizeUser(user: PrismaUser): AuthUser {
        const { password, ...safeUser } = user as any;
        return safeUser as AuthUser;
    }
