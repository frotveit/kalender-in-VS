import {  } from './Appointments';
import { Person } from './model/Person';
import { Appointment } from './model/Appointment';
import { IAppointmentInput, IAppointment, ICalData, ICalendarInput, 
    IFreeAppointment, IPerson, IPersonInput } from './model/Interfaces';
import * as DateTimeUtil from './DateTimeHelpers';

export function GetCurrentAppointments(data: ICalData, date: Date): ICalData {    
    data.persons.forEach(function (person: IPerson): void {
        person.currentAppointments = [];
        person.currentRows = [[]];
        person.currentRowsNum = 1;        
        person.appointments.forEach(function (appointment: IAppointment): void {
            if (appointment.date.getTime() === date.getTime()) {
                person.currentAppointments.push(appointment);
                person.addToRows(appointment);
            }
        });
    });
    GetFreeAppointments(data, date);
    return data;
}

function GetFreeAppointments(data: ICalData, date: Date): void {
    data.persons.forEach(function (person: IPerson): void {
        person.freeAppointments = [];
        var i: number;
        for (i = 8; i <= 17; i = i + 0.25) {
            if (person.isFree(date, i, i + 1, person.currentAppointments)) {
                var app: IFreeAppointment = {
                    date: date, time: i, timeTo: i + 1, key: i, length: 1
                };
                person.freeAppointments.push(app);
            }
        }
    });
}

function GetPerson(persons: IPerson[], id: number): IPerson | null {
    var person: IPerson | null = null;
    persons.forEach(function (p: IPerson){
        if (p.id === id) {
            person = p;
        }
    });
    return person;
}

function GetAppointments(input: ICalendarInput, data: ICalData): IPerson[] {
    var persons = data.persons;
    input.appointments.forEach(function (appointment: IAppointmentInput): void {
        appointment.personIds.forEach(function(personId: number): void {
            var per: IPerson | null = GetPerson(persons, personId);
            if (per != null) {                
                var newAppointment: IAppointment = new Appointment(data.nextAppointmentKey++);
                newAppointment.type = appointment.type;
                newAppointment.description = appointment.description;
                newAppointment.date = DateTimeUtil.GetDatePart(appointment.date);
                newAppointment.time = appointment.date.getHours() + appointment.date.getMinutes() * 60 / 100;
                newAppointment.length = (appointment.dateTo.getTime() - appointment.date.getTime()) / 1000 / 60 / 60;
                newAppointment.timeTo = newAppointment.time + newAppointment.length;
                newAppointment.personId = per.id;
                per.appointments.push(newAppointment);
            }
        });
    });
    return persons;
}

export function GetData(input: ICalendarInput): ICalData {
    var data: ICalData = {
        persons: [],
        nextAppointmentKey: 1        
    };

    input.persons.forEach(
        function (p: IPersonInput) {
            data.persons.push( new Person(p.id, p.name));
        }
    );

    GetAppointments(input, data);    
    GetCurrentAppointments(data, DateTimeUtil.GetToday());
    return data;
}
