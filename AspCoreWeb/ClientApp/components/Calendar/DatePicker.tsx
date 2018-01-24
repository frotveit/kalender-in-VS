import * as React from 'react';
//import DatePicker from 'react-date-picker';
import Datepicker from 'react-datepicker';
import * as Moment from 'moment';

export interface DatePickerProps {
    label: string;
    date: Date;
    onChangeDate: (date: Date) => void;
}

export class DatePicker extends React.Component<DatePickerProps, {}> {
    displayName = 'DatePicker';

    onChangedDateByMoment(dateMoment: Moment.Moment) {
        var date: Date = dateMoment.toDate();
        this.props.onChangeDate(date);
    }

    render() {
        return (
            <div className="cal-date-picker" >
                <label> Date </label>
                <div className="field">
                    <Datepicker
                        onChange={this.onChangedDateByMoment.bind(this)}
                        selected={Moment(this.props.date)}
                        scrollableYearDropdown={true}
                        showWeekNumbers={true}
                        dateFormat="DD.MM.YYYY"
                        locale="no-no"
                        monthsShown={2}
                    />
                    {
                        //        <DatePicker
                        //            onChange={this.onchangeDate.bind(this)}
                        //            value={appointment.date}
                        //            locale="no-NO"
                        //            showWeekNumbers={true}
                        //        />
                    }
                </div>


            </div>
        )
    }
}