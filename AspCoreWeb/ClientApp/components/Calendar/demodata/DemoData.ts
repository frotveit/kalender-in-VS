import { ICalendarInput, IPersonInput, IAppointmentInput } from '../model/Interfaces';
import { Person } from '../model/Person';
import * as DateTimeUtil from '../DateTimeHelpers';

class PersonInput implements IPersonInput {
    id: number;
    name: string;
   
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

var PersonInputs: IPersonInput[] = [
    new PersonInput(1, 'Lise Landmark'),
    new Person(2, 'Ola Standford'),
    new Person(3, 'Nils Nannerud'),
    new Person(4, 'Linda Arnesen'),
    new Person(5, 'Ida Gamme')
];

var today = DateTimeUtil.GetToday(),
    year = today.getFullYear(),
    mon = today.getMonth(),
    day = today.getDate();

var AppointmentInputs: IAppointmentInput[] = [
    {
        type: 'A', description: 'A - Mekling',
        date: new Date(year, mon, day, 9, 0), 
        dateTo: new Date(year, mon, day, 10, 0),
        personIds: [1]
    },
    {
        type: 'K', description: 'Klinisk sak',
        date: new Date(year, mon, day, 12, 0), 
        dateTo: new Date(year, mon, day, 14, 30),
        personIds: [1]
    },
    {
        type: 'C', description: 'C-Mekling',
        date: new Date(year, mon, day, 10, 0), 
        dateTo: new Date(year, mon, day, 11, 0),
        personIds: [2]
    },
    {
        type: '', description: 'Avtale',
        date: new Date(year, mon, day, 10, 0), 
        dateTo: new Date(year, mon, day, 12, 0),
        personIds: [2]
    },
    {
        type: '', description: 'Overlapp',
        date: new Date(year, mon, day, 9, 0), 
        dateTo: new Date(year, mon, day, 14, 0),
        personIds: [2]
    },
    {
        type: 'KG', description: 'Klinisk gruppe (AKTIV)',
        date: new Date(year, mon, day, 8, 0), 
        dateTo: new Date(year, mon, day, 10, 0),
        personIds: [3]
    },
    {
        type: 'KG', description: 'Klinisk gruppe (AKTIV)',
        date: new Date(year, mon, day, 10, 0), 
        dateTo: new Date(year, mon, day, 12, 0),
        personIds: [3]
    },
    {
        type: 'B', description: 'B - Mekling',
        date: new Date(year, mon, day, 8, 0), 
        dateTo: new Date(year, mon, day, 9, 0),
        personIds: [4]
    },
    {
        type: 'K', description: 'Klinisk sak',
        date: new Date(year, mon, day, 10, 0), 
        dateTo: new Date(year, mon, day, 11, 0),
        personIds: [4]
    },
    {
        type: '', description: 'Ny mekling',
        date: new Date(year, mon, day, 10, 0), 
        dateTo: new Date(year, mon, day, 14, 0),
        personIds: [5]
    },

    {
        type: 'D', description: 'D - Mekling delt',
        date: new Date(year, mon, day, 9, 0), 
        dateTo: new Date(year, mon, day, 10, 0),
        personIds: [1, 2]
    }
];

export var CalendarInput: ICalendarInput = {
    persons: PersonInputs,
    appointments: AppointmentInputs
};