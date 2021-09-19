import React from 'react';

class CostsList extends React.Component {

    constructor(props) {
        super(props);

        this.calculateTotalListCost = this.calculateTotalListCost.bind(this);
    }

    formatPrice(price) {
        price = price.toString();
        let formattedPrice;

        if (price.length < 3) {
            while (price.length < 3) {
                price = `0${price}`;
            }
        }
        
        let reals = price.substr(0, (price.length - 2));
        let cents = price.substr((price.length - 2), 2);

        formattedPrice = `${reals}.${cents}`;

        return formattedPrice;
    }

    calculateTotalListCost(costs) {
        let totalListCost = 0;
        costs.forEach(cost => { totalListCost = totalListCost + cost.value })
        
        totalListCost = this.formatPrice(totalListCost);
        return totalListCost;
    }

    renderCards(cards) {

        const cardsListIsEmpty = cards.length == 0;

        if (cardsListIsEmpty) {
            cards = (
                <li className="emptyCardsCostsListWarning emptyCardsCostsListWarning--visible">
                    <h1>Your list is empty!</h1>
                    <p>To add a cost, you must press the button "ADD COST" below this list</p>
                </li>
            );
        } else {
            cards = cards.map((cost, index) => (
                <li className="cardCost" key={index}>
                  <h2 className="cardCost__title">{cost.name}</h2>
                  <h3 className="cardCost__value">R$ {this.formatPrice(cost.value)}</h3>
                </li>
            ));
        }
        
        return cards;
    }

    render() {
        return (
            <div className="costsListWrapper costsListWrapper">

                <div className="costsList">

                    <div className="costsList__headers">
                        <h1 className="textAlignCenter">{this.props.name}</h1>
                        <p className="">{this.props.description}</p>
                    </div>

                    <div className="cardsCostsList">
                        <ul className="cardsCostsList__cardsList">
                            {
                                this.renderCards(this.props.costs)
                            }
                        </ul>
                    </div>

                    <span className="totalCost">
                        <p className="totalCost__title">Total Cost:</p>
                        <p className="totalCost__value">R$ {this.calculateTotalListCost(this.props.costs)}</p>
                    </span>

                    <button className="costsList__addCostButton" onClick={this.props.openModalHandler}>ADD COST</button>

                </div>

            </div>
        )
    }

}

export default CostsList;