import * as React from 'react';
import { ISetup, IPerson, ICalData, IAppointment, INewAppointmentData } from './model/Interfaces';
import { CalendarGridHeader } from './CalendarGridHeader';
import { CalendarRow } from './CalendarRow';

export interface ICalendarGridProps {
    date: Date;
    data: ICalData;
    setup: ISetup;
    newAppointment?: IAppointment;
    onNewAppointment: (appointment: IAppointment) => void;
    onUpdateNewAppointment: (appointment: IAppointment) => void;
}

export class CalendarGrid extends React.Component<ICalendarGridProps, {}> {
    displayName = 'Grid';
    constructor(props: ICalendarGridProps) {
        super(props);
    }
    
    render() {
        var me = this,
            data = this.props.data,
            setup = this.props.setup;
        return (
            <div className="cal-grid">                
                <CalendarGridHeader setup={setup} />
                <div className="cal-grid-content">
                {data.persons.map(function (person: IPerson) {
                    return (
                        <div key={person.id} className="cal-row-container">
                            <CalendarRow 
                                key={person.name}
                                date={me.props.date}
                                data={data}
                                person={person}
                                setup={setup}
                                newAppointment={me.props.newAppointment}
                                onNewAppointment={me.props.onNewAppointment}
                                onUpdateNewAppointment={me.props.onUpdateNewAppointment}                                
                            />
                            <HorizontalLine />
                        </div>
                    );
                }, this)}
                </div>
            </div>);
    }
}

class HorizontalLine extends React.Component<{}, {}> {
    displayName = 'HorizontalLine';
    render() {
        return (
            <div className="horizontal-line" /> 
        );
    }
}
