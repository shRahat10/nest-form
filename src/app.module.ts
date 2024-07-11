import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mySqlConfig } from './configs/db.config';
import { DataSource } from 'typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configs/jwt.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { nodemailerConfig } from './configs/nodemailer.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(mySqlConfig),
    AuthenticationModule,
    JwtModule.register(jwtConfig),
    MailerModule.forRoot(nodemailerConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
