import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AddEmployee, db } from '../../db/db';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentScreenName: string = '';
  @Input('selectedEmployee') selectedEmployee!: AddEmployee;
  // @Output('emitEmployee') emitEmployee: EventEmitter<any> = new EventEmitter<any>;
  constructor(
    public coreService: CoreService,
    private route: Router,
    private _snackBar: MatSnackBar,
  ) {
      coreService.screenName.subscribe((currentScreen) => {
        this.currentScreenName = currentScreen;
      });
    }
  ngOnInit() {
    console.log(this.selectedEmployee);
  }

  async deleteEmployee() {
    // this.emitEmployee.emit(eve)
    await db.addEmployee.delete(this.selectedEmployee.id);
    this._snackBar.open("Employee data deleted", "Done", {duration: 3000});
    this.route.navigate(['/dashboard']);
  }

}
