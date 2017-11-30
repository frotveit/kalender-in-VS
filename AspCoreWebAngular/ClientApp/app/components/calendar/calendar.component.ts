import { Component } from '@angular/core';
import { IPerson, IAppointment } from './model/calendar.interfaces';
import { Persons } from './model/demodata';
import * as DateTimeHelpers from "./model/dateTimeHelpers";
import { CalendarAppointmentComponent } from './calendarAppointment.component';
import { EditAppointmentComponent } from './editAppointment.component';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
    public date: Date = new Date();
    public persons: IPerson[] = Persons;
    public activeAppointment: IAppointment;

    public goToday() {
        this.date = new Date();
    }
    public goPrev() {
        this.date = DateTimeHelpers.PrevDay(this.date);
    }
    public goNext() {
        this.date = DateTimeHelpers.NextDay(this.date);
    } 
    public getDate(): string {
        return DateTimeHelpers.formatDate(this.date);
    }

    onAppointmentSelected(appointment: IAppointment): void {
        this.activeAppointment = appointment;
    }
}




