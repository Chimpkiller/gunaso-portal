import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): string {
    return 'Hello nigge';
  }


  getUser(): string {
    return 'Top of the morning!';
  }
}
