import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth/auth.controller.js';
import { UsersController } from './users/users.controller.js';

import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';

import { PrismaService } from './prisma/prisma.service.js';


@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
