import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAppointment } from './model/calendar.interfaces';

@Component({
    selector: 'calendarAppointment',
    templateUrl: './calendarAppointment.component.html',
    styleUrls: ['./calendarAppointment.component.css']
})

export class CalendarAppointmentComponent {
    @Input() appointment: IAppointment;
    @Output() appointmentSelected: EventEmitter<IAppointment> = new EventEmitter<IAppointment>();

    onClick(): void {
        this.appointmentSelected.emit(this.appointment);
    }
}