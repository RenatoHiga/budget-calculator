import React from 'react';

class CostsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showShortenDescription: true 
        }

        this.calculateTotalListCost = this.calculateTotalListCost.bind(this);
    }

    shortenDescription() {
        let descriptionLength, shortenedDescription;
        descriptionLength = this.props.description.length;
        
        if (descriptionLength > 50) {
            shortenedDescription = this.props.description.slice(0, 50);
            shortenedDescription = (
                <p className="">
                    {shortenedDescription}... <span className="textBold" onClick={() => this.setState({showShortenDescription: false})}>Show more</span>
                </p>
            );
        } else {
            shortenedDescription = (
                <p className="">
                    {this.props.description}
                </p>
            );
        }
        return shortenedDescription;
    }

    renderDescription(showShortenDescription) {
        let description;

        if (showShortenDescription) {
            description = this.shortenDescription();
        } else {
            description = (
                <p className="">
                    {this.props.description} <span className="textBold" onClick={() => {this.setState({showShortenDescription: true})}}>Show Less</span> 
                </p>
            );
        }

        return description;
    }

    formatPrice(price) {
        try {
            if (
                price !== undefined
                && price !== NaN
            ) {
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
            } else {
                return '0.00';
            }
        } catch (error) {
            console.log(error);
        }

    }

    calculateTotalListCost(costs) {
        try {
            let totalListCost = 0;

            if (costs !== undefined) {
                costs.forEach(cost => {
                    if (cost.value !== undefined) {
                        totalListCost = totalListCost + cost.value 
                    }
                })
            }

            totalListCost = this.formatPrice(totalListCost);
            return totalListCost;
        } catch (error) {
            console.log(error);
        }
    }

    renderCards(cards) {

        const cardsListIsEmpty = (
            cards === undefined
            || cards.length === 0
        );

        if (cardsListIsEmpty) {
            cards = (
                <li key={1} className="emptyCardsCostsListWarning emptyCardsCostsListWarning--visible">
                    <h1>Your list is empty!</h1>
                    <p>To add a cost, you must press the button "ADD COST" below this list</p>
                </li>
            );
        } else {
            cards = cards.map((cost, index) => (
                <li className="cardCost" key={index} onClick={() => {this.props.openModalUpdateCostHandler(cost, this.props.id)}}>
                  <h2 className="cardCost__title">{cost.name}</h2>
                  <h3 className="cardCost__value">R$ {this.formatPrice(cost.value)}</h3>
                </li>
            ));
        }
        
        return cards;
    }

    render() {
        let styleClassName;
        if (this.props.index === 0) {
            styleClassName = "costsListWrapper costsListWrapper--first";
        } else {
            styleClassName = "costsListWrapper"
        }

        return (
            <div className={styleClassName}>

                <div className="costsList">

                    <div className="costsList__headers">
                        <h1 className="textAlignCenter">{this.props.name}</h1>
                        {this.renderDescription(this.state.showShortenDescription)}
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

                    <button className="costsList__addCostButton" onClick={(event) => {
                        event.preventDefault();
                        this.props.openModalHandler(this.props.id)
                    }}>ADD COST</button>

                </div>

            </div>
        )
    }

}

export default CostsList;