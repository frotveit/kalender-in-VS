
export interface IPersonInput {
    id: number;
    name: string;
}

export type AppointmentType = '' | 'N' | 'A' | 'B'| 'C'| 'D' | 'K' | 'KG';

export interface IAppointmentInput {
    type: AppointmentType;
    description: string;
    date: Date;
    dateTo: Date;
    personIds: number[];
}

export interface ICalendarInput {
    persons: IPersonInput[];
    appointments: IAppointmentInput[];
}

export interface ISetup {
    numberOfWeekDays: number;
    weekdays: string[];
    timeFrom: number;
    timeTo: number;
    timeInterval: number;
    longDay: boolean;
    
    nameWidth: number;
    hourWidth: number;
    rowHeight: number;

    changeDayLength: (longDay: boolean) => ISetup;
    refresh: () => ISetup;
}

export interface IAppointment {
    key: number;
    type: AppointmentType;
    description: string;
    date: Date;
    time: number;
    length: number;
    timeTo: number;    
    rowNum: number;
    
    isFree: () => boolean;
    overlaps: (appointments: IAppointment[], skipBlack: boolean) => boolean;
}

export interface IFreeAppointment {
    key: number;
    date: Date;
    time: number;
    timeTo: number;
    length: number;
}

export interface INewAppointmentData {
    date: Date;
    time: number;
    timeTo: number;
}

export interface IPerson {
    id: number;
    name: string;

    currentAppointments: IAppointment[];
    currentRows: IAppointment[][];
    appointments: IAppointment[];
    currentRowsNum: number;
    freeAppointments: IFreeAppointment[];

    isFree: (date: Date, timeFrom: number, timeTo: number, appointments: IAppointment[]) => boolean;
    addToRows: (appointment: IAppointment) => void;
    addAppointment: (data: ICalData, newAppointmentData: INewAppointmentData) => void;
}

export interface ICalData {
    persons: IPerson[];
    nextAppointmentKey: number;    
}
