import { Module } from '@nestjs/common';
import { LocalStrategy } from './local/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './local/jwt.strategy';

@Module({
  imports:[PassportModule,JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_KEY'),
      signOptions: {
        expiresIn: '60s', // "60s"
      },
    })
  })],
  providers: [LocalStrategy, AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
