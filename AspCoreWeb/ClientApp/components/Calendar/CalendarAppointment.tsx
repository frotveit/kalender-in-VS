import * as React from 'react';
import { ISetup, IAppointment } from './model/Interfaces';
import * as DateTimeUtil from './DateTimeHelpers';

export interface ICalendarAppointmentProps {
    setup: ISetup;
    appointment: IAppointment;
    addAppointment: (time: number) => void;
}

interface ICalendarAppointmentState {
    mouseOver: boolean;
    mouseTime: number;
    mouseRelTime: number;
}

export class CalendarAppointment extends React.Component<ICalendarAppointmentProps, ICalendarAppointmentState> {
    displayName = 'Appointment';
    _appointmentDiv: HTMLDivElement;
    constructor(props: ICalendarAppointmentProps) {
        super(props);
        this.state = {
            mouseOver: false,
            mouseTime: 0,
            mouseRelTime: 0
        };
        this.onClicked = this.onClicked.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onClicked(e: React.MouseEvent<HTMLDivElement>): void {
        var setup: ISetup = this.props.setup;
        var appointment: IAppointment = this.props.appointment;
        var time: number = setup.timeFrom + (e.clientX - setup.nameWidth) / setup.hourWidth;
        if (appointment.type === '') {
            this.props.addAppointment(time);
        }
    }

    onMouseOver(e: React.MouseEvent<HTMLDivElement>) {
        var appointment: IAppointment = this.props.appointment;
        var setup: ISetup = this.props.setup;
        var time: number = setup.timeFrom + (e.clientX - setup.nameWidth) / setup.hourWidth;
        time = Math.floor(time * 4) / 4;
        var relTime = time - appointment.time;
        this.setState({
            mouseOver: true,
            mouseTime: time,
            mouseRelTime: relTime
        });
    }

    onMouseLeave() {
        this.setState({
            mouseOver: false,
            mouseTime: 0,
            mouseRelTime: 0
        });
    }
    
    render() {
        var appointment: IAppointment = this.props.appointment,
            setup: ISetup = this.props.setup,
            start: number = (appointment.time - setup.timeFrom) * setup.hourWidth,
            width: number = appointment.length * setup.hourWidth - 16,
            displayTime = DateTimeUtil.getDisplayTimeInterval(appointment.time, appointment.time + appointment.length),
            iconStyle: React.CSSProperties = { padding: '0 5px 0 0', color: '#DE2C2C'},
            className: string = 'cal-appointment cal-appointment-type' + appointment.type;
        
        var style: React.CSSProperties = {
            position: 'absolute',
            left: start,
            top: appointment.rowNum * 40,
            width: width,
            height: setup.rowHeight
        };
        var hoverstyle: React.CSSProperties = {
            width: setup.hourWidth,
            heigth: 30,
            position: 'absolute',
            left: this.state.mouseRelTime * setup.hourWidth,
            top: 0
        };
        return (
            <div 
                className={className} 
                style={style} 
                onClick={this.onClicked} 
                onMouseOver={this.onMouseOver}
                onMouseMove={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}
                ref={(el: HTMLDivElement) => this._appointmentDiv = el}
            >
                <div className="cal-appointment-time"> Kl. {displayTime} <br /> </div>
                <div className="-cal-appointment-description">
                    {
                        appointment.type === 'D' && 
                        <i className="fa fa-exclamation-triangle" style={iconStyle} />
                    }
                    {this.props.appointment.description}
                </div>
                {
                    this.state.mouseOver && this.props.appointment.isFree() &&
                    <div className="cal-appointment-free" style={hoverstyle} />
                }
            </div>
        );
    }
}
