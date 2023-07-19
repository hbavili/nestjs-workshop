import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { Account } from './account/entities/account.entity';
import { Project } from './project/entities/project.entity';
import { Role } from './users/entities/role.entity';
import { RolesGuard } from "./auth/roles.guard";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User, Account, Project, Role],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    AccountModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
