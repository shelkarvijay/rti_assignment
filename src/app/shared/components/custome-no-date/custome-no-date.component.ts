import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custome-no-date',
  templateUrl: './custome-no-date.component.html',
  styleUrls: ['./custome-no-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomeNoDateComponent<D> implements AfterViewInit, OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    public _datePicker: MatDatepicker<D>,
    public _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
      console.log(_calendar.activeDate);
  }

  public todayClicked() {
    this._calendar.activeDate =
      this._dateAdapter.today();
      // this._calendar._dateSelected(this._calendar.activeDate);
      this._datePicker.select(this._dateAdapter.today());
      // this._datePicker.close();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }

  previousClicked(mode: "month" | "year") {
    this._calendar.activeDate =
      mode === "month"
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: "month" | "year") {
    this._calendar.activeDate =
      mode === "month"
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

  get getSelectedDate() {
    return this._calendar.activeDate;
  }

  onSave() {
    this._datePicker.close();
  }

  cancelDateSelect() {
    // this._calendar.activeDate = new Date();
    this._datePicker.close();
  }

  ngAfterViewInit() {
    this._calendar.activeDate = this._calendar.activeDate;
  }
}
