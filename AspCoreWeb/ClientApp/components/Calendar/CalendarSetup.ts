import { ISetup } from './model/Interfaces';

export interface ISetupInput {
    timeFrom: number;
    minTimeTo: number;
    maxTimeTo: number;
    nameColumnWidth: number;
    rowHeight: number;
}

var SetupInput: ISetupInput = {
    timeFrom: 8,
    minTimeTo: 18,
    maxTimeTo: 21,
    nameColumnWidth: 200,
    rowHeight: 40
}; 

export class CalendarSetup implements ISetup {

    numberOfWeekDays: number = 5;
    weekdays: string[] = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'];
    timeFrom: number;
    timeTo: number;
    timeInterval: number = 1;
    longDay: boolean;               
    nameWidth: number;
    hourWidth: number;
    rowHeight: number;

    private input: ISetupInput;

    constructor (input: ISetupInput) {
        this.input = input;

        this.timeFrom = input.timeFrom;
        this.timeTo = input.minTimeTo;
        this.longDay = false;
        this.nameWidth = input.nameColumnWidth;
        this.rowHeight = input.rowHeight;

        this.calculate();
    }

    calculate (): void {
        var numHours = this.timeTo - this.timeFrom;
        var totalWidth = window.innerWidth,
            menuWidth = Math.floor(totalWidth / 4),
            calendarWidth = totalWidth - menuWidth,
            gridWidth = calendarWidth - this.nameWidth,
            hourWidth = gridWidth / numHours; 
        this.hourWidth = hourWidth;
    }

    changeDayLength(longDay: boolean): ISetup {
        this.longDay = longDay;
        this.timeTo = longDay ? this.input.maxTimeTo : this.input.minTimeTo;
        this.calculate();
        return this;
    }

    refresh(): ISetup {
        this.calculate();
        return this;
    }
}

export function GetCalendarSetup(): ISetup {
    return new CalendarSetup(SetupInput);
}
