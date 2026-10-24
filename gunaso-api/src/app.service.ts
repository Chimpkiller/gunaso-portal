import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello nigge';
  }


  getBing(): string {
    return 'Top of the morning!';
  }
}
