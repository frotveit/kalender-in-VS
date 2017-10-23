import { IAppointment, AppointmentType } from './Interfaces';

export class Appointment implements IAppointment {
    type: AppointmentType;
    description: string;
    date: Date;
    time: number;
    length: number;

    key: number;
    timeTo: number;    
    rowNum: number;

    constructor(key: number) {
        this.key = key;
    }

    isFree(): boolean {
        if (this.type === '') {
            return true;
        }
        return false;
    }

    /**
     * Check if a time interval does not conflict with appointments.
     * Made available on person
     * @param {object} currentAppointment {date, timeFrom, timeTo, key}
     * @param {array} appointments
     */
    overlaps (appointments: IAppointment[], skipBlack: boolean): boolean {
        var curr = this;
        var overlap: boolean = false;
        appointments.forEach(function (appointment: IAppointment): void {
            if ((!skipBlack || appointment.type !== '') && 
                curr.date.getTime() === appointment.date.getTime() && curr.key !== appointment.key) {
                if (curr.time >= appointment.time && curr.timeTo <= appointment.timeTo) {  // Inside or equal
                    overlap = true;
                    return;
                }
                if (curr.time < appointment.time && curr.timeTo > appointment.timeTo) {  // Outside both sides
                    overlap = true;
                    return;
                }
                if (curr.time < appointment.time &&
                    curr.timeTo > appointment.time &&
                    curr.timeTo <= appointment.timeTo) {  // overlap left
                    overlap = true;
                    return;
                }
                if (curr.time >= appointment.time &&
                    curr.time < appointment.timeTo &&
                    curr.timeTo > appointment.timeTo) {  // overlap right
                    overlap = true;
                    return;
                }
            }
        });
        return overlap;
    }
}