import * as React from 'react';
import { ISetup } from './model/Interfaces';

interface IVerticalLineProps {
    setup: ISetup;
    col: number;
}

class VerticalLine extends React.Component<IVerticalLineProps, {}> {
    displayName = 'VerticalLine';
    render() {
        var setup = this.props.setup,
            col = this.props.col,
            pos = setup.nameWidth + col * setup.hourWidth - 2,
            style = {
                left: pos
            };
        return (
            <div className="cal-vertical-line" style={style} />);
    }
}

export interface ICalendarGridHeaderProps {
    setup: ISetup;
}

export class CalendarGridHeader extends React.Component<ICalendarGridHeaderProps, {}> {
    displayName = 'GridHeader';

    generateDisplayHours(timeFrom: number, timeTo: number): string[] {
        var displayHours: string[] = [];
        for (var i: number = timeFrom; i <= timeTo; i++) {
            displayHours.push(i.toString() + ':00');
        }
        return displayHours;
    }

    render() {
        var setup: ISetup = this.props.setup,
            nameStyle: React.CSSProperties = { width: setup.nameWidth - 13 },
            i: number = 0,
            displayHours: string[] = this.generateDisplayHours(setup.timeFrom, setup.timeTo);
        return (
            <div className="cal-grid-header">
                <div className="cal-grid-header-name" style={nameStyle}>Terapeut</div>
                <VerticalLine setup={setup} col={0} />
                {
                    displayHours.map(
                        function (hour: string) {
                        var pos: number = setup.nameWidth + i * setup.hourWidth,
                            colStyle: React.CSSProperties = { 
                                left: pos, 
                                top: 0, width: 
                                setup.hourWidth - 13 };
                        i++;
                        return (
                            <div key={hour} >
                                <div key={hour} className="cal-grid-header-col" style={colStyle}> {hour} </div>
                                <VerticalLine setup={setup} col={i} />
                            </div>
                        );
                        }, 
                        this)
                }
            </div>
        );
    }
}