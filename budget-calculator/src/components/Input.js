import React from 'react';

import '../App.css';

class Input extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="inputWrapper marginTop15">
                <label className="inputWrapper__label">{this.props.title}:</label>
                <input className="inputWrapper__input" type="text" value={this.props.value} onChange={this.props.onChange} placeholder={`Digite o ${this.props.title}`} />
            </div>
        );
    }


}

export default Input;