import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let input;

        if (this.props.type === "textarea") {
            input = <textarea className="inputWrapper__inputTextArea" rows="5" value={this.props.value} onChange={this.props.onChange} placeholder={`Write the ${this.props.title}`} />
        } else if (this.props.type === "select") {
            let options = this.props.options.map((option) => {
                return <option className="" value={option.listId}>{option.listName}</option>
            });

            input = <select className="inputWrapper__input" value={this.props.value} onChange={this.props.onChange}>
                <option className="" value="NO-VALUE">SELECT A LIST</option>
                {options}
            </select>
        } else {
            input = <input className="inputWrapper__input" type="text" value={this.props.value} onChange={this.props.onChange} placeholder={`Write the ${this.props.title}`} />
        }

        return (
            <div className={this.props.visible ? "inputWrapper marginTop15" : "hidden"}>
                <label className="inputWrapper__label lightText">{this.props.title}:</label>
                {input}
            </div>
        );
    }


}

export default Input;