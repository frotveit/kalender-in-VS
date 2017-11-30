
export interface IPerson {
    Id: number;
    Name: string;
    Appointments: IAppointment[];
}

export interface IAppointment {
    Id: number;
    Description: string;
    Date: Date;
    Time: number;
    Length: number;
}