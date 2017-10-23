import * as React from 'react';

export type ButtonIcon = 'tool' | 'next' | 'prev';

export interface ICalendarButtonProps {
    buttontext?: string;
    icon?: ButtonIcon;
    onClickedCallback: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export class CalendarButton extends React.Component<ICalendarButtonProps, {}> {
    displayName = 'CalendarButton';
    render() {
        var iconStyle: React.CSSProperties = {padding: '0 10px 0 0'};
        return (
            <div className="cal-header-button-container">
                <button className="cal-header-button" onClick={this.props.onClickedCallback} >
                    {
                        this.props.icon && this.props.icon === 'tool' &&
                        <span className='glyphicon glyphicon-cog' style={iconStyle} />
                    }
                    {
                        this.props.icon && this.props.icon === 'prev' &&
                        <span className='glyphicon glyphicon-chevron-left' style={iconStyle} />                        
                    }
                    {
                        this.props.icon && this.props.icon === 'next' &&
                        <span className='glyphicon glyphicon-chevron-right' style={iconStyle} />
                    }
                    {this.props.buttontext}                    
                </button>
            </div>
        );
    }
}
