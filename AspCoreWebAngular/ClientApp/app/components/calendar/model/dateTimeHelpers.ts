

// source: https://weeknumber.net/how-to/javascript
export function getWeek(date: Date): number {
    var workdate: Date = new Date(date.getTime());
    workdate.setHours(0, 0, 0, 0);
    workdate.setDate(workdate.getDate() + 3 - (workdate.getDay() + 6) % 7);
    var week1: Date = new Date(workdate.getFullYear(), 0, 4);
    return 1 + Math.round(((workdate.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

export function getTimeAsDate(time: number): Date {
    var hour: number = Math.floor(time),
        rest: number = time - hour,
        min: number = Math.floor(rest * 60);

    return new Date(1970, 0, 1, hour, min, 0);
}

export function getDisplayTime(time: number): string {
    var hour: number = Math.floor(time),
        rest: number = time - hour,
        min: number = Math.floor(rest * 60),
        extraMinZero: string = '';
    if (min < 10) {
        extraMinZero = '0';
    }
    return hour.toString() + ':' + extraMinZero + min;
}

export function getDisplayTimeInterval(timeFrom: number, timeTo: number): string {
    return getDisplayTime(timeFrom) + ' - ' + getDisplayTime(timeTo);
}

export function parseDate(dateString: string): Date | null {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
}

export function getDisplayDate(date: Date): string {
    var day: number = date.getDate();
    var month: number = date.getMonth();    
    var year: number = date.getFullYear();

    var dayZero: string = day < 10 ? "0" : "";
    var monthZero: string = month < 10 ? "0" : "";

    return year.toString() + '-' + monthZero + month.toString() + '-' + dayZero + day.toString();
}

export function formatDate(date: Date): string {
    var monthNames: string[] = [
        'januar', 'februar', 'mars',
        'april', 'mai', 'juni', 'juli',
        'august', 'september', 'oktober',
        'november', 'desember'
    ];

    var dayNames: string[] = [
        'Søndag', 'Mandag', 'Tirsdag', 'Onsdag',
        'Torsdag', 'Fredag', 'Lørdag'
    ];

    var day: number = date.getDate();
    var dayIndex: number = date.getDay();
    var monthIndex: number = date.getMonth();
    var year: number = date.getFullYear();

    return dayNames[dayIndex] + ' ' + day + '.' + monthNames[monthIndex] + ' ' + year;
}

export function AddDays(date: Date, days: number): Date {
    var newDate: Date = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

export function GetDatePart(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

export function GetToday(): Date {
    var today = new Date();
    today = GetDatePart(today);
    return today;

}

export function NextDay(date: Date): Date {
    var next: Date = AddDays(date, 1);

    // Go to monday if weekend
    var dayIndex: number = next.getDay();
    if (dayIndex === 0) {
        next = AddDays(next, 1);
    }
    if (dayIndex === 6) {
        next = AddDays(next, 2);
    }
    return next;
}

export function NextWeek(date: Date): Date {
    var next: Date = AddDays(date, 7);

    // Go to monday if weekend
    var dayIndex: number = next.getDay();
    if (dayIndex === 0) {
        next = AddDays(next, 1);
    }
    if (dayIndex === 6) {
        next = AddDays(next, 2);
    }
    return next;
}

export function PrevDay(date: Date): Date {
    var prev: Date = AddDays(date, -1);

    // Go to friday if weekend
    var dayIndex: number = prev.getDay();
    if (dayIndex === 0) {
        prev = AddDays(prev, -2);
    }
    if (dayIndex === 6) {
        prev = AddDays(prev, -1);
    }

    return prev;
}

export function PrevWeek(date: Date): Date {
    var prev: Date = AddDays(date, -7);

    // Go to friday if weekend
    var dayIndex: number = prev.getDay();
    if (dayIndex === 0) {
        prev = AddDays(prev, -2);
    }
    if (dayIndex === 6) {
        prev = AddDays(prev, -1);
    }

    return prev;
}