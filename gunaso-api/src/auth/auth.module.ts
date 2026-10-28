import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [
        UsersModule,
        PrismaModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                    algorithm: 'HS256',
                    expiresIn: config.get('JWT_EXPIRES_IN', '30m'),
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
