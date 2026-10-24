import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';


@Controller('citizens')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getCitizens(): string {
    return this.appService.getHello();
  }


  @Get('')
  getCitizen(): string {
    return this.appService.getBing();
  }
}
