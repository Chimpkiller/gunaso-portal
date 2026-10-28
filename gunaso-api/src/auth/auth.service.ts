import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { AuthUser } from '../auth/types/auth.types.js';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}


  async register(data: Prisma.UserCreateInput): Promise<AuthUser> {
    return this.usersService.create(data);
  }


  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where :  { email },
    })
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await Bun.password.verify(password, user.password);
    if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');


    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return { accessToken };
  }
}
