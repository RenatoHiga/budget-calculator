import React from 'react';
import closeIcon from '../images/icons/close.svg';

import Input from './Input';

class ModalAddCard extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='modalAddCard modalAddCard--opened'>
                <form className="modalAddCard__form">
                    
                    <img src={closeIcon} alt="Fechar" onClick={this.props.close}/>

                    <h2 className="textAlignCenter">Adicionar Custo</h2>

                    <Input
                        title="Nome do Custo"
                        value={this.props.productName}
                        onChange={this.props.productNameHandler}
                    />

                    <Input
                        title="Valor do Custo"
                        value={this.props.productValue}
                        onChange={this.props.productValueHandler}
                    />

                    <button className="button marginTop15" onClick={this.props.addCardHandler}>Add new item</button>
                </form>
            </div>
        );
    }
}

export default ModalAddCard;