import React from 'react';
import './styles/style.css';

import Input from './components/Input'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newProductName: '',
      newProductValue: '0.00',
      products: [
        {
          name: "Graphics Card",
          value: 1000
        }, 
        {
          name: "Processor",
          value: 2500
        }, 
        {
          name: "SSD (Solid State Drive)",
          value: 1000
        }, 
        {
          name: "Motherboard",
          value: 1200
        }
      ],
      totalValue: 0
    };

    let products = [...this.state.products];
    var totalValue = 0;


    products.forEach((product) => {      
      totalValue = totalValue + product.value
    });
  
    this.state.totalValue = totalValue

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleValueInput = this.handleValueInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    let listItems = this.state.products.map((product, index) => 
      <li key={index}>{product.name} - R$ {product.value}</li> 
    );
    return listItems
  }

  addItem(event) {
    event.preventDefault();

    let listItems = [...this.state.products, {name: this.state.newProductName, value: this.state.newProductValue}];
    let totalValue = this.state.totalValue + parseInt(this.state.newProductValue);

    // console.log(listItems);
    this.setState({
      products: listItems,
      totalValue: totalValue
    });
    
    
  }

  handleNameInput(event) {
    this.setState({
      newProductName: event.target.value
    });
  }

  handleValueInput(event) {
    // Allow only numbers and dot
    const filterNumbers = /[^0-9\.]/g;
    let newValue = event.target.value.replace(filterNumbers, '');

    // Allow only a single dot.
    const filterDots = /[\.]/g;
    let foundDots = event.target.value.match(filterDots);

    let fullValue;
    if (foundDots !== null && foundDots.length > 1) {
      // If a dot has been found. 
      // It will re-render the value to not allow a second dot
      fullValue = this.state.newProductValue;
    } else {
      // Remove the dot to simplify the calculation
      fullValue = newValue.replace('.', '');

      if (fullValue.length >= 3) { // If the user isn't erasing the values...

        // Make the effect of Price mask.
        if (fullValue.substr(0, 1) === '0' && fullValue.substr(0, fullValue.length) !== '000') {
          fullValue = fullValue.substr(1, fullValue.length);
        }

        let firstPart = fullValue.substr(0, fullValue.length - 2);
        let centsPart = fullValue.substr(fullValue.length - 2, fullValue.length);

        fullValue = firstPart + "." + centsPart;
        
        this.setState({
          newProductValue: fullValue
        });
      } else { // If the user is erasing the values
        // Make the default value (0.00) again
        // or format the value. Examples: 0.32 and 0.01
        
        let abscentZeros = "";
        for (let index = 1; index <= 3 - fullValue.length; index++) {
          abscentZeros += '0';
        }

        let newValue = abscentZeros + fullValue;
        newValue = newValue.substr(0, (newValue.length - 2)) + "." + newValue.substr(1, 2);

        this.setState((state) => ({
          newProductValue: newValue
        }));
      } 
    }
  }

  render() {
    return (
      <div className="mainContent">
        <h1 className="mainContent__title">
          Budget Calculator
        </h1>

        <form>
          
          <h2 className="textAlignCenter">Adicionar Custo</h2>

          <Input
            title="Nome do Custo"
            value={this.state.newProductName}
            onChange={this.handleNameInput}
            
          />

          <Input
            title="Valor do Custo"
            value={this.state.newProductValue}
            onChange={this.handleValueInput}
          />

          <button className="button marginTop15" onClick={this.addItem}>Add new item</button>
        
        </form>

        <ul className="costsList">

          <div className="totalCost textAlignCenter">
            <span className="totalCost__title">Custo Total:</span><br/>
            <span className="totalCost__value">R$ 8000.00</span>
          </div>

          <div className="costsList__row">
            
            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

            <li className="costItem">
              <span className="costItem__image">
                Image
              </span>

              <div className="costItem__description">
                <p className="costItem__name">Cadeira Gamer X 123-OU</p>
                <p className="costItem__price">R$ 2000.00</p>
              </div>
            </li>

          </div>

          {/* <li className="costItem">
            <span className="costItem__image">
              Image
            </span>

            <div className="costItem__description">
              <p className="costItem__name">Cadeira Gamer X 123-OU</p>
              <p className="costItem__price">R$ 2000.00</p>
            </div>
          </li> */}

        </ul>

        <div>
          <h2>Items list from list "Dream Gaming Setup"</h2>
          <ul>
            {this.renderList()}
            Total Value: R$ {this.state.totalValue}
          </ul>
        </div>
        
      </div>
    );
  }
}

export default App;