import * as React from 'react';
import { ISetup } from './model/Interfaces';
import * as DateTimeUtil from './DateTimeHelpers';
import { CalendarButton } from './CalendarButton';

interface IHeaderDateProps {
    date: Date;
}

class HeaderDate extends React.Component<IHeaderDateProps, {}> {
    displayName = 'HeaderDate';
    render() {
        return (
            <div className="cal-header-date-container">
                <div className="cal-header-week"> Uke {DateTimeUtil.getWeek(this.props.date).toString()} </div>                    
                <div className="HeaderDateDate"> {DateTimeUtil.formatDate(this.props.date)} </div>
            </div>
        );
    }
}

interface ICalendarHeaderProps {
    setup: ISetup;
    date: Date;
    onChangeDay: (date: Date) => void;
    onChangeDayLength: (longDay: boolean) => void;
}

export class CalendarHeader extends React.Component<ICalendarHeaderProps, {}> {
    displayName = 'CalendarHeader';

    constructor (props: ICalendarHeaderProps) {
        super(props);
        
        this.onToday = this.onToday.bind(this);
        this.onPrevDay = this.onPrevDay.bind(this);
        this.onPrevWeek = this.onPrevWeek.bind(this);
        this.onNextDay = this.onNextDay.bind(this);
        this.onNextWeek = this.onNextWeek.bind(this);        
        this.onLongDay = this.onLongDay.bind(this);
        this.onNormalDay = this.onNormalDay.bind(this);
    }

    onToday() {
        this.props.onChangeDay(DateTimeUtil.GetToday());
    }
    onPrevDay() {
        this.props.onChangeDay(DateTimeUtil.PrevDay(this.props.date));
    }
    onPrevWeek() {
        this.props.onChangeDay(DateTimeUtil.PrevWeek(this.props.date));
    }
    onNextDay() {
        this.props.onChangeDay(DateTimeUtil.NextDay(this.props.date));
    }
    onNextWeek() {
        this.props.onChangeDay(DateTimeUtil.NextWeek(this.props.date));
    }

    onLongDay() {
        this.props.onChangeDayLength(true);
    }

    onNormalDay() {
        this.props.onChangeDayLength(false);
    }

    render() {
        return (
            <div className="cal-header">
                <div className="cal-header-left">
                    <CalendarButton buttontext="Gå til dagens dato" onClickedCallback={this.onToday}/>
                </div>
                
                <div className="cal-header-center">
                    <CalendarButton icon="prev" onClickedCallback={this.onPrevWeek} />
                    <CalendarButton icon="prev" onClickedCallback={this.onPrevDay} />
                    <HeaderDate date={this.props.date} />
                    <CalendarButton icon="next" onClickedCallback={this.onNextDay} />
                    <CalendarButton icon="next" onClickedCallback={this.onNextWeek} />
                </div>
                
                <div className="cal-header-right">
                {
                    !this.props.setup.longDay &&                                    
                    <CalendarButton 
                        buttontext="Utvid dag" 
                        onClickedCallback={this.onLongDay} 
                        icon="tool" 
                    />
                }
                {
                    this.props.setup.longDay &&                                    
                    <CalendarButton 
                        buttontext="Normal dag" 
                        onClickedCallback={this.onNormalDay} 
                        icon="tool" 
                    />
                }
                </div>
            </div>
        );
    }
}
