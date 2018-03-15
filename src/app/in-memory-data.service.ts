import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable()
export class InMemoryDataService {

  constructor() { }
  createDb() {
    const cred = [
      { username: 'test', password: 'pass' },
      { username: 'test', password: 'pass' }
    ];
    return {cred};
  }
}
