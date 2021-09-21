import React from 'react';

class Input extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {

        let input;

        if (this.props.type === "textarea") {
            input = <textarea className="inputWrapper__inputTextArea" rows="5" value={this.props.value} onChange={this.props.onChange} placeholder={`Write the ${this.props.title}`} />
        } else {
            input = <input className="inputWrapper__input" type="text" value={this.props.value} onChange={this.props.onChange} placeholder={`Write the ${this.props.title}`} />
        }

        return (
            <div className="inputWrapper marginTop15">
                <label className="inputWrapper__label lightText">{this.props.title}:</label>
                {input}
                
            </div>
        );
    }


}

export default Input;