import * as React from 'react';

export interface DateEditProps {
    label: string;
    date: Date;
    onChanged: (date: Date) => void;
}

interface DateEditState {
    error?: string;
}

export class DateEdit extends React.Component<DateEditProps, DateEditState> {
    displayName = 'DateEdit';
    constructor(props: DateEditProps) {
        super(props);
        this.state = {};
    }

    formatDate(date: Date): string {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        return year.toString() + "-" + (month < 10 ? "0" : "") + month.toString() + "-" + (day < 10 ? "0" : "") + day.toString();
    }

    onchange(event: any) {
        var value = event.target.value;        
        var date = this.parseDate(value);
        if (date === null) {
            this.setState({ error: "Not a legal date." });
            return;
        }

        this.props.onChanged(date);
    }

    parseDate(date: string): Date  {
        if (!date || date.length !== 10) {
            return new Date();
        }
        var year = parseInt(date.substr(0, 4));
        var month = parseInt(date.substr(5, 2));
        var day = parseInt(date.substr(8, 2));
        return new Date(year, month - 1, day);
    }

    render() {
        return (
            <div>
                <label> {this.props.label} {this.formatDate(this.props.date)} </label>
                <input type="date" value={this.formatDate(this.props.date)} onChange={this.onchange.bind(this)} />
                {
                    this.state.error && this.state.error.length > 0 &&
                    <label>  {this.state.error} </label>
                }
            </div>
        )
    }
}

