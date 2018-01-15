import * as React from 'react';
import { IAppointment } from './model/Interfaces';
import { NumberEdit } from './NumberEdit';
import { TimeEdit } from './TimeEdit'; 
import { DateEdit } from './DateEdit';
// import DatePicker from 'react-date-picker';
// import Datepicker from 'react-datepicker';
import * as Moment from 'moment';

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

    onChangedDateByMoment() {

    }

    render() {
        var appointment = this.props.appointment;

        return (
            <div className="cal-appointment-edit" >
                <label> Description </label>
                <input value={appointment.description} onChange={this.onchangeDescription.bind(this)} />                               

                <DateEdit label="Date" date={appointment.date} onChanged={this.onchangeDate.bind(this)} />
                {
                    //<div>
                    //    <DatePicker
                    //        onChange={this.onchangeDate.bind(this)}
                    //        value={appointment.date}
                    //        locale="no-NO"
                    //        showWeekNumbers={true}
                    //    />
                    //</div>
                }
                {
                    //<div>
                    //    <Datepicker
                    //        onChange={this.onChangedDateByMoment.bind(this)}
                    //        selected={Moment(appointment.date)}
                    //        scrollableYearDropdown={true}
                    //        showWeekNumbers={true}
                    //        dateFormat="DD.MM.YYYY"
                    //        locale="no-no"
                    //        monthsShown={2}
                    //    />
                    //</div>
                }
                

                <TimeEdit label="Time" time={appointment.time} onChanged={this.onchangeTime.bind(this)} />

                <NumberEdit label="Lenght" value={appointment.length} onChanged={this.onchangeLength.bind(this)} />
            </div>
        );
    }
}

