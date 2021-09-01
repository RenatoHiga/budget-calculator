import React from 'react';
import './styles/style.css';

import ModalAddCard from './components/ModalAddCard';
import CardCost from './components/CardCost';

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log("app constructor");
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
      totalValue: 0,
      modalIsVisible: false
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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  renderList() {
    let listItems = this.state.products.map((product, index) => 
      <CardCost index={index} name={product.name} price={product.value}/>
    );
    return listItems;
  }

  addItem(event) {
    event.preventDefault();

    // Removes the . (dot) from the string, then transform it into an INT
    let newProductValue = this.state.newProductValue.split('.');
    newProductValue = newProductValue.join('');
    newProductValue = parseInt(newProductValue);
    
    let listItems = [...this.state.products, {name: this.state.newProductName, value: newProductValue}];
    let totalValue = this.state.totalValue + newProductValue;

    // console.log(listItems);
    this.setState({
      products: listItems,
      totalValue: totalValue
    });
    
    console.log(this.state);
    
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

  openModal() { console.log("openModal()");
    this.setState({
      modalIsVisible: true
    });
  }

  closeModal() { console.log("closeModal()");
    this.setState({
      modalIsVisible: false
    })
  }

  formatPrice(price) {
    price = price.toString();

    let reals = price.substr(0, (price.length - 2));
    let cents = price.substr((price.length - 2), 2);

    let formattedPrice = `${reals}.${cents}`;

    return formattedPrice;
  }

  render() {
    let modal;

    if (this.state.modalIsVisible) {
      modal = <ModalAddCard 
        close={this.closeModal}
        productName={this.state.newProductName}
        productNameHandler={this.handleNameInput}
        productValue={this.state.newProductValue}
        productValueHandler={this.handleValueInput}
        addCardHandler={this.addItem}
      />
    } else {
      modal = ""
    }

    return (
      <div className="rootBody">

        {modal}

        <div className="mainContent">
          <h1 className="mainContent__title">
            Budget Calculator
          </h1>

          <ul className="costsList marginTop15">

            <div className="totalCost textAlignCenter">
              <span className="totalCost__title">Custo Total:</span><br/>
              <span className="totalCost__value">R$ {this.formatPrice(this.state.totalValue)}</span>
            </div>

            <div className="costsList__row">
              
              {this.renderList()}

            </div>

          </ul>
          
          <button className="addCostButton marginTop15" onClick={this.openModal}>Adicionar custo</button>
        </div>
  
      </div>
    );
  }
}

export default App;