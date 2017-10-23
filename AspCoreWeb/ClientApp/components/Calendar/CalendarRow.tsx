import * as React from 'react';
import { ISetup, ICalData, IPerson, IFreeAppointment, IAppointment } from './model/Interfaces';
import { CalendarAppointment } from './CalendarAppointment';
import { FreeAppointment } from './FreeAppointment';

export interface ICalendarRowProps {
    date: Date;
    setup: ISetup;
    person: IPerson;
    data: ICalData;
    onAddAppointment: () => void;
}

export class CalendarRow extends React.Component<ICalendarRowProps, {}> {
    displayName = 'Row';
    constructor(props: ICalendarRowProps) {
        super(props);
        // this.onClicked = this.onClicked.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
    }
    /*onClicked (e) {
        var setup = this.props.setup;
        var time = setup.timeFrom + (e.clientX -setup.nameWidth)/setup.hourWidth;
        //this.addAppointment(time);
    }*/

    addAppointment(time: number) {
        var person = this.props.person,
            currentDate = this.props.date,
            timeFrom = Math.floor(time * 4) / 4,
            timeTo = timeFrom + 1;

        if (person.isFree && person.isFree(currentDate, timeFrom, timeTo, person.currentAppointments)) {
            person.addAppointment(
                this.props.data,
                { 
                    date: currentDate, 
                    time: timeFrom, 
                    timeTo: timeTo 
                }
            );
            this.props.onAddAppointment();
        }
    }

    render() {
        var me = this,
            setup = this.props.setup,
            person = this.props.person,
            numRows = 1;
        if (person.currentRowsNum) {
            numRows = person.currentRowsNum;
        }
        var rowstyle: React.CSSProperties = { height: numRows * setup.rowHeight },
            namestyle: React.CSSProperties = { width: this.props.setup.nameWidth - 13 },
            contentstyle: React.CSSProperties = { height: numRows * setup.rowHeight };
        return (
            <div className="calendar-row" style={rowstyle} >
                <div className="calendar-name-col" style={namestyle} >{person.name} </div>
                <div className="calendar-row-content" style={contentstyle} >
                    {
                        person.currentAppointments.map(
                            function (a: IAppointment) {
                                return <CalendarAppointment 
                                    key={a.key} 
                                    appointment={a} 
                                    setup={me.props.setup} 
                                    addAppointment={me.addAppointment} 
                                />;
                            }, 
                            this)
                    }
                    {person.freeAppointments.map(
                        function (a: IFreeAppointment) {
                        return <FreeAppointment 
                            key={a.key} 
                            appointment={a} 
                            setup={me.props.setup} 
                            addAppointment={me.addAppointment} 
                        />;
                    },  this)}
                </div>
            </div>);
    }
}
