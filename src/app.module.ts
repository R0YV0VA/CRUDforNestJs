import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extension } from './extension/entities/extension.entity';
import { ExtensionModule } from './extension/extension.module';

@Module({
  imports: [
    ExtensionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '${cret',
      database: 'extensions',
      entities: [Extension],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
