import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  setScreenName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  screenName = this.setScreenName.asObservable();
  employeeObj: any = {
    'selectedEmployee': [],
    'status': ''
  }
  constructor() {
  }
}
