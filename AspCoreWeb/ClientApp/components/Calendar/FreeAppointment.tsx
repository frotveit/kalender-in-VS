
import * as React from 'react';
import { ISetup, IFreeAppointment } from './model/Interfaces';

export interface IFreeAppointmentProps {
    setup: ISetup;
    appointment: IFreeAppointment;
    addAppointment: (timeFrom: number) => void;
}

export class FreeAppointment extends React.Component<IFreeAppointmentProps, {}> {
    displayName = 'FreeAppointment';
    constructor(props: IFreeAppointmentProps) {
        super(props);
        this.onClicked = this.onClicked.bind(this);
    }
    onClicked(e: React.MouseEvent<HTMLDivElement>) {
        this.props.addAppointment(this.props.appointment.time);
    }
    render() {
        var appointment = this.props.appointment,
            setup = this.props.setup,
            start = (appointment.time - setup.timeFrom) * setup.hourWidth,
            width = appointment.length * setup.hourWidth - 3,
            style: React.CSSProperties;
        style = {
            position: 'absolute',
            left: start,
            top: 0,
            width: width
        };
        return (
            <div className="cal-free" style={style} onClick={this.onClicked}/>            
        );
    }
}