import React from 'react';

class CardCost extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    formatPrice(price) {
        price = price.toString();

        let reals = price.substr(0, (price.length - 2));
        let cents = price.substr((price.length - 2), 2);

        let formattedPrice = `${reals}.${cents}`;

        return formattedPrice;
    }

    render() {
        return (
            <li key={this.props.index} className="costItem">
                {/* <span className="costItem__image">
                    Image
                </span> */}

                <div className="costItem__description">
                    <p className="costItem__name">{this.props.name}</p>
                    <p className="costItem__price">R$ {this.formatPrice(this.props.price)}</p>
                </div>
            </li>
        )
    }
}

export default CardCost;