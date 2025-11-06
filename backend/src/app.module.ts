import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
