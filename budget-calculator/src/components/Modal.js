import React from 'react';
import closeIcon from '../images/icons/close.svg';

import Input from './Input';

class Modal extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.renderInputs = this.renderInputs.bind(this);
    }

    renderInputs() {
        let inputs = this.props.inputs;
        
        inputs = inputs.map((input, index) =>
            <Input
                key={index}
                title={input.title}
                value={input.value}
                onChange={input.handler}
            />
        )

        return inputs;
    }

    render() {
        return (
            <div className='modal modal--closed'>
                <form className="modal__form">
                    
                    
                    <div className="modal__header">
                        <h2 className="modal__headerTitle textAlignCenter">Add new list</h2>
                        <img src={closeIcon} alt="Fechar" onClick={this.props.close}/>
                    </div>

                    {this.renderInputs()}

                    <button className="button marginTop15" onClick={this.props.buttonHandler}>Add new item</button>
                </form>
            </div>
        );
    }
}

export default Modal;