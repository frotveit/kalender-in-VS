import * as React from 'react';
import { ISetup, ICalData, IPerson, IFreeAppointment, IAppointment, INewAppointmentData } from './model/Interfaces';
import { CalendarAppointment } from './CalendarAppointment';
import { FreeAppointment } from './FreeAppointment';
import { NewAppointment } from './NewAppointment';
import { Appointment } from './model/Appointment';

export interface ICalendarRowProps {
    date: Date;
    setup: ISetup;
    person: IPerson;
    data: ICalData;
    newAppointment?: IAppointment;
    onNewAppointment: (appointment: IAppointment) => void;
    onUpdateNewAppointment: (appointment: IAppointment) => void;
}

export class CalendarRow extends React.Component<ICalendarRowProps, {}> {
    displayName = 'Row';
    constructor(props: ICalendarRowProps) {
        super(props);
        // this.onClicked = this.onClicked.bind(this);
        this.onNewAppointment = this.onNewAppointment.bind(this);
    }
    /*onClicked (e) {
        var setup = this.props.setup;
        var time = setup.timeFrom + (e.clientX -setup.nameWidth)/setup.hourWidth;
        //this.addAppointment(time);
    }*/

    onNewAppointment(time: number) {
        var person = this.props.person,
            currentDate = this.props.date,
            timeFrom = Math.floor(time * 4) / 4,
            timeTo = timeFrom + 1;
        var newAppointmentTime: INewAppointmentData = {
                date: currentDate, 
                time: timeFrom, 
                timeTo: timeTo
            }

        if (person.isFree(currentDate, timeFrom, timeTo, person.currentAppointments)) {
            //person.addAppointment(
            //    this.props.data,
            //    newAppointmentTime
            //);
            if (this.props.newAppointment) {
                var appointment = this.props.newAppointment;
                appointment.personId = person.id;
                appointment.date = newAppointmentTime.date;
                appointment.time = newAppointmentTime.time;
                appointment.timeTo = appointment.time + appointment.length; // Keep the current length
                this.props.onUpdateNewAppointment(appointment);
            }
            else {
                var newAppointment = Appointment.CreateNewAppointment(newAppointmentTime);
                newAppointment.personId = this.props.person.id;
                this.props.onNewAppointment(newAppointment);
            }
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
                                    addAppointment={me.onNewAppointment} 
                                />;
                            }, 
                            this)
                    }
                    {
                        person.freeAppointments.map(
                        function (a: IFreeAppointment) {
                        return <FreeAppointment 
                            key={a.key} 
                            appointment={a} 
                            setup={setup}
                            addAppointment={me.onNewAppointment} 
                        />;
                        }, this)
                    }
                    {
                        this.props.newAppointment && this.props.newAppointment.personId === this.props.person.id && this.props.newAppointment.date === this.props.date &&
                        <NewAppointment appointment={this.props.newAppointment} setup={setup} />
                    }
                </div>
            </div>);
    }
}
