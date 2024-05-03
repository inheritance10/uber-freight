import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CustomerModule } from "./modules/customer.module";
import { CarrierModule } from "./modules/carrier.module";
import { FavoriteCarrierModule } from "./modules/favorite-carrier.module";
import { PromotionModule } from "./modules/promotion.module";
import { AuthModule } from './modules/auth.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from "@nestjs/jwt";
import { RoleMiddleware } from "./common/middleware/role.middleware";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: configService.get('PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get(''),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    CustomerModule,
    CarrierModule,
    FavoriteCarrierModule,
    PromotionModule,
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .forRoutes('promotion/*');
  }
}

