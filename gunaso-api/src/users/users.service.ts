import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js'
import { Prisma, User as PrismaUser } from '@prisma/client';
import { AuthUser } from '../auth/types/auth.types.js';




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
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService ) {}


    public sanitizeUser(user: PrismaUser): AuthUser {
        const { password, ...safeUser } = user as any;
        return safeUser as AuthUser;
    }


    async create(data: Prisma.UserCreateInput): Promise<AuthUser> {
        const hashedPassword = await Bun.password.hash(data.password, {
          algorithm: 'argon2id',
          memoryCost: 8,
          timeCost: 3,
        });

        const user = await this.prisma.user.create({
          data : { ...data, password : hashedPassword }
        });

        return this.sanitizeUser(user);
      }


    async findAll(): Promise<PrismaUser[]> {
        return this.prisma.user.findMany();
    }
