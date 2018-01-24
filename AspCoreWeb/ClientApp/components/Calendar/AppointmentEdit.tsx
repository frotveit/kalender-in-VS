import * as React from 'react';
import { IAppointment } from './model/Interfaces';
import { NumberEdit } from './NumberEdit';
import { TimeEdit } from './TimeEdit'; 
import { DateEdit } from './DateEdit';
import { DatePicker } from './DatePicker';

export interface AppointmentEditProps {
    appointment: IAppointment;
    onAppointmentUpdated: (appointment: IAppointment) => void;
}

interface AppointmentEditState {
    lengthError: string;
}

export class AppointmentEdit extends React.Component<AppointmentEditProps, AppointmentEditState> {
    displayName = 'AppointmentEdit';
    constructor(props: AppointmentEditProps) {
        super(props);
    }

    onchangeDescription(event: any) {
        var value = event.target.value;
        var appointment = this.props.appointment;
        appointment.description = value;
        this.props.onAppointmentUpdated(appointment);
    }

    onchangeDate(date: Date) {
        var appointment = this.props.appointment;
        appointment.date = date;
        this.props.onAppointmentUpdated(appointment);
    }    

    onchangeTime(time: number) {
        var appointment = this.props.appointment;
        appointment.time = time;
        this.props.onAppointmentUpdated(appointment);
    }

    onchangeLength(length: number) {
        var appointment = this.props.appointment;
        appointment.length = length;
        this.props.onAppointmentUpdated(appointment);
    }   

    render() {
        var appointment = this.props.appointment;

        return (
            <div className="cal-appointment-edit" >
                <div className="cal-field-container">
                    <label> Description </label>
                    <div className="field">
                        <input value={appointment.description} onChange={this.onchangeDescription.bind(this)} />                               
                    </div>
                </div>
                <div className="cal-field-container">
                    <DateEdit label="Date" date={appointment.date} onChanged={this.onchangeDate.bind(this)} />
                </div>                
                <div className="cal-field-container">
                    <DatePicker label="Date" date={appointment.date} onChangeDate={this.onchangeDate.bind(this)} />
                </div>
                <div className="cal-field-container">
                    <TimeEdit label="Time" time={appointment.time} onChanged={this.onchangeTime.bind(this)} />
                </div>
                <div className="cal-field-container">
                    <NumberEdit label="Lenght" value={appointment.length} onChanged={this.onchangeLength.bind(this)} />
                </div>
            </div>
        );
    }
}

