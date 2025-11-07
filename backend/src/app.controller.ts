import { Controller, Get, Query } from '@nestjs/common';
import { AppService, type TrainParams } from './app.service';

type TrainQuery = {
  [key in keyof TrainParams]: string | undefined;
};

@Controller('train')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  train(@Query() query: TrainQuery) {
    const params: TrainParams = {
      decayE: query.decayE === 'true',
    };
    return this.appService.train(params);
  }
}
