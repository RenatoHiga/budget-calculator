import React from 'react';

import '../App.css';

class Input extends React.Component {
    render() {
        return (
            <div>
                <label>{this.props.title}</label>
                {/* <input type={this.props.type} value={this.state.value} onChange={this.handleValue} placeholder={this.props.title} /> */}
                <input type={this.props.type} placeholder={`Digite o ${this.props.title}`}/>
            </div>
        );
    }


}

export default Input;