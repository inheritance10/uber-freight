import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "../common/constant/constant";
import { AuthService } from "../services/auth.service";
import { CustomerModule } from "./customer.module";
import { AuthController } from "../controllers/auth.controller";
import { AuthGuard } from "../common/guards/auth.guard";
import { CarrierModule } from "./carrier.module";


@Module({
  imports: [
    CustomerModule,
    CarrierModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
