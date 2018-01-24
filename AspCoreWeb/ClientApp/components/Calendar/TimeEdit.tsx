import * as React from 'react';

export interface TimeEditProps {
    label: string;
    time: number;
    onChanged: (time: number) => void;
}

interface TimeEditState {
    error?: string;
}

export class TimeEdit extends React.Component<TimeEditProps, TimeEditState> {
    displayName = 'TimeEdit';
    constructor(props: TimeEditProps) {
        super(props);
        this.state = {};
    }

    formatTime(time: number): string {
        var hour = Math.floor(time);
        var rest = time - hour;
        var min = Math.floor(rest * 60);
        return (hour < 10 ? "0" : "") + hour.toString() + ":" + (min < 10 ? "0" : "") + min.toString();
    }

    onchange(event: any) {
        var value = event.target.value;        
        var time = this.parseTime(value);
        if (time === NaN) {
            this.setState({ error: "Not a legal number." });
            return;
        }

        this.props.onChanged(time);
    }

    parseTime(time: string): number {
        if (!time || time.length !== 5 || time.charAt(2) !== ":") {
            return NaN;
        }
        var hour = parseInt(time.substr(0, 2));
        var min = parseInt(time.substr(3, 2));
        if (hour === NaN || min === NaN) {
            return NaN;
        }
        return hour + min / 60;
    }

    render() {
        return (
            <div>
                <label> {this.props.label} {this.formatTime(this.props.time)} </label>
                <div className="field">
                    <input type="time" value={this.formatTime(this.props.time)} onChange={this.onchange.bind(this)} />
                    {
                        this.state.error && this.state.error.length > 0 &&
                        <label>  {this.state.error} </label>
                    }
                </div>
            </div>
        )
    }
}

