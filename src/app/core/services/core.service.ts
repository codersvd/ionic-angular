import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CoreService {
  private isStatusServer = false;

  constructor() {
  }

  get statusServer(): boolean {
    return this.isStatusServer;
  }

  set statusServer(value: boolean) {
    this.isStatusServer = value;
  }
}
