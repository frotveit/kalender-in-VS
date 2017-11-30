import { ICalData, IPerson, IAppointment, IFreeAppointment, INewAppointmentData } from './Interfaces';
import { Appointment } from './Appointment';

export class Person implements IPerson {
    id: number;
    name: string;
    currentAppointments: IAppointment[] = [];
    currentRows: IAppointment[][] = [];
    appointments: IAppointment[] = [];
    currentRowsNum: number = 0;
    freeAppointments: IFreeAppointment[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    
    /**
     * Check if a time interval does not conflict with appointments.
     * Made available on person
     */
    isFree (date: Date, time: number, timeTo: number, appointments: IAppointment[]): boolean {
        var currAppointment: IAppointment = new Appointment(0);
        currAppointment.date = date;
        currAppointment.time = time;
        currAppointment.timeTo = timeTo;
        currAppointment.type = '';
        currAppointment.description = '';
        currAppointment.length = 0;
        return !currAppointment.overlaps(appointments, true);
    }

    /**
     * Add to rows to sort out overlapping appointments
     */
    addToRows(appointment: IAppointment): void {
    var inserted: boolean = false;
    var i: number;
    for (i = 0; i < this.currentRowsNum && !inserted; i++) {
        if (!appointment.overlaps(this.currentRows[i], false)) {
            this.currentRows[i].push(appointment);
            appointment.rowNum = i;
            inserted = true;
        }
    }
    if (!inserted) {
        this.currentRows.push([]);
        this.currentRowsNum = this.currentRowsNum + 1;
        this.currentRows[this.currentRowsNum - 1].push(appointment);
        appointment.rowNum = this.currentRowsNum - 1;
    }
    }

    addAppointment(data: ICalData, newAppointmentData: INewAppointmentData): void {
        var appointment: IAppointment = new Appointment(data.nextAppointmentKey++);
            
        appointment.type = 'N';
        appointment.description = 'Ny avtale';
        appointment.date = newAppointmentData.date;
        appointment.time = newAppointmentData.time;
        appointment.length = newAppointmentData.timeTo - newAppointmentData.time;
        appointment.timeTo = newAppointmentData.timeTo;
        appointment.personId = this.id;
    
        this.appointments.push(appointment);
        this.currentAppointments.push(appointment);
        this.addToRows(appointment);
    }

}