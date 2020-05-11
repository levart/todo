import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { configService } from './config/config.service';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(configService.getMongoURI()),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
