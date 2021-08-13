import React from 'react';

import '../App.css';

class Input extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <label>{this.props.title}:</label>
                <input type="text" value={this.props.value} onChange={this.props.onChange} placeholder={`Digite o ${this.props.title}`} />
            </div>
        );
    }


}

export default Input;