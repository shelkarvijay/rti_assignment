import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomeDateComponent } from './components/custome-date/custome-date.component';
import { CustomeNoDateComponent } from './components/custome-no-date/custome-no-date.component';

const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  FlexLayoutModule,
  MatDividerModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule
]


@NgModule({
  declarations: [
    HeaderComponent,
    CustomeDateComponent,
    CustomeNoDateComponent
  ],
  imports: [
    CommonModule,
    MaterialModules
  ],
  exports: [
    HeaderComponent,
    MaterialModules
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule { }
