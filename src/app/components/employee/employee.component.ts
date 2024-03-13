import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
// import { CustomeDateComponent } from 'src/app/shared/components/custome-date/custome-date.component';
import { AddEmployee, db } from 'src/app/shared/db/db';
import { CoreService } from 'src/app/shared/services/core.service';
// import { ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar, MatCalendarUserEvent, MatDatepicker } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { CustomeDateComponent } from 'src/app/shared/components/custome-date/custome-date.component';
import { CustomeNoDateComponent } from 'src/app/shared/components/custome-no-date/custome-no-date.component';
// import { ViewChild } from "@angular/core";
interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeRole: SelectOption[] = [
    {value: 'Product Designer', viewValue: 'Product Designer'},
    {value: 'Flutter Developer', viewValue: 'Flutter Developer'},
    {value: 'QA Tester', viewValue: 'QA Tester'},
    {value: 'Product Owner', viewValue: 'Product Owner'}
  ];

  customDateComponent = CustomeDateComponent;
  customNoDateComponent = CustomeNoDateComponent;
  selectedEmployee!: AddEmployee;
  employeeModel: EmployeeData = new EmployeeData();
  // @ViewChild('picker', { static: true })
  // private picker!: MatDatepicker<Date>;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private _snackBar: MatSnackBar,
    private coreService: CoreService
  ) {}
  ngOnInit() {
    if(this.coreService.employeeObj.selectedEmployee.length > 0) {
      this.employeeModel = this.coreService.employeeObj.selectedEmployee[0];
      this.selectedEmployee = this.coreService.employeeObj.selectedEmployee[0];
    }
    this.createForm();
  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      employeeName: [this.employeeModel.employeeName],
      employeeRole: [this.employeeModel.employeeRole],
      employeeDate: [this.employeeModel.employeeDate],
      employeeNoDate: [this.employeeModel.employeeNoDate]
      // today: [],
      // noDate: []
    });
  }

  onClose() {
    this.route.navigate(['/dashboard']);
  }

  async onSubmit() {
    // console.log(this.employeeForm.value);
    let params = this.employeeForm.value;
    if(this.coreService.employeeObj.status === 'add') {
      await db.addEmployee.add(this.employeeForm.value);
      this._snackBar.open("Employee data added", "Done", {duration: 3000});
      this.route.navigate(['/dashboard']);
    } if(this.coreService.employeeObj.status === 'edit') {
      // await db.addEmployee.where({id: this.coreService.employeeObj.selectedEmployee[0].id}).modify(params);
      await db.addEmployee.update(this.coreService.employeeObj.selectedEmployee[0].id, params);
      this._snackBar.open("Employee data updated!", "Done", {duration: 3000});
      this.route.navigate(['/dashboard']);
    }
    
  }

  dateChanged($event: any) {

  }
}

export class EmployeeData {
  employeeName!: string;
  employeeRole!: string;
  employeeDate!: string;
  employeeNoDate!: string;
}