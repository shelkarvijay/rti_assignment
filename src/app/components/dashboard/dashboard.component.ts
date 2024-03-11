import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { Subscription } from 'rxjs';
import { AddEmployee, db } from 'src/app/shared/db/db';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  employeeLists$ = liveQuery(() => db.addEmployee.toArray());
  employeeSelected$: any;
  subscribedArr: Subscription[] = [];
  isNoData: boolean = false;
  currentEmployees: AddEmployee[] = [];
  previousEmployees: AddEmployee[] = [];
  constructor(
    private route: Router,
    private coreService: CoreService
  ) { }
  ngOnInit() {
    this.coreService.setScreenName.next('Employee List');
    console.log(this.employeeLists$);
    this.employeeLists$.subscribe((employees: any) => {
      if(employees && employees.length === 0) {
        this.isNoData = true;
      } else {
        console.log(employees);
        this.currentEmployees = employees.filter((item: AddEmployee) => !item.employeeNoDate);
        this.previousEmployees = employees.filter((item: AddEmployee) => item.employeeNoDate != null);
      }
    })
    // if(this.employeeLists$)
  }

  identifyList(index: number, list: AddEmployee) {
    return `${list.id}${list.employeeName}`;
  }

  onAdd() {
    this.coreService.employeeObj.selectedEmployee = [];
    this.coreService.employeeObj.status = 'add';
    this.coreService.setScreenName.next('Add Employee Details');
    this.route.navigate(['/employee']);
  }

  async onSelectEmployee(employee: any) {
    console.log(employee);
    this.employeeSelected$ = await liveQuery(
      () => this.getEmployee(employee.id)
    ); 
    this.coreService.setScreenName.next('Edit Employee Details');
    this.subscribedArr.push(
      this.employeeSelected$.subscribe((response: any) => {
      console.log(response);
      this.coreService.employeeObj.selectedEmployee = response;
      this.coreService.employeeObj.status = 'edit';
      this.route.navigate(['/employee']);
    }));
  }

  async getEmployee(id: number) {
    return db.addEmployee.where({
      id: id
    }).toArray();
  }

  ngOnDestroy() {
    this.subscribedArr.forEach((item) => item.unsubscribe());
  }

}
