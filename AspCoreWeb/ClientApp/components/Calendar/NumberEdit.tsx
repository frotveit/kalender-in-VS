import * as React from 'react';


export interface NumberEditProps {
    label: string;
    value: number;
    onChanged: (value: number) => void;
}

interface NumberEditState {
    error?: string;
}

export class NumberEdit extends React.Component<NumberEditProps, NumberEditState> {
    displayName = 'NumberEdit';
    constructor(props: NumberEditProps) {
        super(props);
        this.state = {};
    }

    onchange(event: any) {
        var value = event.target.value;
        var number = parseFloat(value);
        if (number === NaN) {
            this.setState({ error: "Not a legal number." });
            return;
        }
        this.props.onChanged(number);
    }

    render() {
        return (
            <div>
                <label> {this.props.label} {this.props.value.toString()} </label>
                <input type="number" value={this.props.value.toString()} onChange={this.onchange.bind(this)} />
                {
                    this.state.error && this.state.error.length > 0 &&
                    <label>  {this.state.error} </label>
                }
            </div>
        )
    }
}