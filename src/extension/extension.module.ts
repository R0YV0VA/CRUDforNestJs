import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { Extension } from './entities/extension.entity';

@Module({
  providers: [ExtensionService],
  controllers: [ExtensionController],
  imports: [TypeOrmModule.forFeature([Extension])],
})
export class ExtensionModule {}
