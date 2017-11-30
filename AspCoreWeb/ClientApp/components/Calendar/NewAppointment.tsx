import * as React from 'react';
import { ISetup, IAppointment } from './model/Interfaces';

export interface INewAppointmentProps {
    setup: ISetup;
    appointment: IAppointment;    
}

export class NewAppointment extends React.Component<INewAppointmentProps, {}> {
    displayName = 'NewAppointment';
    constructor(props: INewAppointmentProps) {
        super(props);        
    }

    onDrag(event: React.DragEvent<HTMLDivElement>) {
        
    }

    onDragEnd(event: React.DragEvent<HTMLDivElement>) {
        var appointment = this.props.appointment,
            setup = this.props.setup,
            start = (appointment.time - setup.timeFrom) * setup.hourWidth,
            width = appointment.length * setup.hourWidth - 3;
        var end = start + width;
        var posX = event.clientX;
        var posX2 = event.pageX;
        var posX3 = event.screenX;
        var p = this._dragger.clientLeft;
    }

    _dragger: HTMLDivElement;
    
    render() {
        var appointment = this.props.appointment,
            setup = this.props.setup,
            start = (appointment.time - setup.timeFrom) * setup.hourWidth,
            width = appointment.length * setup.hourWidth - 3;
        var style: React.CSSProperties = {
            position: 'absolute',
            left: start,
            top: 0,
            width: width
        };
        var innerStyle: React.CSSProperties = {            
            width: width - 7
        };
        return (
            <div className="cal-new-appointment" style={style} >
                <div className="cal-new-appointment-inner" style={innerStyle} >
                    <div className="cal-appointment-description">                    
                        {this.props.appointment.description}
                    </div>
                </div>
                <div className="cal-new-appointment-adjustor" draggable={true}
                    onDrag={this.onDrag.bind(this)} onDragEnd={this.onDragEnd.bind(this)}
                    ref={(el: HTMLDivElement) => this._dragger = el}
                />
            </div>
        );
    }
}