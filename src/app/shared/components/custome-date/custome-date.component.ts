import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custome-date',
  templateUrl: './custome-date.component.html',
  styleUrls: ['./custome-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomeDateComponent<D> implements AfterViewInit, OnDestroy {
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

  nextWeekDay(nextDatName: string) {
    let incrementCount;
    let currentDate = this._calendar.activeDate;
    let dayNumber = this._dateAdapter.getDayOfWeek(currentDate);
    incrementCount = nextDatName === 'mon' ? 8 : nextDatName === 'tue' ? 9 : 7
    let weekDays = 0; // = dayNumber > 0 ? incrementCount : 1;
    if(nextDatName === 'mon') {
      weekDays = dayNumber > 0 ? incrementCount : 1;
    } else if(nextDatName === 'tue'){
      if(dayNumber <= 1) { weekDays = 2}
      if(dayNumber > 1) { weekDays = incrementCount}
    }
    let day = this._dateAdapter.getDate(currentDate);
    let month = this._dateAdapter.getMonth(currentDate)
    let year = this._dateAdapter.getYear(currentDate);

    let nextWeekDate;
    if(nextDatName === 'mon' || nextDatName === 'tue') {
      nextWeekDate = day+(weekDays-dayNumber);
    } else {
      nextWeekDate = day + incrementCount;
    }
    this._calendar.activeDate = this._dateAdapter.createDate(this._dateAdapter.getYear(currentDate), this._dateAdapter.getMonth(currentDate), nextWeekDate);
    this._datePicker.select(this._calendar.activeDate);
  }

  onSave() {
    this._datePicker.close();
  }

  cancelDateSelect() {
    this._datePicker.close();
  }

  ngAfterViewInit() {
    this._calendar.activeDate = this._calendar.activeDate;
  }
}
