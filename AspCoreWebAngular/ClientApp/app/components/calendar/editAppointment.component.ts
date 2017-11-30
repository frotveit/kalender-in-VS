import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAppointment } from './model/calendar.interfaces';
import * as DateTimeHelpers from "./model/dateTimeHelpers";

@Component({
    selector: 'editAppointment',
    templateUrl: './editAppointment.component.html',
    styleUrls: ['./editAppointment.component.css']
})

export class EditAppointmentComponent implements OnInit {
    @Input() appointment: IAppointment;
    

    ngOnInit() {        
    }

    onSave() {
        //this.appointment.Time = this.timeD.getHours();
    }
}
