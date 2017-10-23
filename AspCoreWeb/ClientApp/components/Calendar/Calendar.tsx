import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICalendarInput, ISetup, ICalData } from './model/Interfaces';
import { GetCalendarSetup } from './CalendarSetup';
import { GetData, GetCurrentAppointments } from './CalendarData';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import * as DateTimeUtil from './DateTimeHelpers';
import { CalendarInput } from './demodata/DemoData';

interface ICalendarProps extends RouteComponentProps<{}> {
}

interface ICalendarState {
    CurrentDate: Date;
    Data: ICalData;
    Setup: ISetup;
}

// class Calendar extends React.Component<ICalendarInput, ICalendarState> {
class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    displayName = 'Calendar';
    
    constructor(props: ICalendarProps) {
        super(props);
        var data = GetData(CalendarInput);
        this.state = {
            Data: data,
            Setup: GetCalendarSetup(),
            CurrentDate: DateTimeUtil.GetToday()
        };
        
        this.updateDimensions = this.updateDimensions.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);        
        this.onChangeDayLength = this.onChangeDayLength.bind(this);
        this.onAddAppointment = this.onAddAppointment.bind(this);
    }
    
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            Setup: this.state.Setup.refresh()
        });       
    }

    public onChangeDay(date: Date): void {        
        var data = GetCurrentAppointments(this.state.Data, date);
        this.setState({
            CurrentDate: date,
            Data: data
        });
    }

    onChangeDayLength(longDay: boolean) {        
        this.setState({Setup: this.state.Setup.changeDayLength(longDay)});
    }

    onAddAppointment(): void {
        var data = GetCurrentAppointments(this.state.Data, this.state.CurrentDate);
        this.setState({            
            Data: data
        });
    }

    render() {
        return (
            <div className="cal-component">
                <CalendarHeader 
                    setup={this.state.Setup}
                    date={this.state.CurrentDate}
                    onChangeDay={this.onChangeDay}                   
                    onChangeDayLength={this.onChangeDayLength}
                />                
                <CalendarGrid date={this.state.CurrentDate} data={this.state.Data} setup={this.state.Setup} onAddAppointment={this.onAddAppointment} />
            </div>);
    }
}

export default Calendar;
